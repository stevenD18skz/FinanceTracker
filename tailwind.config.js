/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {},
};
export const plugins = [
  plugin(function ({ addUtilities }) {
    addUtilities({
      ".grid-areas-[aside_main_player_player]": {
        "grid-template-areas": '"aside main" "player player"',
      },
    });
  }),
];
