export const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const loadingCircleVariants = {
  start: {
    y: '50%',
  },
  end: {
    y: '100%',
  },
};

export const loadingCircleTransition = {
  duration: 0.5,
  type: 'spring',
  damping: 0,
  mass: 2.5,
};
