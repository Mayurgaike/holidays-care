import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toursAPI } from "../services/api";
import { motion } from "framer-motion";

import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  Card
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const TourDetailPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await toursAPI.getOne(id);
        setTour(res.data);
      } catch (error) {
        console.error("Failed to fetch tour", error);
      }
    };
    fetchTour();
  }, [id]);

  if (!tour) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Tour Not Found
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/tours")}
          sx={{ borderRadius: 2, px: 4 }}
        >
          Back to Tours
        </Button>
      </Container>
    );
  }

  const whatsappLink = () => {
    const phone = "917666642587";

    const text =
      `Hello Holidays Care,%0A%0A` +
      `I'm interested in booking the *${tour.title}* tour.%0A` +
      `Duration: ${tour.duration || "N/A"}%0A` +
      `Price: ${tour.price}%0A%0A` +
      `Please share more details.`;

    window.open(`https://wa.me/${phone}?text=${text}`);
  };

  return (
    <Box>

      {/* HERO */}
      <Box
        component={motion.div}
        initial="hidden"
        animate="show"
        variants={fadeUp}
        sx={{
          height: { xs: 320, md: 480 },
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.65)), url(${API_URL}${tour?.images?.[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end"
        }}
      >
        <Container sx={{ pb: 5 }}>
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: 800,
              fontSize: { xs: "1.8rem", md: "3rem" }
            }}
          >
            {tour.title}
          </Typography>

          {tour.duration && (
            <Typography sx={{ color: "#90caf9", mt: 1 }}>
              🕐 {tour.duration}
            </Typography>
          )}
        </Container>
      </Box>

      {/* MAIN */}
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={5}>

          {/* LEFT */}
          <Grid item xs={12} md={8}>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {tour.description && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    Overview
                  </Typography>

                  <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.9, color: "#444" }}>
                    {tour.description}
                  </Typography>
                </Box>
              )}
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {(tour.highlights || []).length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                    Tour Highlights
                  </Typography>

                  {tour.highlights.map((item, index) => (
                    <Box key={index} sx={{ display: "flex", mb: 1.5 }}>
                      <CheckCircleOutlineIcon sx={{ color: "#1976d2", mr: 1.5 }} />
                      <Typography>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {(tour.itinerary || []).length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                    Day Wise Itinerary
                  </Typography>

                  <Box sx={{ borderLeft: "3px solid #1976d2", pl: 3 }}>
                    {tour.itinerary.map((day, index) => (
                      <Box key={index} sx={{ mb: 3 }}>
                        <Typography sx={{ fontWeight: 700 }}>
                          Day {index + 1}
                        </Typography>

                        <Typography sx={{ color: "#555" }}>
                          {day.title || day}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </motion.div>

          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={4}>
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Card
                sx={{
                  p: 4,
                  borderRadius: 3,
                  position: "sticky",
                  top: 100,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
              >
                <Typography sx={{ mb: 1 }}>Starting at</Typography>

                <Typography variant="h4" sx={{ fontWeight: 800, color: "#1976d2", mb: 2 }}>
                  ₹{tour?.price?.toLocaleString()}/-
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Button
                  variant="contained"
                  fullWidth
                  onClick={whatsappLink}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 700,
                    background: "#25d366",
                    "&:hover": { background: "#1ebe5d" }
                  }}
                >
                  Book on WhatsApp
                </Button>
              </Card>
            </motion.div>
          </Grid>

        </Grid>
      </Container>

    </Box>
  );
};

export default TourDetailPage;