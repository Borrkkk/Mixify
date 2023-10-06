import React from "react";

import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import { Heading,
     Box, 
     Flex, 
     Spacer, 
     VStack, 
     Button,
     Drawer,
     DrawerBody,
     DrawerFooter,
     DrawerHeader,
     DrawerOverlay,
     DrawerContent,
     DrawerCloseButton,
     Input,
     useDisclosure} from '@chakra-ui/react'
import TrackSearchResult from "./TrackSearchResult";
import MixtapeCreate from "./MixtapeCreate";

const spotifyApi = new SpotifyWebApi({
    clientId: "62143053f6564d6b82927c97a90de897",
})

export default function Dashboard( {code}){
    const accessToken = useAuth(code);
    const [ search, setSearch] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [searchResults, setSearchResults] = useState([]);
    const [mixtape, setMixtape] = useState([]);
    const [playingTrack, setPlayingTrack] =  useState({});

    const addSong = (track) =>{
        if (mixtape.length >= 10 || mixtape.includes(track)) return;
        console.log(mixtape)
        setMixtape(oldMixtape => [...oldMixtape, track]);
    }


    useEffect(()=>{
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

    useEffect(()=>{
        if(search === " "){
            setSearch("")
            return;
        };
        //if no searches, empty searchResults array
        if (!search) return setSearchResults([]);
        //if no access token, we dont want to search
        if (!accessToken) return;
        let cancel = false;
        spotifyApi.searchTracks(search, {limit: 10}).then(res =>{
            if (cancel) return;
            setSearchResults(res.body.tracks.items.map(track=>{
                console.log(track)
                const smallestAlbumImage = track.album.images.reduce(
                    (smallest,image) => {
                        if (image.height < smallest.height) return image
                        return smallest;
                    }, track.album.images[0])

                const largestAlbumImage = track.album.images.reduce(
                    (largest,image) => {
                        if (image.height > largest.height) return image
                        return largest;
                    }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrlSmall: smallestAlbumImage.url,
                    albumUrlLarge: largestAlbumImage.url,
                    preview: track.preview_url
                }
            }))
        })
        return () => cancel = true;
    },[search, accessToken])


    return(
       <Box backgroundColor={'pink'} >
        <VStack spacing='20rem' >
            
            <Button colorScheme='green' size='lg' onClick={onOpen}>
                <a className = " btn btn-success btn-lg">Add a song</a>
            </Button>
            <Box>
                {mixtape.map(track => {
                    <TrackSearchResult/>
                })}
            </Box>
        </VStack>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size='md'>
                        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search for a song 
          <Input placeholder='Basic usage' 
          onChange={e => setSearch(e.target.value)}/>
          </DrawerHeader>

          <DrawerBody>
          {searchResults.map(track => (
                        <TrackSearchResult track={track} key={track.uri} chooseTrack={addSong} />
                        ))}
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
            
        </Drawer>
        </Box>
    )
}