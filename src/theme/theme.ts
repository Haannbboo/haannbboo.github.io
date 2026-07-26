import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Fira Code', monospace",
  },
  colors: {
    // Subtle, elegant neutral color palette
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#0b0f19',
    },
    brand: {
      50: '#f0f4f8',
      100: '#d9e2ec',
      200: '#bcccdc',
      300: '#9fb3c8',
      400: '#829ab1',
      500: '#627d98',
      600: '#486581',
      700: '#334e68',
      800: '#243b53',
      900: '#102a43',
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#0f172a' : '#fafafa',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
        transitionProperty: 'background-color, color',
        transitionDuration: '0.2s',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'gray.100' : 'gray.900',
          color: props.colorMode === 'dark' ? 'gray.900' : 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'white' : 'gray.800',
          },
        }),
        outline: (props: any) => ({
          borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.300',
          color: props.colorMode === 'dark' ? 'gray.200' : 'gray.700',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
          },
        }),
        ghost: (props: any) => ({
          color: props.colorMode === 'dark' ? 'gray.300' : 'gray.600',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
            color: props.colorMode === 'dark' ? 'white' : 'gray.900',
          },
        }),
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'md',
        fontWeight: 'medium',
        px: 2.5,
        py: 0.5,
      },
    },
  },
});
