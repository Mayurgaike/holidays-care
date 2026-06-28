/**
 * Google Reviews Endpoint (via SerpAPI + MongoDB cache)
 * ─────────────────────────────────────────────────────
 * Fetches real Google reviews for "Holidays Care" using SerpAPI's
 * Google Maps Reviews engine — completely free (250 searches/month).
 *
 * Reviews are cached in MongoDB for 2 days so they persist across
 * server restarts and deploys (e.g. on Hostinger). This means:
 *   - ~15 SerpAPI credits/month (1 refresh every 2 days)
 *   - Well within the 250 free/month limit
 *
 * How to get a free API key:
 *   1. Go to https://serpapi.com/ and create a free account (no card needed)
 *   2. Copy your API key from the dashboard
 *   3. Set SERPAPI_KEY in backend/.env
 *
 * Environment variable required:
 *   SERPAPI_KEY=your_serpapi_key_here   (in backend/.env)
 */

const express = require("express");
const router = express.Router();
const axios = require("axios");
const ReviewCache = require("../models/ReviewCache");

// ── Cache TTL: 2 days ──
const CACHE_TTL_MS = 2 * 24 * 60 * 60 * 1000; // 2 days

/**
 * Resolve the SerpAPI `data_id` for Holidays Care.
 * Uses 1 SerpAPI credit.
 */
async function resolveDataId(apiKey) {
  const { data } = await axios.get("https://serpapi.com/search.json", {
    params: {
      engine: "google_maps",
      q: "Holidays Care Nashik travel agency",
      type: "search",
      api_key: apiKey,
    },
  });

  if (data.local_results && data.local_results.length > 0) {
    return data.local_results[0].data_id;
  }
  return null;
}

/**
 * Fetch reviews from SerpAPI using the google_maps_reviews engine.
 * Uses 1 SerpAPI credit.
 */
async function fetchReviewsFromSerpApi(dataId, apiKey) {
  const { data } = await axios.get("https://serpapi.com/search.json", {
    params: {
      engine: "google_maps_reviews",
      data_id: dataId,
      hl: "en",
      api_key: apiKey,
    },
  });

  if (data.reviews && data.reviews.length > 0) {
    return data.reviews
      .map((r) => ({
        author_name: r.user?.name || "Anonymous",
        rating: r.rating || 5,
        text: r.snippet || r.extracted_snippet?.original || "",
        relative_time_description: r.date || "",
        profile_photo_url: r.user?.thumbnail || null,
      }))
      .filter((r) => r.text && r.text.trim().length > 0); // exclude empty reviews
  }

  return [];
}

/**
 * GET /api/reviews
 * Returns real Google reviews — served from MongoDB cache when fresh,
 * or fetched from SerpAPI when stale/missing.
 */
router.get("/", async (req, res) => {
  res.set("Cache-Control", "no-store");

  try {
    // ── Step 1: Check MongoDB cache ──
    const cached = await ReviewCache.findOne().sort({ fetchedAt: -1 });

    if (cached && cached.reviews.length > 0) {
      const ageMs = Date.now() - new Date(cached.fetchedAt).getTime();

      if (ageMs < CACHE_TTL_MS) {
        console.log(
          `✅ [reviews] Serving ${cached.reviews.length} cached reviews (age: ${Math.round(ageMs / 3600000)}h)`
        );
        return res.json({ success: true, reviews: cached.reviews });
      }
      console.log("[reviews] Cache expired, refreshing from SerpAPI...");
    }

    // ── Step 2: Fetch fresh reviews from SerpAPI ──
    const apiKey = process.env.SERPAPI_KEY;
    if (!apiKey) {
      console.warn("⚠️  SERPAPI_KEY is not set in .env");
      // Fall back to stale cache if available
      if (cached && cached.reviews.length > 0) {
        return res.json({ success: true, reviews: cached.reviews });
      }
      return res.json({ success: false, reviews: [] });
    }

    // Resolve data_id (reuse from cache if available)
    let dataId = cached?.dataId || null;
    if (!dataId) {
      console.log("[reviews] Resolving data_id via SerpAPI...");
      dataId = await resolveDataId(apiKey);
      if (!dataId) {
        console.warn("⚠️  Could not find Holidays Care on Google Maps");
        if (cached && cached.reviews.length > 0) {
          return res.json({ success: true, reviews: cached.reviews });
        }
        return res.json({ success: false, reviews: [] });
      }
    }

    // Fetch reviews
    const reviews = await fetchReviewsFromSerpApi(dataId, apiKey);

    if (reviews.length > 0) {
      // Save to MongoDB (upsert — keep only one cache document)
      await ReviewCache.findOneAndUpdate(
        {},
        { reviews, dataId, fetchedAt: new Date() },
        { upsert: true, new: true }
      );
      console.log(`✅ [reviews] Fetched & cached ${reviews.length} reviews from SerpAPI`);
      return res.json({ success: true, reviews });
    }

    // No reviews from API — serve stale cache if available
    if (cached && cached.reviews.length > 0) {
      console.warn("⚠️ [reviews] No new reviews, serving stale cache");
      return res.json({ success: true, reviews: cached.reviews });
    }

    return res.json({ success: false, reviews: [] });
  } catch (error) {
    console.error("❌ [reviews] Error:", error.message);

    // On any error, try to serve whatever is in MongoDB
    try {
      const fallback = await ReviewCache.findOne().sort({ fetchedAt: -1 });
      if (fallback && fallback.reviews.length > 0) {
        console.log("⚠️ [reviews] Serving stale cache after error");
        return res.json({ success: true, reviews: fallback.reviews });
      }
    } catch (_) {}

    return res.json({ success: false, reviews: [] });
  }
});

module.exports = router;
