//미디어쿼리
const size = {
  mobile: "767px",
  min_tablet: "768px",
  max_tablet: "1023px",
  desktop: "1024px",
};

const colors = {
  // main: "skyblue",
  main: "#93E0FF",
  text: "white",
};
const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width:${size.min_tablet}) and (max-width:${size.max_tablet})`,
  desktop: `(min-width: ${size.desktop})`,
  tablet_desktop: `(min-width:${size.min_tablet}) and (max-width:${size.desktop})`,
};

const theme = {
  size,
  colors,
  device,
};
export default theme;
