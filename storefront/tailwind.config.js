const path = require("path")

module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
        spacing:
          "margin, padding, gap, top, right, bottom, left, inset",
        transform: "transform",
        glass:
          "background-color, border-color, backdrop-filter, box-shadow, transform, opacity",
      },

      colors: {
        lgv: {
          black: "#03060D",
          "black-soft": "#0A101B",
          blue: "#0000FF",
          cyan: "#00AEEF",
          white: "#FFFFFF",
          "white-soft": "rgba(255,255,255,0.72)",
          border: "rgba(255,255,255,0.10)",
          glass: "rgba(255,255,255,0.08)",
          "glass-strong": "rgba(255,255,255,0.12)",
        },

        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
      },
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        circle: "9999px",
      },
      maxWidth: {
        "8xl": "100rem",
        "hero-lg": "90rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
        "4xl-fluid": ["clamp(2.2rem, 4vw, 3.75rem)", { lineHeight: "1.02" }],
        "hero-fluid": ["clamp(2.5rem, 6vw, 5.25rem)", { lineHeight: "0.98" }],
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
      },

      boxShadow: {
        "lgv-soft": "0 10px 30px rgba(0,0,0,0.18)",
        "lgv-medium": "0 20px 60px rgba(0,0,0,0.28)",
        "lgv-cyan":
          "0 10px 30px rgba(0,174,239,0.16), 0 0 80px rgba(0,174,239,0.10)",
        "lgv-blue":
          "0 10px 30px rgba(0,0,255,0.14), 0 0 80px rgba(0,0,255,0.10)",
        "lgv-glass":
          "0 20px 60px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
      },

      backgroundImage: {
        "lgv-hero":
          "radial-gradient(circle at top left, rgba(0,174,239,0.15), transparent 28%), radial-gradient(circle at top right, rgba(0,0,255,0.12), transparent 30%), linear-gradient(180deg, #02040a 0%, #07111d 100%)",
        "lgv-radial":
          "radial-gradient(circle at 20% 20%, rgba(0,174,239,0.20), transparent 25%), radial-gradient(circle at 80% 0%, rgba(0,0,255,0.20), transparent 25%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
        "lgv-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "lgv-glass":
          "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
        "lgv-button":
          "linear-gradient(135deg, #0000FF 0%, #00AEEF 100%)",
        "lgv-text":
          "linear-gradient(135deg, #FFFFFF 0%, #D8F7FF 35%, #7FDCFF 65%, #FFFFFF 100%)",
      },

      backdropBlur: {
        xs: "2px",
        glass: "16px",
        "glass-lg": "24px",
      },

      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },

        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },

        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },

        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },

        "accordion-slide-down": {
          "0%": {
            minHeight: "0",
            maxHeight: "0",
            opacity: "0",
          },
          "100%": {
            minHeight: "var(--radix-accordion-content-height)",
            maxHeight: "none",
            opacity: "1",
          },
        },

        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },

        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },

        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },

        "lgv-float-soft": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },

        "lgv-float-slow": {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-16px,0)" },
        },

        "lgv-glow-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 10px 30px rgba(0,174,239,0.12), 0 0 60px rgba(0,0,255,0.08)",
          },
          "50%": {
            boxShadow:
              "0 16px 40px rgba(0,174,239,0.22), 0 0 90px rgba(0,0,255,0.16)",
          },
        },

        "lgv-reveal-up": {
          from: {
            opacity: "0",
            transform: "translateY(24px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        "lgv-blur-in": {
          from: {
            opacity: "0",
            filter: "blur(18px)",
            transform: "scale(0.98)",
          },
          to: {
            opacity: "1",
            filter: "blur(0)",
            transform: "scale(1)",
          },
        },

        "lgv-marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },

        "lgv-focus-in": {
          from: {
            opacity: "0",
            filter: "blur(10px)",
          },
          to: {
            opacity: "1",
            filter: "blur(0)",
          },
        },

        "lgv-card-lift": {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-6px)",
          },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top":
          "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",

        "float-soft": "lgv-float-soft 6s ease-in-out infinite",
        "float-slow": "lgv-float-slow 9s ease-in-out infinite",
        "glow-pulse": "lgv-glow-pulse 3.8s ease-in-out infinite",
        "reveal-up":
          "lgv-reveal-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "blur-in":
          "lgv-blur-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "marquee-slow": "lgv-marquee 24s linear infinite",
        "focus-in": "lgv-focus-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
}
