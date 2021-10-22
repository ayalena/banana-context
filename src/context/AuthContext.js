import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

//context aanmaken en exporteren
export const AuthContext = React.createContext({});

//custom provider component
function AuthContextProvider ({ children }) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });
    const history = useHistory();

    //data object, voor iedereen beschikbaar
    const data = {
        // testData: 'test-test, is this mic on?',
        isAuth: isAuth.isAuth,
        logIn: logIn,
        logOut: logOut,
    }

    //persist on refresh
    useEffect(() => {
        // check of er nog een token in Local Storage staat
        const token = localStorage.getItem('token');

        // ZO JA: haal dan de nieuwe data op en zet deze in de state:
        if (token) {
            const decoded = jwt_decode(token);
            getUserDetails(token, decoded);
        }
        // ZO NEE:
        else {
            toggleIsAuth({
                ...isAuth,
                user: null,
                status: 'done',
            });
        }

    }, []);

    async function getUserDetails(token, decoded, pushLink) {
        try {
            const result = await axios.get(`http://localhost:3000/600/users/${decoded.sub}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(result);

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    email: result.data.email,
                    id: result.data.id,
                    user: result.data.user,
                },
                status: 'done',
            });
            if(pushLink) {
                history.push(pushLink);
            }
        } catch (e) {
            console.error(e);
        }
    }

    function logIn(token) {
        const decoded = jwt_decode(token);
        localStorage.setItem('token', token);
        console.log(decoded);
        getUserDetails(token, decoded, "/profile");
        console.log("Gebruiker is ingelogd!");
    }

    function logOut() {
        //haal token uit storage
        localStorage.clear();

        toggleIsAuth({
            ...isAuth,
            isAuth: false,
            user: "null",
        });
        console.log("Gebruiker is uitgelogd!");
        history.push("/");
    }

    //wikkel een provider jasje eromheen met als value het data object
    return (
       <AuthContext.Provider value={data}>
           {isAuth.status === 'pending'
               ? <p>Loading...</p>
               : children
           }
       </AuthContext.Provider>
    )

}

export default AuthContextProvider;