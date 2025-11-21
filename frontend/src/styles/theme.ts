export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgQuaternary: string;
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  borderPrimary: string;
  shadowPrimary: string;
  shadowSecondary: string;
  scrollbarTrack: string;
  scrollbarThumb: string;
  scrollbarThumbHover: string;
  gradients: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

export const darkTheme: ThemeColors = {
  bgPrimary: '#0a0c0f',
  bgSecondary: '#152946',
  bgTertiary: '#1a1f2b',
  bgQuaternary: '#2c3e50',
  textPrimary: '#e5e7eb',
  textSecondary: '#5faeff',
  textAccent: '#47c9ff',
  borderPrimary: '#152946',
  shadowPrimary: 'rgba(21, 41, 70, 0.3)',
  shadowSecondary: 'rgba(26, 31, 43, 0.4)',
  scrollbarTrack: '#152946',
  scrollbarThumb: 'linear-gradient(135deg, #2a3b5e 0%, #5faeff 100%)',
  scrollbarThumbHover: 'linear-gradient(135deg, #47c9ff 0%, #5faeff 100%)',
  gradients: {
    primary: 'linear-gradient(135deg, #152946 0%, #2a3b5e 100%)',
    secondary: 'linear-gradient(135deg, #1a1f2b 0%, #2c3e50 100%)',
    tertiary: 'linear-gradient(90deg, #1a1f2b 0%, #2a3b5e 50%, #5faeff 100%)'
  }
};

export const lightTheme: ThemeColors = {
  bgPrimary: '#ffffff',
  bgSecondary: '#f8fafc',
  bgTertiary: '#e2e8f0',
  bgQuaternary: '#cbd5e1',
  textPrimary: '#1e293b',
  textSecondary: '#3b82f6',
  textAccent: '#0ea5e9',
  borderPrimary: '#e2e8f0',
  shadowPrimary: 'rgba(59, 130, 246, 0.1)',
  shadowSecondary: 'rgba(30, 41, 59, 0.1)',
  scrollbarTrack: '#e2e8f0',
  scrollbarThumb: 'linear-gradient(135deg, #cbd5e1 0%, #3b82f6 100%)',
  scrollbarThumbHover: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
  gradients: {
    primary: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    secondary: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    tertiary: 'linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 50%, #3b82f6 100%)'
  }
};

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeColors {}
}