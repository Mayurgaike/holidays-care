import { Box, Container, Paper, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection({ heroImages }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!heroImages.length) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroImages.length);
        setFade(true);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages]);

  const imageUrl = heroImages[current]?.imageUrl
    ? `http://localhost:5000${heroImages[current].imageUrl}`
    : "/hero.png";

  return (
    <Box
      sx={{
        height: "95vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: fade ? 1 : 0,
        transition: "opacity 0.4s ease-in-out",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            textAlign: "center",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(5px)",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              fontSize: { xs: "2.5rem", md: "3.75rem" },
              textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
              mb: 2,
            }}
          >
            {heroImages[current]?.title}
          </Typography>

          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9, fontWeight: 300, letterSpacing: 1 }}
          >
            {heroImages[current]?.subtitle}
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/tours")}
            sx={{
              px: 6,
              py: 1.8,
              borderRadius: "50px",
              fontSize: 18,
              fontWeight: 600,
              textTransform: "none",
              bgcolor: "#fff",
              color: "#1976d2",
              "&:hover": { bgcolor: "#f0f0f0" },
            }}
          >
            Start Your Journey
          </Button>

          {/* Dot indicators */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
            {heroImages.map((_, i) => (
              <Box
                key={i}
                onClick={() => setCurrent(i)}
                sx={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  borderRadius: "10px",
                  bgcolor: i === current ? "#fff" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}