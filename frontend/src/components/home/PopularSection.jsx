import { Box, Container, Typography, Button, Chip } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

export default function PopularSection({ tours = [] }) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || tours.length === 0) return;

    // Only auto-scroll on mobile (width < 600px)
    const isMobile = window.innerWidth < 600;
    if (!isMobile) return;

    const cardWidth = el.offsetWidth; // each card = 100% of container

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % tours.length;
        el.scrollTo({ left: next * cardWidth, behavior: "smooth" });
        return next;
      });
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [tours]);

  // Pause auto-scroll on user interaction, resume after 5s
  const handleTouchStart = () => {
    clearInterval(intervalRef.current);
  };

  const handleTouchEnd = () => {
    const el = scrollRef.current;
    if (!el || tours.length === 0) return;
    const cardWidth = el.offsetWidth;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % tours.length;
        el.scrollTo({ left: next * cardWidth, behavior: "smooth" });
        return next;
      });
    }, 3000);
  };

  if (!tours.length) return null;

  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #1b4557, #275f72, #2b5e74)",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Chip
            icon={<Star sx={{ color: "#ff9800 !important" }} />}
            label="Top Picks"
            sx={{
              fontWeight: 700,
              mb: 2,
              bgcolor: "rgba(255,255,255,0.1)",
              border: "1px solid #ff9800",
              color: "white",
              backdropFilter: "blur(6px)",
            }}
          />
          <Typography
            variant="h3"
            fontWeight={800}
            gutterBottom
            sx={{ color: "white" }}
          >
            Most Popular Tours
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
            Our most loved destinations by travelers around the globe.
          </Typography>
        </Box>

        {/* ── MOBILE: horizontal scroll-snap carousel ── */}
        <Box
          ref={scrollRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          sx={{
            display: { xs: "flex", sm: "none" },
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            gap: 0,
            // hide scrollbar
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {tours.map((tour, i) => (
            <Box
              key={i}
              sx={{
                flex: "0 0 100%",
                width: "100%",
                scrollSnapAlign: "start",
                height: 460,
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                "&:hover img": { transform: "scale(1.1)" },
              }}
            >
              <Box
                component="img"
                src={`${API_URL}${tour?.images?.[0]}`}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "0.6s",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  p: 4,
                  color: "white",
                  width: "100%",
                }}
              >
                <Typography variant="overline">{tour.caption}</Typography>
                <Typography variant="h4" fontWeight={800}>
                  {tour?.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85, mt: 2, fontSize: "0.85rem" }}>
                  Starting from
                </Typography>
                <Typography variant="h5" fontWeight={800} sx={{ color: "#4fc3f7", mb: 2 }}>
                  ₹{tour?.price?.toLocaleString()}/-
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ borderRadius: 2, py: 1.5, fontWeight: 700, textTransform: "none" }}
                  onClick={() => navigate(`/tour/${tour._id}`)}
                >
                  Book Now
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

        {/* ── MOBILE: dot indicators ── */}
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "center",
            gap: 1,
            mt: 2.5,
          }}
        >
          {tours.map((_, i) => (
            <Box
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                el.scrollTo({ left: i * el.offsetWidth, behavior: "smooth" });
                setActiveIndex(i);
              }}
              sx={{
                width: activeIndex === i ? 24 : 8,
                height: 8,
                borderRadius: 99,
                bgcolor: activeIndex === i ? "#4fc3f7" : "rgba(255,255,255,0.35)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>

        {/* ── DESKTOP: original flex grid ── */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: 7,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {tours.map((tour, i) => (
            <Box
              key={i}
              sx={{
                flex: { sm: "0 0 48%", md: "0 0 30%" },
                maxWidth: { sm: "48%", md: "30%" },
                height: 460,
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                "&:hover img": { transform: "scale(1.1)" },
              }}
            >
              <Box
                component="img"
                src={`${API_URL}${tour?.images?.[0]}`}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "0.6s",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  p: 4,
                  color: "white",
                  width: "100%",
                }}
              >
                <Typography variant="overline">{tour.caption}</Typography>
                <Typography variant="h4" fontWeight={800}>
                  {tour?.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85, mt: 2, fontSize: "0.85rem" }}>
                  Starting from
                </Typography>
                <Typography variant="h5" fontWeight={800} sx={{ color: "#4fc3f7", mb: 2 }}>
                  ₹{tour?.price?.toLocaleString()}/-
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ borderRadius: 2, py: 1.5, fontWeight: 700, textTransform: "none" }}
                  onClick={() => navigate(`/tour/${tour._id}`)}
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