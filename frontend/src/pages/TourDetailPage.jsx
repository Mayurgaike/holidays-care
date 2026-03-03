import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import toursData from "../data/toursData";

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
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const TourDetailPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const tour = toursData.find((t) => t.id === id);

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
      `I'm interested in booking the *${tour.name}* tour.%0A` +
      `Duration: ${tour.duration || "N/A"}%0A` +
      `Price: ${tour.price}%0A%0A` +
      `Please share more details.`;

    window.open(`https://wa.me/${phone}?text=${text}`);
  };

  return (
    <Box>

      {/* HERO */}
      <Box
        sx={{
          height: { xs: 320, md: 480 },
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.65)), url(${tour.image})`,
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
            {tour.name}
          </Typography>

          {tour.duration && (
            <Typography
              sx={{ color: "#90caf9", mt: 1, fontWeight: 500 }}
            >
              🕐 {tour.duration}
            </Typography>
          )}
        </Container>
      </Box>

      {/* MAIN SECTION */}
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={5}>

          {/* LEFT CONTENT */}
          <Grid item xs={12} md={8}>

            {/* OVERVIEW */}
            {tour.description && (
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 2 }}
                >
                  Overview
                </Typography>

                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    lineHeight: 1.9,
                    color: "#444"
                  }}
                >
                  {tour.description}
                </Typography>
              </Box>
            )}

            {/* HIGHLIGHTS */}
            {(tour.highlights || []).length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 3 }}
                >
                  Tour Highlights
                </Typography>

                {(tour.highlights || []).map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1.5
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{ color: "#1976d2", mr: 1.5 }}
                    />

                    <Typography>{item}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* ITINERARY */}
            {(tour.itinerary || []).length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 3 }}
                >
                  Day Wise Itinerary
                </Typography>

                <Box
                  sx={{
                    borderLeft: "3px solid #1976d2",
                    pl: 3
                  }}
                >
                  {(tour.itinerary || []).map((day, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography
                        sx={{ fontWeight: 700 }}
                      >
                        Day {index + 1}
                      </Typography>

                      <Typography
                        sx={{ color: "#555" }}
                      >
                        {day}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* INCLUSIONS / EXCLUSIONS */}
            {((tour.includes || []).length > 0 ||
              (tour.excludes || []).length > 0) && (

              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 3 }}
                >
                  Inclusions & Exclusions
                </Typography>

                <Grid container spacing={4}>

                  {/* INCLUSIONS */}
                  {(tour.includes || []).length > 0 && (
                    <Grid item xs={12} md={6}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: "#2e7d32"
                        }}
                      >
                        Included
                      </Typography>

                      {(tour.includes || []).map((item, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1.5
                          }}
                        >
                          <CheckCircleOutlineIcon
                            sx={{
                              color: "#2e7d32",
                              mr: 1.5,
                              fontSize: 20
                            }}
                          />

                          <Typography>{item}</Typography>
                        </Box>
                      ))}
                    </Grid>
                  )}

                  {/* EXCLUSIONS */}
                  {(tour.excludes || []).length > 0 && (
                    <Grid item xs={12} md={6}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: "#c62828"
                        }}
                      >
                        Not Included
                      </Typography>

                      {(tour.excludes || []).map((item, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1.5
                          }}
                        >
                          <CancelOutlinedIcon
                            sx={{
                              color: "#c62828",
                              mr: 1.5,
                              fontSize: 20
                            }}
                          />

                          <Typography>{item}</Typography>
                        </Box>
                      ))}
                    </Grid>
                  )}

                </Grid>
              </Box>
            )}

          </Grid>

          {/* RIGHT BOOKING CARD */}
          <Grid item xs={12} md={4}>

            <Card
              sx={{
                p: 4,
                borderRadius: 3,
                position: "sticky",
                top: 100,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
            >

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#1976d2",
                  mb: 1
                }}
              >
                {tour.price}
              </Typography>

              {tour.duration && (
                <Typography
                  sx={{ mb: 3, color: "#555" }}
                >
                  Duration: {tour.duration}
                </Typography>
              )}

              <Divider sx={{ mb: 3 }} />

              <Button
                variant="contained"
                fullWidth
                onClick={whatsappLink}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "1rem",
                  background: "#25d366",
                  "&:hover": {
                    background: "#1ebe5d"
                  }
                }}
              >
                Book on WhatsApp
              </Button>

            </Card>

          </Grid>

        </Grid>
      </Container>

     

    </Box>
  );
};

export default TourDetailPage;