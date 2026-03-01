import { useEffect, useState, lazy, Suspense } from "react";
import { Explore, Public } from "@mui/icons-material";
import { heroAPI } from "../services/api";
// import { fetchTours } from "@/services/tour.service";
import {
  popularTours,
  domesticTours,
  internationalTours,
} from "@/data/tours.mock";

const HeroSection = lazy(() => import("@/components/home/HeroSection"));
const TourSection = lazy(() => import("@/components/home/TourSection"));
const PopularSection = lazy(() => import("@/components/home/PopularSection"));
const ContactSection = lazy(() => import("@/components/home/ContactSection"));

export default function HomePage() {
  const [heroImages, setHeroImages] = useState([]);
  //   const [domesticTours, setDomesticTours] = useState([]);
  //   const [internationalTours, setInternationalTours] = useState([]);

//   useEffect(() => {
    // fetchTours("domestic").then(setDomesticTours);
    // fetchTours("international").then(setInternationalTours);
//   }, []);
  useEffect(() => {
  heroAPI.getAll()
    .then((res) =>
      setHeroImages(
        res.data.length > 0
          ? res.data
          : [{ title: "Explore The World", subtitle: "Find your perfect destination", imageUrl: "" }]
      )
    )
    .catch(() =>
      setHeroImages([
        { title: "Explore The World", subtitle: "Find your perfect destination", imageUrl: "" }
      ])
    );
}, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroSection heroImages={heroImages} />

      <PopularSection tours={popularTours} />

      <TourSection
        icon={<Explore />}
        label="Incredible India"
        title="Domestic Escapes"
        subtitle="From snowy peaks to serene backwaters."
        tours={domesticTours}
      />

      <TourSection
        bg="#f8f9fa"
        icon={<Public />}
        label="Global Wonders"
        title="International Wonders"
        subtitle="Curated global experiences."
        tours={internationalTours}
      />

      <ContactSection />
    </Suspense>
  );
}
