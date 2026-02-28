import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import toursData from "../data/toursData";

import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Card,
  CardContent,
  Button,
  Divider
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
        <Typography variant="h4" sx={{ mb: 3 }}>Tour Not Found</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/tours")}
          sx={{ borderRadius: 2, px: 4, fontWeight: 600, textTransform: "none" }}
        >
          Back to Tours
        </Button>
      </Container>
    );
  }

  return (
    <Box>

      {/* HERO IMAGE */}
      <Box
        sx={{
          height: { xs: 280, md: 450 },
          backgroundImage: `url(${tour.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end"
        }}
      >
        <Box sx={{ width: "100%", background: "rgba(0,0,0,0.6)", p: { xs: 3, md: 5 } }}>
          <Container>
            <Typography
              variant="h3"
              sx={{ color: "white", fontWeight: 800, fontSize: { xs: "1.8rem", md: "3rem" } }}
            >
              {tour.name}
            </Typography>
            {tour.duration && (
              <Typography sx={{ color: "#90caf9", mt: 1, fontWeight: 500, fontSize: "1.05rem" }}>
                🕐 {tour.duration}
              </Typography>
            )}
          </Container>
        </Box>
      </Box>

      <Container sx={{ py: { xs: 5, md: 8 } }}>

        {/* PRICE + BOOK BUTTON ROW */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            mb: 5,
            gap: 2
          }}
        >
          <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: 800 }}>
            Starting From {tour.price}
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => {
              const phone = "917666642587";
              const text =
                `Hello Holidays Care,%0A%0A` +
                `I'm interested in booking the *${tour.name}* tour.%0A` +
                `Duration: ${tour.duration || 'N/A'}%0A` +
                `Price: ${tour.price}%0A%0A` +
                `Please share more details.`;
              window.open(`https://wa.me/${phone}?text=${text}`);
            }}
            sx={{
              px: 4, py: 1.5, fontWeight: 700,
              fontSize: "1rem", textTransform: "none",
              borderRadius: 3,
              background: "linear-gradient(135deg,#25d366,#128c7e)",
              boxShadow: "0 6px 20px rgba(37,211,102,0.4)",
              "&:hover": { background: "linear-gradient(135deg,#128c7e,#075e54)" }
            }}
          >
            📲 Book on WhatsApp
          </Button>
        </Box>

        <Divider sx={{ mb: 5 }} />

        {/* DESCRIPTION */}
        {tour.description && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Overview
            </Typography>
            <Typography sx={{ lineHeight: 2, fontSize: "1.05rem", color: "#444" }}>
              {tour.description}
            </Typography>
          </Box>
        )}

        {/* HIGHLIGHTS */}
        {(tour.highlights || []).length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Tour Highlights
            </Typography>
            <Box>
              {(tour.highlights || []).map((item, index) => (
                <Chip
                  key={index}
                  label={`✨ ${item}`}
                  sx={{
                    mr: 1, mb: 1.5,
                    bgcolor: "#e3f2fd",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    py: 0.5
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* ITINERARY */}
        {(tour.itinerary || []).length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Day Wise Itinerary
            </Typography>
            <Grid container spacing={2}>
              {(tour.itinerary || []).map((day, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card
                    elevation={2}
                    sx={{ borderLeft: "4px solid #1976d2", borderRadius: 2 }}
                  >
                    <CardContent>
                      <Typography sx={{ fontWeight: 600, lineHeight: 1.6 }}>
                        {day}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* INCLUSIONS / EXCLUSIONS */}
        {((tour.includes || []).length > 0 || (tour.excludes || []).length > 0) && (
          <Grid container spacing={4} sx={{ mb: 6 }}>

            {(tour.includes || []).length > 0 && (
              <Grid item xs={12} md={6}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#2e7d32" }}>
                  ✅ Inclusions
                </Typography>
                <Card sx={{ borderRadius: 2, border: "1px solid #c8e6c9" }}>
                  <CardContent>
                    {(tour.includes || []).map((item, i) => (
                      <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                        <CheckCircleOutlineIcon sx={{ color: "#2e7d32", mr: 1.5, fontSize: 20 }} />
                        <Typography sx={{ fontSize: "0.95rem" }}>{item}</Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            )}

            {(tour.excludes || []).length > 0 && (
              <Grid item xs={12} md={6}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#c62828" }}>
                  ❌ Exclusions
                </Typography>
                <Card sx={{ borderRadius: 2, border: "1px solid #ffcdd2" }}>
                  <CardContent>
                    {(tour.excludes || []).map((item, i) => (
                      <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                        <CancelOutlinedIcon sx={{ color: "#c62828", mr: 1.5, fontSize: 20 }} />
                        <Typography sx={{ fontSize: "0.95rem" }}>{item}</Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            )}

          </Grid>
        )}

        {/* BOTTOM BOOK BUTTON */}
        <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              const phone = "917666642587";
              const text =
                `Hello Holidays Care,%0A%0A` +
                `I'm interested in booking the *${tour.name}* tour.%0A` +
                `Duration: ${tour.duration || 'N/A'}%0A` +
                `Price: ${tour.price}%0A%0A` +
                `Please share more details.`;
              window.open(`https://wa.me/${phone}?text=${text}`);
            }}
            sx={{
              px: 8, py: 1.8, fontWeight: 700,
              fontSize: "1.1rem", textTransform: "none",
              borderRadius: 3,
              background: "linear-gradient(135deg,#1976d2,#0d47a1)",
              boxShadow: "0 6px 20px rgba(25,118,210,0.4)",
              "&:hover": { background: "linear-gradient(135deg,#1565c0,#0a3578)" }
            }}
          >
            Book This Tour on WhatsApp
          </Button>
        </Box>

      </Container>
    </Box>
  );
};

export default TourDetailPage;