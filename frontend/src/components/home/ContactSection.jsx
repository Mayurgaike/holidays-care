import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack
} from "@mui/material";
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();

    const phone = "917666642587";

    const text =
      `Hello Holidays Care,%0A%0A` +
      `Name: ${form.name}%0A` +
      `Phone: ${form.phone}%0A` +
      `Email: ${form.email}%0A` +
      `Message: ${form.message}`;

    window.open(`https://wa.me/${phone}?text=${text}`);
  };

  return (
    <Box sx={{ py: 10, px: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 8,
          maxWidth: 1100,
          mx: "auto"
        }}
      >
        {/* LEFT INFO */}
        <Box flex={1}>
          <Typography variant="h5" fontWeight={700} mb={3}>
            Get in Touch
          </Typography>

          <Typography mb={2}>📞 +91 98765 43210</Typography>
          <Typography mb={2}>✉️ sales.holidaycare@gmail.com</Typography>
          <Typography mb={3}>
            📍 6th Floor, Roongta Shopping Hub, Nashik
          </Typography>

          <Paper sx={{ height: 300, overflow: "hidden" }}>
            <iframe
              title="map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src="https://www.google.com/maps?q=Roongta%20Shopping%20Hub%20Nashik&output=embed"
            />
          </Paper>
        </Box>

        {/* RIGHT FORM */}
        <Box flex={1}>
          <Paper sx={{ p: 5, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={700} mb={1}>
              Let's Talk
            </Typography>

            <Typography mb={4} color="text.secondary">
              Unlock your travel planning today.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  name="name"
                  label="Your Name"
                  required
                  value={form.name}
                  onChange={handleChange}
                />

                <TextField
                  name="phone"
                  label="Phone Number"
                  required
                  value={form.phone}
                  onChange={handleChange}
                />

                <TextField
                  name="email"
                  label="Email Address"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                />

                <TextField
                  name="message"
                  label="Your Message"
                  multiline
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ py: 1.5 }}
                >
                  Send Message
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}