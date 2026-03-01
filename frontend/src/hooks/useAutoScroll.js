import { useEffect } from "react";

export default function useAutoScroll(ref, interval = 2500) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timer = setInterval(() => {
      const cardWidth = el.offsetWidth;
      const maxScroll = el.scrollWidth - el.offsetWidth;

      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollTo({
          left: el.scrollLeft + cardWidth,
          behavior: "smooth"
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [ref, interval]);
}