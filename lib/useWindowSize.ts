import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [state, setState] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
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
  }, []);

  return state;
};

export default useWindowSize;
