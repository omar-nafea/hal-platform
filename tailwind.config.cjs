module.exports = {
  container: {
    center: true,
    padding: "1rem",
  },
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
