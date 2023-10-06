import React from 'react';

export default function TrackSearchResult({track, chooseTrack}){
    function handleClick(){
        chooseTrack(track);
    }

    return (
        <div className='rounded-4 d-flex m-2 align-items-center p-2' style={{backgroundColor:"white"}} onClick={handleClick}>
            <img className="rounded-4" src={track.albumUrlSmall} style={{height: "64px", width: "64px"}}/>
            <div className="ml-3 align-items-center p-3">
                <div> <strong>{track.title}</strong></div>
                <div> {track.artist}</div>
            </div>

        </div>
    )
}