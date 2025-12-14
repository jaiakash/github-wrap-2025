'use client';

import { useTheme } from './ThemeProvider';
import StarField from './backgrounds/StarField';
import AuroraOrbs from './backgrounds/AuroraOrbs';
import CyberGrid from './backgrounds/CyberGrid';

export default function BackgroundManager() {
  const { theme } = useTheme();

  switch (theme) {
    case 'aurora':
      return <AuroraOrbs />;
    case 'cyber':
      return <CyberGrid />;
    case 'midnight':
    default:
      return <StarField />;
  }
}
