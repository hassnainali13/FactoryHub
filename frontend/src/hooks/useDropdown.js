import { useState, useRef, useEffect } from "react";

/**
 * useDropdown hook
 * Provides dropdown open/close state and a ref for outside click detection
 */
export default function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Toggle function
  const toggle = () => setOpen((prev) => !prev);

  return { open, setOpen, toggle, ref };
}
