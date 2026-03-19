const HeroImage = require("../models/HeroImage");
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

exports.getHeroImages = async (req, res) => {
  try {
    const heroImages = await HeroImage.find({ isActive: true }).sort({
      order: 1,
    });
    res.json(heroImages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createHeroImage = async (req, res) => {
  try {
    const { title, subtitle, order } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const heroImage = new HeroImage({
      title,
      subtitle,
      imageUrl: `/uploads/hero/${req.file.filename}`,
      order: order || 0,
    });

    await heroImage.save();
    res.status(201).json(heroImage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateHeroImage = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
    };

    if (req.body.order) updateData.order = Number(req.body.order);

    const isActive = parseBoolean(req.body.isActive);
    if (isActive !== undefined) updateData.isActive = isActive;

    if (req.file) {
      updateData.imageUrl = `/uploads/hero/${req.file.filename}`;
    }

    const heroImage = await HeroImage.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    if (!heroImage) {
      return res.status(404).json({ message: "Hero image not found" });
    }

    res.json(heroImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteHeroImage = async (req, res) => {
  try {
    const hero = await HeroImage.findById(req.params.id);

    if (!hero) {
      return res.status(404).json({ message: "Hero image not found" });
    }

    if (hero.imageUrl) {
      const filePath = path.join(__dirname, "..", hero.imageUrl);

      fs.unlink(filePath, (err) => {
        if (err) console.log("File delete error:", err.message);
      });
    }

    await HeroImage.findByIdAndDelete(req.params.id);

    res.json({ message: "Hero image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
