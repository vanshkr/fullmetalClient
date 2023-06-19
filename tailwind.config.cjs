/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        nobleBlack: "#202125",
        cursedBlack: "#121315",
        napolean: "#414248",
        blackishGrey: "5C5D63",
        stretchLimo: "#2A2C31",
        sheepSkin: "#D8B290",
        blueCharm: "#7EBFD8",
        gracefulGarden: "#CCA5D5",
        maxicanRedPapaya: "#C63F31",
        capeJasmine: "#FFBF5B",
        nonChalantWhite: "#DDDDD1",
        white: "#FFFFFF",
        chineseGreen: "#CADF59",
        drySeedlings: "#CAE962",
        blackRibbon: "#4A4B51",
        buckWheat: "#D5DDD5",
        greyHeather: "#868790",
        greenDynasty: "#778741",
        electricBlue: "#7BFCFC",
        metalise: "#35373D",
        seaFoam: "#86E3CE",
        blackWalnut: "#5E5046",
        lilacChampagne: " #DEE1E6",
      },
      animation: {
        slideup: "slideup 1s ease-in-out",
        slidedown: "slidedown 1s ease-in-out",
        slideleft: "slideleft 1s ease-in-out",
        slideright: "slideright 1s ease-in-out",
        wave: "wave 1.2s linear infinite",
        slowfade: "slowfade 2.2s ease-in-out",
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: "translateY(25%)" },
          to: { opacity: 1, transform: "none" },
        },
        slidedown: {
          from: { opacity: 0, transform: "translateY(-25%)" },
          to: { opacity: 1, transform: "none" },
        },
        slideleft: {
          from: { opacity: 0, transform: "translateX(-20px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideright: {
          from: { opacity: 0, transform: "translateX(20px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        wave: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
      },
    },
    plugins: [require("@tailwindcss/line-clamp")],
  },
};
