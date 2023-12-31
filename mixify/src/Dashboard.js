import React from "react";

import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import {Container, Form, Col, Row, Offcanvas, Button } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import MixtapeCreate from "./MixtapeCreate";

const spotifyApi = new SpotifyWebApi({
    clientId: "62143053f6564d6b82927c97a90de897",
})

export default function Dashboard( {code}){
    const accessToken = useAuth(code);
    const [ search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [show,setShow] = useState(false);
    const [mixtape, setMixtape] = useState([]);
    const [playingTrack, setPlayingTrack] =  useState({});


    const handleClose= () => setShow(false);
    const handleShow = () => setShow(true);

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
                    albumUrlLarge: largestAlbumImage.url
                }
            }))
        })
        return () => cancel = true;
    },[search, accessToken])


    return(
        <Container fluid  style={{
             width : "100%"
        }}>
            <Row>
            <Col className="d-flex justify-content-center py-3 px-3" style={{ height: "100vh", backgroundColor:"#c9bb9f"}}>
                <Offcanvas data-bs-theme="dark" 
                 show={show} onHide={handleClose} 
                 style={{color:"black" , backgroundColor:"black"}}
                 scroll={true} backdrop={false}>
                    <Offcanvas.Header closeButton className="white" >
                        <Offcanvas.Title> 
                            <Form.Control type="search" 
                                placeholder="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)} />
                            </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body style={{overflowY: "hidden", backgroundColor:"black"}}>
                        <div style={{ height:"100%" ,overflowY: "auto", backgroundColor:"black"}}>
                        {searchResults.map(track => (
                        <TrackSearchResult track={track} key={track.uri} chooseTrack={addSong} />
                        ))}
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
                <div style={{ height: "80%", backgroundColor:"white"}}>
                    <p className="fs-1"> Create a song </p>
                   <MixtapeCreate tracks={mixtape}/>
                </div>
                <Button style={{height:"5vh", width:"5vh" ,position:"absolute",left:"3vw", bottom:"3vh"}}onClick={handleShow} className="rounded-circle">
                    <i className="bi bi-plus-lg"></i>
                </Button>

            </Col>
            </Row>
        </Container>
    )
}