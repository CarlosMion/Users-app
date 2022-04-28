type MediaQueries = {
  desktop: () => string;
  mobile: () => string;
};

export const mediaQueries: MediaQueries = {
  desktop: () => '@media screen and (min-width: 813px)',
  mobile: () => '@media screen and (max-width: 812px)',
};
