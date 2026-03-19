const Tour = require("../models/Tour");
const fs = require("fs");
const path = require("path");

const parseBoolean = (val) => {
  if (val === undefined || val === null) return undefined;

  if (typeof val === "boolean") return val;

  if (typeof val === "string") {
    if (val === "true") return true;
    if (val === "false") return false;
    if (val === "undefined" || val === "") return undefined;
  }

  return undefined;
};

const parseJSONField = (val) => {
  if (!val) return [];

  if (Array.isArray(val)) return val;

  try {
    return JSON.parse(val);
  } catch {
    return [];
  }
};

const normalizeArrayField = (val) => {
  if (!val) return [];

  if (Array.isArray(val)) return val;

  if (typeof val === "string") {
    // JSON string case
    if (val.startsWith("[") && val.endsWith("]")) {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }

    // comma separated fallback
    return val.split(",").map((v) => v.trim());
  }

  return [];
};

exports.getTours = async (req, res) => {
  try {
    const { category, popular, featured } = req.query;

    const filter = { isActive: true };

    if (category) filter.category = category;
    if (popular) filter.popular = true;
    if (featured) filter.featured = true;

    const tours = await Tour.find(filter).sort({ createdAt: -1 });

    const normalizedTours = tours.map((t) => ({
      ...t.toObject(),
      highlights: normalizeArrayField(t.highlights),
      itinerary: normalizeArrayField(t.itinerary),
    }));

    res.json(normalizedTours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) return res.status(404).json({ message: "Tour not found" });

    const normalizedTour = {
      ...tour.toObject(),
      highlights: normalizeArrayField(tour.highlights),
      itinerary: normalizeArrayField(tour.itinerary),
    };

    res.json(normalizedTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTour = async (req, res) => {
  try {
    const images =
      req.files?.map((file) => `/uploads/tours/${file.filename}`) || [];

    const tourData = {
      ...req.body,
      images,
      price: Number(req.body.price),
      featured: parseBoolean(req.body.featured) ?? false,
      popular: parseBoolean(req.body.popular) ?? false,
      highlights: parseJSONField(req.body.highlights),
      itinerary: parseJSONField(req.body.itinerary),
    };

    const tour = new Tour(tourData);

    await tour.save();

    res.status(201).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updateData = { ...req.body };

    delete updateData.images;
    if (req.body.price) updateData.price = Number(req.body.price);

    const featured = parseBoolean(req.body.featured);
    const popular = parseBoolean(req.body.popular);

    if (featured !== undefined) updateData.featured = featured;
    if (popular !== undefined) updateData.popular = popular;

    if (req.body.highlights)
      updateData.highlights = parseJSONField(req.body.highlights);

    if (req.body.itinerary)
      updateData.itinerary = parseJSONField(req.body.itinerary);

    // ✅ IMAGES
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(
        (file) => `/uploads/tours/${file.filename}`,
      );
    }

    const tour = await Tour.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    if (tour.images && tour.images.length > 0) {
      tour.images.forEach((img) => {
        const filePath = path.join(__dirname, "..", img);

        fs.unlink(filePath, (err) => {
          if (err) console.log("File delete error:", err.message);
        });
      });
    }

    await Tour.findByIdAndDelete(req.params.id);

    res.json({ message: "Tour deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
