import { useState, useCallback } from "react";

export const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      return !prev;
    });
  }, []);

  return [isOpen, toggle] as const;
};
