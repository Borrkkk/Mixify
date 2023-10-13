import React from 'react';
import Login from './Login'
import Dashboard from './Create'
import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import { ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Image,
  AspectRatio,
  Heading,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import theme from './theme'


/*
      <Image 
      width="100vw"
      height="100vh"
      position='absolute' 
      src="/mixifyBG.png"
      zIndex='-1'
      fit="cover"/>
*/
const code = new URLSearchParams(window.location.search).get('code');
function App() {
  return (
    <ChakraProvider theme={theme}>    
    <ColorModeSwitcher/>
    <Box paddingTop='5rem'>
      <VStack spacing='2rem'>
        <Heading fontSize='4rem'>
                  Title Here
                </Heading>
      { code ?
          <Dashboard code={code} style={{height:"100vh", width:"100vw"}} />
      :
          <Login />
      }

    </VStack>
  </Box>
  <Box textAlign="center" fontSize="xl" zIndex={-3} backgroundColor='#ECE6C2' height={'100vh'} position={'absolute'}></Box> 
  </ChakraProvider>
  )
}

export default App;
