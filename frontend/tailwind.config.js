module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        flowers:
          "url(https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2009/6/26/0/JI_Dandelions_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1400945145878.jpeg)",
        rps: "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/people-playing-paper-rock-scissors-royalty-free-illustration-1583269312.jpg?crop=0.994xw:0.799xh;0.00160xw,0.195xh&resize=2048:*)",
        img1: "url(https://images.unsplash.com/photo-1508394522741-82ac9c15ba69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=748&q=80)",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
