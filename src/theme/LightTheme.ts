import { DefaultTheme } from 'styled-components';

import { colors } from './colors';
import { typography } from './typography';

export const LightTheme: DefaultTheme = {
  colors: {
    ...colors,

    // skeleton
    skeletonBackground: '#EBEDF0',
    skeletonForeground: '#F0F3F8',
  },
  ...typography,
};
