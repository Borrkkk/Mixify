import {useState, useEffect, useRef} from "react";
import axios from "axios";

export default function useAuth(code){
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    //UseRef is used to prevent the effect from being called multiple times.
    //useEffect calls twice because of React.StrictMode
    const effectRan = useRef(false);
    useEffect(() => {
        if (!effectRan.current) {
            axios.post('http://localhost:3001/login', {code
            })
            .then(res => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);
                window.history.pushState({}, null, "/");
            }).catch(() => {
                window.location = "/"
            })
        } return () => effectRan.current = true;
    }, [code]);

    useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
        axios.post('http://localhost:3001/refresh', {refreshToken
        })
    .then(res => {
        setAccessToken(res.data.accessToken);
        setExpiresIn(res.data.expiresIn);
    //     window.history.pushState({}, null, "/");
    }).catch(() => {
        window.location = "/"
    })
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
       
    },[refreshToken, expiresIn])
    return accessToken;
}