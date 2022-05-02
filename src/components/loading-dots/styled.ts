import styled from 'styled-components';
import { motion } from 'framer-motion';
import { mediaQueries } from 'utils/media-queries';

export const Container = styled(motion.div)`
  width: 52px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  padding: 0 6px;

  ${mediaQueries.desktop} {
    width: 88px;
    height: 40px;
  }
`;

export const Circle = styled(motion.div)`
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.sky};

  ${mediaQueries.desktop} {
    width: 18px;
    height: 18px;
  }
`;
