import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  styles: {
    global: props => ({
      body: {
        bg: mode("#ECE6C2",'gray.800')(props),
      },
      '.create': {
        bg: mode("white",'black')(props),
      }
    }),
  },
})

export default theme