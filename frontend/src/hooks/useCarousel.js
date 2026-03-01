import { useState, useCallback } from "react";

export default function useCarousel(length) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % length);
  }, [length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  const getVisible = useCallback(
    (count = 3) => {
      const items = [];
      for (let i = 0; i < count; i++) {
        items.push((index + i) % length);
      }
      return items;
    },
    [index, length],
  );

  return { index, next, prev, getVisible };
}
