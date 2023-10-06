const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
//npm install spotify-web-api-node

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
    console.log("REFRESHING TOKEN")
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '62143053f6564d6b82927c97a90de897',
        clientSecret: '9d12441f83d842b4be62565a53d60a92',
        refreshToken    
    })

    spotifyApi.refreshAccessToken().then( (data) => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        })
    }).catch(()=>{
        res.sendStatus(400)
    })

})

app.post('/login', (req, res) => {
    // code passed up from the request
    const code = req.body.code;
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '62143053f6564d6b82927c97a90de897',
        clientSecret: '9d12441f83d842b4be62565a53d60a92'
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data =>{
            console.log(data);
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
    })
    .catch((err) =>{
        console.log(err)
        res.sendStatus(400)
    })
    
})

app.listen(3001);