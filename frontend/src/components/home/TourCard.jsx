import { Box, Typography, Button } from "@mui/material";

export default function TourCard({ tour, onClick }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 380, // 🔥 fixed height for ALL cards
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
        src={tour.image}
        alt={tour.name}
        sx={{
          width: "100%",
          height: 220, // 🔥 fixed image height
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
          <Typography variant="h6" fontWeight={700}>
            {tour.name}
          </Typography>

          <Typography
            variant="h5"
            color="primary"
            fontWeight={800}
            sx={{ mt: 1 }}
          >
            ₹{tour.price.toLocaleString()}
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