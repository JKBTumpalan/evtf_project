module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        mobilenet:
          "url(https://cms.bbcearth.com/sites/default/files/2020-12/2eft70000001000.jpg)",
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
