import React from 'react'
import {Button} from '@chakra-ui/react'
import { Heading, Box, Container, VStack, Text} from '@chakra-ui/react'

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=62143053f6564d6b82927c97a90de897&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'
export default function Login() {
    return (
        <div>
        <VStack spacing='5rem'>

            <Text fontSize='3rem'>
                Have a break. Have a kitkat
            </Text>
                <Button colorScheme='green' size='lg'>
                <a className = " btn btn-success btn-lg" href={AUTH_URL}>Login with Spotify</a>
            </Button>
        </VStack>
        </div>
    )
}