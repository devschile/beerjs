tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#ec5b13",
        "background-light": "#0a0f14",
        "background-dark": "#05080a",
        "hacker-green": "#5de619",
        "hacker-cyan": "#00f2ff",
        "hacker-magenta": "#ff00ff",
      },
      fontFamily: {
        "display": ["IBM Plex Mono", "monospace"],
        "sans": ["Public Sans", "sans-serif"]
      },
      borderRadius: { "DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "9999px" },
    },
  },
}
