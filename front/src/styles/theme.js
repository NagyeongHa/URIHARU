//미디어쿼리
const size = {
  mobile: "767px",
  desktop: "768px",
};

const colors = {
  main: "#ffa600d0",
  text: "white",
};
const device = {
  mobile: `(max-width: ${size.mobile})`,
  desktop: `(min-width: ${size.desktop})`,
};

const theme = {
  colors,
  device,
};
export default theme;
