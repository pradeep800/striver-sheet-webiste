"use client";
import { useConfetti } from "@/lib/useConfatti";
import confetti from "canvas-confetti";
import { useEffect, useId } from "react";

export default function Confetti() {
  const id = useId();
  const confettiOn = useConfetti((state) => state.confettiOn);
  const setConfettiOn = useConfetti((state) => state.setConfettiOn);
  useEffect(() => {
    if (!confettiOn) {
      return;
    }
    const myCanvas = document.getElementById(id) as HTMLCanvasElement;
    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });
    var count = 200;
    var defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
    setConfettiOn(false);
  }, [confettiOn]);
  return <canvas style={{ width: "0px" }} id={id} />;
}
