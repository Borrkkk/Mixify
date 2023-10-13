import {Box, Text, Image, VStack, HStack, Flex, Spacer} from '@chakra-ui/react'
import React from 'react';


export default function MixtapeCreate({track}){
    
return(
    <Box className='create' width='100%' rounded='lg' padding='5px' border='1px' margin='5px'>   
        <Flex>
            <Image boxSize='100px' src={track.albumUrlLarge} alt={track.title} rounded='lg'/>
                <VStack align='left' justify='center' paddingLeft='10px'>

                <Text as='b' >
                    {track.title} 
                </Text>
                <Text>
                    {track.artist}
                </Text>

                </VStack>
                <Spacer/>
                <VStack justify='center'>
                {
                    track.preview ?
                    <audio id={'player'} src={track.preview} controls/>
                    :
                    <div > Song preview not available</div>
                }
                    
                </VStack>
                </Flex>
    </Box>

)
}