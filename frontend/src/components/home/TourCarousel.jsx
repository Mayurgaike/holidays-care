import { Box, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useRef, useState, useEffect } from "react";
import useCarousel from "@/hooks/useCarousel";
import useAutoScroll from "@/hooks/useAutoScroll";
import TourCard from "./TourCard";
import { useNavigate } from "react-router-dom";

export default function TourCarousel({ tours }) {
  const navigate = useNavigate();
  const { next, prev, getVisible } = useCarousel(tours.length);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isHovered, next]);

  useAutoScroll(scrollRef);

  const arrowStyles = {
    display: { xs: "none", md: "flex" },
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    bgcolor: "#fff",
    border: "1px solid #e0e0e0",
    width: 48,
    height: 48,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    "&:hover": { bgcolor: "#f5f5f5" },
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* FIXED WIDTH WRAPPER FOR DESKTOP */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px", // 🔥 LOCK DESKTOP WIDTH
          position: "relative",
        }}
      >
        {/* Arrows */}
        <IconButton
          onClick={prev}
          sx={{
            ...arrowStyles,
            left: "-60px", // 🔥 fixed outside position
          }}
        >
          <ArrowBackIosNew fontSize="small" />
        </IconButton>

        <IconButton
          onClick={next}
          sx={{
            ...arrowStyles,
            right: "-60px", // 🔥 fixed outside position
          }}
        >
          <ArrowForwardIos fontSize="small" />
        </IconButton>

        {/* Desktop */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
          }}
        >
          {getVisible().map((i) => (
            <Box
              key={i}
              sx={{
                flex: 1, // 🔥 equal width always
              }}
            >
              <TourCard
                tour={tours[i]}
                onClick={() => navigate(`/tours?destination=${tours[i].name}`)}
              />
            </Box>
          ))}
        </Box>

        {/* Mobile */}
        <Box
          ref={scrollRef}
          sx={{
            display: { xs: "flex", md: "none" },
            overflowX: "auto",
            gap: 2,
            scrollSnapType: "x mandatory",
          }}
        >
          {tours.map((tour, i) => (
            <Box
              key={i}
              sx={{
                flex: "0 0 100%",
                scrollSnapAlign: "start",
              }}
            >
              <TourCard
                tour={tour}
                onClick={() => navigate(`/tours?destination=${tour.name}`)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
