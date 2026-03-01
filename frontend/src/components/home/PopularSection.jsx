import { Box, Container, Typography, Button, Chip } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function PopularSection({ tours = [] }) {
  const navigate = useNavigate();

  if (!tours.length) return null;

  return (
    <Box sx={{ py: 10, bgcolor: "#fcf8f5" }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Chip
            icon={<Star sx={{ color: "#ff9800 !important" }} />}
            label="Top Picks"
            sx={{
              fontWeight: 700,
              mb: 2,
              bgcolor: "#fff",
              border: "1px solid #ff9800",
            }}
          />

          <Typography variant="h3" fontWeight={800} gutterBottom>
            Most Popular Tours
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Our most loved destinations by travelers around the globe.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {tours.map((tour, i) => (
            <Box
              key={i}
              sx={{
                flex: {
                  xs: "0 0 100%",
                  sm: "0 0 48%",
                  md: "0 0 30%",
                },
                maxWidth: {
                  xs: "100%",
                  sm: "48%",
                  md: "30%",
                },
                height: 420, // 🔥 fixed height
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                "&:hover img": { transform: "scale(1.1)" },
              }}
            >
              {/* Image */}
              <Box
                component="img"
                src={tour.image}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "0.6s",
                }}
              />

              {/* Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  p: 4,
                  color: "white",
                }}
              >
                <Typography variant="overline">{tour.caption}</Typography>

                <Typography variant="h4" fontWeight={800}>
                  {tour.name}
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={800}
                  sx={{ color: "#4fc3f7", my: 2 }}
                >
                  ₹{tour.price.toLocaleString()}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                  onClick={() => navigate(`/tours?destination=${tour.name}`)}
                >
                  Book Now
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
