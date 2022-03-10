module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        22: ["22px", "30px"],
      },
      colors: {
        "sidebar-dark": "#30475E",
        "sidebar-dark-alt": "#222831",
        "sidebar-red": "#F05454",
        "top-bar-light": "#F7F4F3",
        "expense-badge": "#EF2A4C",
        "income-badge": "#0EA5E9",
        "blue-dark": "#1C658C",
        "modal-drop": "#11468f",
        "input-gray": "#94A3B8",
        "gray-dark": "#111827",
      },

      boxShadow: {
        "top-bar": "0px 1px 8px rgba(34, 40, 49, 0.15)",
        "modal-header": "0px 0.5px 4px rgba(0, 0, 0, 0.25)",
        "date-input-inner": "inset 1px 1px 1.5px rgba(0, 0, 0, 0.25)",
      },

      opacity: {
        15: ".15",
      },

      spacing: {
        modal: "37.8125rem",
      },
    },
  },
  plugins: [],
};
