import React, {useState} from "react";
import {useHistory} from "react-router-dom";

//context aanmaken en exporteren
export const AuthContext = React.createContext({});

//custom provider component
function AuthContextProvider ({ children }) {
    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory();

    //data object, voor iedereen beschikbaar
    const data = {
        testData: 'test-test, is this mic on?',
        isAuth: isAuth,
        logIn: logIn,
        logOut: logOut,
    }

    function logIn() {
        toggleIsAuth(true);
        console.log("Gebruiker is ingelogd!");
        history.push("/profile");
    }

    function logOut() {
        toggleIsAuth(false);
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