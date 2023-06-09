import { useEffect, useRef, useState } from "react";

const useWindowSize = () => {
  const [state, setState] = useState<{ width: number; height: number }>();
  const [active, setActive] = useState();
  useEffect(() => {
    if (active) {
      const handler = () => {
        if (typeof window !== "undefined") {
          setState({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
      };

      window.addEventListener("resize", handler);

      return () => {
        window.addEventListener("resize", handler);
      };
    }
  }, [active]);

  return { ...state, setActive };
};

export default useWindowSize;
