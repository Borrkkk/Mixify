import React from 'react';

import {Container, Col, Row, Card } from "react-bootstrap";

export default function MixtapeCreate({tracks}){
    
    console.log(tracks)
return(
    <Container className="row .flex-row"  >    
                {tracks.map((track, index)=>(
                    <div key={track.uri}>
                        {track.title}
                        {track.artist}
                    </div>
                ))}
    </Container>

)
}