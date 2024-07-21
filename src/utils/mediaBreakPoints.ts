const breakpoints = {
  mobile: "480px",
  desktop: "1024px",
  tabletPortrait: "768px",
};

export const media = {
  mobile: `(max-width: ${breakpoints.mobile})`,
  tabletPortrait: `(min-width: ${
    parseInt(breakpoints.mobile) + 1
  }px) and (max-width: ${breakpoints.tabletPortrait})`,
  desktop: `(min-width: ${parseInt(breakpoints.tabletPortrait) + 1}px)`,
};
