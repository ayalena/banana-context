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

    function logIn(token) {
        const decoded = jwt_decode(token);
        localStorage.setItem('token', token);
        console.log(decoded);

        async function getUserDetails() {
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
                    }
                });

            } catch (e) {
                console.error(e);
            }

        }

        getUserDetails();

        console.log("Gebruiker is ingelogd!");
        history.push("/profile");
    }

    function logOut() {
        toggleIsAuth({
            ...isAuth,
            isAuth: false,
        });
        console.log("Gebruiker is uitgelogd!");
        history.push("/");
    }




    //wikkel een provider jasje eromheen met als value het data object
    return (
       <AuthContext.Provider value={data}>
           { children }
       </AuthContext.Provider>
    )

}

export default AuthContextProvider;