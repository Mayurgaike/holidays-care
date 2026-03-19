import { Box, Typography, Button } from "@mui/material";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function TourCard({ tour, onClick }) {
  const image =
    tour?.images?.length > 0
      ? `${API_URL}${tour.images[0]}`
      : "/placeholder.jpg";

  return (
    <Box
      sx={{
        width: "100%",
        height: 380,
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #eee",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
          transform: "translateY(-6px)",
        },
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={image}
        alt={tour?.title}
        sx={{
          width: "100%",
          height: 200, 
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={700} color="#111">
            {tour?.title} 
          </Typography>

          <Typography
            variant="h5"
            color="primary"
            fontWeight={800}
            sx={{ mt: 1 }}
          >
           Starting at ₹{tour?.price.toLocaleString()}/-
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={onClick}
          sx={{
            mt: 2,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          GET A QUOTE
        </Button>
      </Box>
    </Box>
  );
}
