const mongoose = require('mongoose');

/**
 * ReviewCache — stores fetched Google reviews in MongoDB so they
 * persist across server restarts and deploys. Reviews are refreshed
 * from SerpAPI every 2 days to conserve free-tier credits.
 */
const reviewCacheSchema = new mongoose.Schema({
  reviews: [
    {
      author_name: String,
      rating: Number,
      text: String,
      relative_time_description: String,
      profile_photo_url: String,
    },
  ],
  dataId: {
    type: String,
    default: null,
  },
  fetchedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('ReviewCache', reviewCacheSchema);
