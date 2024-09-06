import React, { useCallback, useEffect, useRef, useState } from "react";

const useToggle = () => {
  const [toggle, setToggle] = useState(false);
  const toggleRef = useRef<HTMLDivElement | HTMLButtonElement | null>(null);

  const toggleState = useCallback(() => setToggle((prev) => !prev), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { toggle, toggleState, toggleRef };
};

export default useToggle;
