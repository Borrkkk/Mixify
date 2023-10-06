import React from 'react';
import {Button, Text, Box} from '@chakra-ui/react'
export default function TrackSearchResult({track, chooseTrack}){
    function handleClick(){
        chooseTrack(track);
    }

    return (
        <Box onClick={handleClick}>
            <img className="rounded-4" src={track.albumUrlSmall} style={{height: "64px", width: "64px"}}/>
                <Text> <strong>{track.title}</strong></Text>
                <Text> {track.artist}</Text>
                {
                    track.preview ? <audio src={track.preview} controls/> :
                    <div> Song preview not available</div>
                }

        </Box>
    )
}