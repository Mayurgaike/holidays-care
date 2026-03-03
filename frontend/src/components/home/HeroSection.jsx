import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Autocomplete,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection({ heroImages = [], tours = [] }) {

  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [searchValue, setSearchValue] = useState(null);

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
    ? `http://localhost:5000${heroImages[current].imageUrl}`
    : "/hero.png";

  const handleSearch = () => {
    if (!searchValue) return;
    navigate(`/tour/${searchValue.id}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "55vh", sm: "65vh", md: "95vh" },
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
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center"
        }}
      >

        <Typography
          variant="h3"
          fontWeight={800}
          sx={{
            mb: 3,
            fontSize: { xs: "1.8rem", md: "3rem" },
            textShadow: "2px 2px 10px rgba(0,0,0,0.4)"
          }}
        >
          Find Your Next Destination
        </Typography>

        {/* SEARCH BAR */}
        <Paper
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            borderRadius: "50px",
            overflow: "hidden"
          }}
        >

          <Autocomplete
            freeSolo
            options={tours}
            getOptionLabel={(option) => option.name || ""}
            onChange={(e, value) => setSearchValue(value)}
            sx={{ flex: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search destinations..."
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />

          <Button
            onClick={handleSearch}
            variant="contained"
            sx={{
              borderRadius: "40px",
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 600
            }}
          >
            Search
          </Button>

        </Paper>

      </Container>

    </Box>
  );
}