import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const TourForm = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState({
    ...initialData,
    highlights: [],
    itinerary: [],
  });
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    setForm({
      ...initialData,

      highlights: Array.isArray(initialData.highlights)
        ? initialData.highlights
        : typeof initialData.highlights === "string"
          ? initialData.highlights.split(",").map((h) => h.trim())
          : [],

      itinerary: Array.isArray(initialData.itinerary)
        ? initialData.itinerary
        : [],
    });
  }, [initialData]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // =========================
  // HIGHLIGHTS
  // =========================
  const addHighlight = () => {
    setForm((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""],
    }));
  };

  const removeHighlight = (index) => {
    const updated = [...form.highlights];
    updated.splice(index, 1);
    setForm({ ...form, highlights: updated });
  };

  const updateHighlight = (index, value) => {
    const updated = [...form.highlights];
    updated[index] = value;
    setForm({ ...form, highlights: updated });
  };

  // =========================
  // ITINERARY
  // =========================
  const addItinerary = () => {
    setForm((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: prev.itinerary.length + 1,
          title: "",
          description: "",
        },
      ],
    }));
  };

  const removeItinerary = (index) => {
    const updated = [...form.itinerary];
    updated.splice(index, 1);

    // reassign days
    const reOrdered = updated.map((item, i) => ({
      ...item,
      day: i + 1,
    }));

    setForm({ ...form, itinerary: reOrdered });
  };

  const updateItinerary = (index, key, value) => {
    const updated = [...form.itinerary];
    updated[index][key] = value;
    setForm({ ...form, itinerary: updated });
  };

  return (
    <Box sx={{ pt: 2 }}>
      {/* BASIC */}
      <TextField
        fullWidth
        label="Title"
        sx={{ mb: 2 }}
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3}
        sx={{ mb: 2 }}
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Duration"
            value={form.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
          />
        </Grid>
      </Grid>

      <TextField
        fullWidth
        label="Destination"
        sx={{ mt: 2 }}
        value={form.destination}
        onChange={(e) => handleChange("destination", e.target.value)}
      />

      <TextField
        fullWidth
        select
        label="Category"
        sx={{ mt: 2 }}
        value={form.category}
        onChange={(e) => handleChange("category", e.target.value)}
      >
        <MenuItem value="domestic">Domestic</MenuItem>
        <MenuItem value="international">International</MenuItem>
      </TextField>

      {/* ========================= */}
      {/* HIGHLIGHTS */}
      {/* ========================= */}
      <Typography sx={{ mt: 3, fontWeight: 600 }}>Highlights</Typography>

      {(Array.isArray(form.highlights) ? form.highlights : []).map((h, i) => (
        <Box key={i} sx={{ display: "flex", gap: 1, mt: 1 }}>
          <TextField
            fullWidth
            label={`Highlight ${i + 1}`}
            value={h}
            onChange={(e) => updateHighlight(i, e.target.value)}
          />

          <IconButton color="error" onClick={() => removeHighlight(i)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button startIcon={<AddIcon />} onClick={addHighlight} sx={{ mt: 1 }}>
        Add Highlight
      </Button>

      {/* ========================= */}
      {/* ITINERARY */}
      {/* ========================= */}
      <Typography sx={{ mt: 3, fontWeight: 600 }}>
        Day-wise Itinerary
      </Typography>

      {(Array.isArray(form.itinerary) ? form.itinerary : []).map((item, i) => (
        <Box
          key={i}
          sx={{ mt: 2, p: 2, border: "1px solid #eee", borderRadius: 2 }}
        >
          <Typography sx={{ mb: 1, fontWeight: 600 }}>
            Day {item.day}
          </Typography>

          <TextField
            fullWidth
            label="Title"
            sx={{ mb: 1 }}
            value={item.title}
            onChange={(e) => updateItinerary(i, "title", e.target.value)}
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={2}
            value={item.description}
            onChange={(e) => updateItinerary(i, "description", e.target.value)}
          />

          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => removeItinerary(i)}
            sx={{ mt: 1 }}
          >
            Remove Day
          </Button>
        </Box>
      ))}

      <Button startIcon={<AddIcon />} onClick={addItinerary} sx={{ mt: 2 }}>
        Add Day
      </Button>

      {/* BOOLEAN */}
      <FormControlLabel
        control={
          <Checkbox
            checked={form.featured || false}
            onChange={(e) => handleChange("featured", e.target.checked)}
          />
        }
        label="Featured"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={form.popular || false}
            onChange={(e) => handleChange("popular", e.target.checked)}
          />
        }
        label="Popular"
      />

      {/* IMAGE */}
      <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
        Upload Images
        <input
          hidden
          type="file"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            handleChange("images", files);

            const previews = files.map((file) => URL.createObjectURL(file));
            setPreview(previews);
          }}
        />
      </Button>

      <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
        {preview.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="preview"
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        ))}
      </Box>

      {/* SAVE */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={() => onSubmit(form)}
      >
        Save Tour
      </Button>
    </Box>
  );
};

export default React.memo(TourForm);
