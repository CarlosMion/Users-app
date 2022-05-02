import React from 'react';

import {
  loadingCircleTransition,
  loadingCircleVariants,
  loadingContainerVariants,
} from './constants';
import { Circle, Container } from './styled';

export function LoadingDots() {
  return (
    <Container variants={loadingContainerVariants} initial="start" animate="end">
      <Circle variants={loadingCircleVariants} transition={loadingCircleTransition} />
      <Circle variants={loadingCircleVariants} transition={loadingCircleTransition} />
      <Circle variants={loadingCircleVariants} transition={loadingCircleTransition} />
    </Container>
  );
}
