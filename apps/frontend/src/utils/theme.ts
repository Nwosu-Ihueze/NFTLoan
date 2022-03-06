import { createTheme, Theme } from '@nextui-org/react';

const sharedTheme: Theme = {
  theme: {
    fonts: {
      sans: 'Inter, SF Pro Display, -apple-system, sans-serif',
      mono: 'Inter, SF Pro Display, -apple-system, sans-serif'
    }
  }
};

export const lightTheme = createTheme({
  type: 'light',
  className: 'light',
  theme: {
    ...sharedTheme.theme,
    shadows: {
      modelViewerController: 'rgb(0 0 0 / 14%) 0px 0px 40px 0px inset'
    },
    colors: {
      background: '#ffffffff',
      headerBackground: 'hsla(0, 0%, 100%, 0.8)',
      gradientCardBorder: 'hsla(0, 0%, 0%, 0.1)',
      gradientCardBodyBackground: 'hsla(0, 0%, 100%, 0.8)',
      gradientCardBackground: 'linear-gradient(90deg, #ff6363 0%, #27061a 30%, #100321 55%, #9b4dff 100%)'
    }
  }
});

export const darkTheme = createTheme({
  type: 'dark',
  className: 'dark',
  theme: {
    ...sharedTheme.theme,
    shadows: {
      modelViewerController: 'rgb(255 255 255 / 14%) 0px 0px 40px 0px inset'
    },
    colors: {
      background: '#030106ff',
      headerBackground: 'hsla(0, 0%, 0%, 0.8)',
      gradientCardBorder: 'hsla(0, 0%, 100%, 0.1)',
      gradientCardBodyBackground: 'hsla(0, 0%, 0%, 0.8)',
      gradientCardBackground: 'linear-gradient(90deg, #27061a 0%, #ff6363 30%, #9b4dff 55%, #100321 100%)'
    }
  }
});

export const themeConfig = {
  attribute: 'class',
  defaultTheme: 'system',
  value: {
    dark: darkTheme.className,
    light: lightTheme.className
  }
};
