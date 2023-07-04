/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "top-to-down": {
          to: {
            top: "15px",
          },
        },
        "down-to-out-of-view": {
          to: {
            top: "-20px",
          },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        putIntoView: {
          to: { transform: "translateX(0)" },
        },
        putIntoView1: {
          to: { transform: "translateX(0)" },
        },
        putOutOfView: {
          to: { transform: "translateX(-100%)" },
        },
        despair: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },

        rotate1: {
          to: { transform: "rotate(45deg)" },
        },
        rotate3: {
          to: { transform: "rotate(-50deg)" },
        },
        firstDownForHamburger: {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(40%)" },
        },
        thirdDownForHamburger: {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(-40%)" },
        },

        rfirstDownForHamburger: {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(40%)" },
        },
        rthirdDownForHamburger: {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(-40%)" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: {
            transform: "rotate(360deg)",
          },
        },
        wave: {
          from: {
            transform: "rotate(-10deg)",
          },
          to: {
            transform: "rotate(30deg)",
          },
        },
      },
      animation: {
        "top-to-down": "top-to-down 500ms ease-in-out forwards",
        "down-to-out-of-view":
          "down-to-out-of-view 100ms 600ms ease-in-out forwards",
        spin: "spin 1s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        putIntoView1: "putIntoView 500ms ease-in-out forwards",
        putIntoView2: "putIntoView 500ms 75ms ease-in-out forwards",
        putIntoView3: "putIntoView 500ms 150ms ease-in-out forwards",
        putIntoView4: "putIntoView 500ms 225ms ease-in-out forwards",
        putOutOfView1: "putOutOfView 300ms 120ms ease-in-out forwards",
        putOutOfView2: "putOutOfView 300ms 100ms ease-in-out forwards",
        putOutOfView3: "putOutOfView 300ms 80ms ease-in-out forwards",
        putOutOfView4: "putOutOfView 300ms 60ms  ease-in-out forwards",
        "path-first":
          "firstDownForHamburger  300ms ease forwards,rotate1 500ms 500ms ease forwards",
        "path-third":
          "thirdDownForHamburger 300ms ease forwards,rotate3 500ms 500ms ease forwards",

        "reverse-path-first": "rfirstDownForHamburger   300ms ease reverse",
        "reverse-path-third": "rthirdDownForHamburger  300ms ease reverse",
        despair: "despair 300ms ease forwards",
        wave: "wave 800ms 10 alternate ease-in-out",
      },

      transformOrigin: {
        "middle-hand": "75% 80%",
        "hamburger-middle": "15px 20px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
