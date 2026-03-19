import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection({ heroImages = [] }) {

  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // hero image slider
  useEffect(() => {

    if (!heroImages.length) return;

    const interval = setInterval(() => {

      setFade(false);

      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroImages.length);
        setFade(true);
      }, 400);

    }, 5000);

    return () => clearInterval(interval);

  }, [heroImages]);

  const imageUrl = heroImages[current]?.imageUrl
    ? `${API_URL}${heroImages[current].imageUrl}`
    : "/hero.png";

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "45vh", sm: "60vh", md: "95vh" },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >

      {/* HERO IMAGE */}
      <Box
        component="img"
        src={imageUrl}
        alt="Hero"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",

          animation: fade ? "kenburns 7s ease forwards" : "none",

          "@keyframes kenburns": {
            "0%": { transform: "scale(1)" },
            "100%": { transform: "scale(1.12)" }
          },

          transition: "opacity 0.4s ease",
          opacity: fade ? 1 : 0,
        }}
      />

      {/* DARK OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
        }}
      />

      {/* HERO CONTENT */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center"
        }}
      >

        {/* Tagline */}
        <Typography
          sx={{
            letterSpacing: 2,
            fontWeight: 600,
            mb: 4,
            color: "#ffffff",
            textTransform: "uppercase",
            fontSize: { xs: "1.1rem", md: "1.4rem" },
            textShadow: "2px 2px 10px rgba(0,0,0,0.5)"
          }}
        >
          Explore The World with Holidays Care
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >

          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#3f84eb",
              px: 4,
              fontWeight: 600,
              "&:hover": { bgcolor: "#3b76ce" }
            }}
            onClick={() => navigate("/tours")}
          >
            Explore Tours
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "white",
              color: "white",
              px: 4,
              fontWeight: 600,
              "&:hover": {
                borderColor: "#fff",
                bgcolor: "rgba(255,255,255,0.15)"
              }
            }}
            onClick={() => navigate("/contact")}
          >
            Plan Trip
          </Button>

        </Box>

      </Container>

    </Box>
  );
}