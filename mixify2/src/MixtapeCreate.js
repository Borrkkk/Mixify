import React from 'react';


export default function MixtapeCreate({tracks}){
    
    console.log(tracks)
return(
    <div >    
                {tracks.map((track, index)=>(
                    <div key={track.uri}>
                        {track.title}
                        {track.artist}
                    </div>
                ))}
    </div>

)
}