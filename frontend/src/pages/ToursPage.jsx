import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const domesticTours = [
  { id: "kashmir", name: "Kashmir", price: "₹24,999", image: "/kashmir.jpg",
    font: "'Playfair Display', serif", color: "#fff" },
  { id: "ladakh", name: "Leh Ladakh", price: "₹34,999", image: "/ladakh.jpg",
    font: "'Bebas Neue', cursive", color: "#f0c040" },
  { id: "sikkim", name: "Sikkim", price: "₹29,999", image: "/sikkim.jpg",
    font: "'Dancing Script', cursive", color: "#fff" },
  { id: "rajasthan", name: "Rajasthan", price: "₹19,999", image: "/rajasthan.jpg",
    font: "'Cinzel', serif", color: "#fff" },
  { id: "himachal", name: "Himachal Pradesh", price: "₹29,999", image: "/himachal.jpg",
    font: "'Satisfy', cursive", color: "#fff" },
  { id: "uttarakhand", name: "Uttarakhand", price: "₹24,999", image: "/uttarakhand.jpg",
    font: "'Righteous', cursive", color: "#c8f5ff" },
  { id: "kerala", name: "Kerala", price: "₹14,999", image: "/kerala.jpg",
    font: "'Pacifico', cursive", color: "#a8f0a0" },
  { id: "northeast", name: "Northeast", price: "₹64,999", image: "/northeast.jpg",
    font: "'Lobster', cursive", color: "#ffe0b2" },
  { id: "varanasi", name: "Varanasi", price: "₹24,999", image: "/varanasi.jpg",
    font: "'Cinzel', serif", color: "#ffd700" }
];

const internationalTours = [
  { id: "nepal", name: "Nepal", price: "₹45,999", image: "/nepal.jpg",
    font: "'Playfair Display', serif", color: "#fff" },
  { id: "singapore", name: "Singapore", price: "₹59,999", image: "/singapore.jpg",
    font: "'Dancing Script', cursive", color: "#7ee8f8" },
  { id: "vietnam", name: "Vietnam", price: "₹65,999", image: "/vietnam.jpg",
    font: "'Pacifico', cursive", color: "#fff" },
  { id: "dubai", name: "Dubai", price: "₹49,999", image: "/dubai.jpg",
    font: "'Cinzel', serif", color: "#ffd700" },
  { id: "baku", name: "Baku", price: "₹44,999", image: "/baku.jpg",
    font: "'Exo 2', sans-serif", color: "#e0f0ff" },
  { id: "srilanka", name: "Sri Lanka", price: "₹34,999", image: "/srilanka.jpg",
    font: "'Lobster', cursive", color: "#a8f0a0" },
  { id: "maldives", name: "Maldives", price: "₹85,000", image: "/maldives.jpg",
    font: "'Satisfy', cursive", color: "#c8f5ff" },
  { id: "bali", name: "Bali", price: "₹65,999", image: "/bali.jpg",
    font: "'Permanent Marker', cursive", color: "#ffe0b2" },
  { id: "thailand", name: "Thailand", price: "₹45,999", image: "/thailand.jpg",
    font: "'Dela Gothic One', cursive", color: "#fff" }
];

const ToursPage = () => {
  const [type, setType] = useState("international");
  const navigate = useNavigate();

  const tours = type === "international" ? internationalTours : domesticTours;

  return (
    <Container sx={{ py: { xs: 6, md: 10 } }}>

      {/* Heading */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 700,
          mb: 5,
          color: "#0d47a1",
          fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" }
        }}
      >
        Explore Our Tours
      </Typography>

      {/* Toggle Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 7 }}>
        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={(e, newValue) => newValue && setType(newValue)}
          sx={{
            background: "#f4f6f8",
            borderRadius: "40px",
            p: 0.5,
            gap: 1
          }}
        >
          <ToggleButton
            value="international"
            sx={{
              px: { xs: 2.5, sm: 4 },
              py: 1,
              borderRadius: "30px",
              border: "none",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "0.8rem", sm: "0.95rem" },
              color: "#555",
              "&.Mui-selected": {
                color: "white",
                background: "linear-gradient(135deg,#1976d2,#0d47a1)"
              }
            }}
          >
            International
          </ToggleButton>

          <ToggleButton
            value="domestic"
            sx={{
              px: { xs: 2.5, sm: 4 },
              py: 1,
              borderRadius: "30px",
              border: "none",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "0.8rem", sm: "0.95rem" },
              color: "#555",
              "&.Mui-selected": {
                color: "white",
                background: "linear-gradient(135deg,#1976d2,#0d47a1)"
              }
            }}
          >
            Domestic
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* ✅ REPLACED Grid with Flexbox — this is the key fix */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 4, sm: 5, md: 6 }
        }}
      >
        {tours.map((tour, index) => (
          <motion.div
            key={tour.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Box
              onClick={() => navigate(`/tour/${tour.id}`)}
              sx={{
                position: "relative",
                width: { xs: 220, sm: 240, md: 280 },
                height: { xs: 300, sm: 340, md: 400 },
                borderRadius: "180px 180px 180px 180px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 15px 40px rgba(0,0,0,0.18)",

                "&:hover .overlay": {
                  opacity: 1
                },
                "&:hover img": {
                  transform: "scale(1.15)"
                }
              }}
            >
              {/* Image */}
              <Box
                component="img"
                src={tour.image}
                alt={tour.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease"
                }}
              />

              {/* Destination Name */}
              {/* Destination Name */}
              <Typography
                sx={{
                  position: "absolute",
                  top: 40,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: { xs: 18, sm: 22, md: 26 },
                  fontWeight: 800,
                  fontFamily: tour.font,        // ✅ unique font per destination
                  color: tour.color,            // ✅ unique color per destination
                  textShadow: "0 4px 15px rgba(0,0,0,0.6)",
                  textAlign: "center",
                  width: "80%",
                }}
              >
                {tour.name}
              </Typography>

              {/* Hover Overlay */}
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  pb: 4,
                  opacity: 0,
                  transition: "0.4s"
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { xs: 14, sm: 16, md: 18 },
                    fontWeight: 500,
                    mb: 2,
                    textAlign: "center"
                  }}
                >
                  Starting at <br />
                  <b>{tour.price}</b>
                </Typography>

                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: "50%",
                    background: "#115eec",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <ArrowOutwardIcon sx={{ color: "white" }} />
                </Box>
              </Box>

            </Box>
          </motion.div>
        ))}
      </Box>

    </Container>
  );
};

export default ToursPage;