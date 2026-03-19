import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";

const HeroForm = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState(initialData);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  return (
    <Box sx={{ pt: 2 }}>
      <TextField
        fullWidth
        label="Title"
        sx={{ mb: 2 }}
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <TextField
        fullWidth
        label="Subtitle"
        sx={{ mb: 2 }}
        value={form.subtitle}
        onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
      />

      <Button variant="outlined" component="label" fullWidth>
        Upload Image
        <input
          hidden
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setForm({ ...form, image: file });
            setPreview(URL.createObjectURL(file));
          }}
        />
      </Button>

      {preview && (
        <img
          src={preview}
          style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
        />
      )}

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={() => onSubmit(form)}
      >
        Save Hero
      </Button>
    </Box>
  );
};

export default React.memo(HeroForm);
