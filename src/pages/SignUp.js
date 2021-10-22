import React, {useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";


function SignUp() {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const {logIn} = useContext(AuthContext);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3000/register', {
                email: emailValue,
                user: usernameValue,
                password: passwordValue,
            })
            console.log(result.data);
            history.push("/signin")
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="form-container">

                <h1>Registreren</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                    eligendi
                    harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda,
                    consequuntur deserunt
                    doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

                <form onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="email"> E-mail: </label>
                        <input
                            type="text"
                            placeholder=""
                            name="email"
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password"> Wachtwoord: </label>
                        <input
                            type="text"
                            placeholder=""
                            name="password"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="username"> Gebruikersnaam: </label>
                        <input
                            type="text"
                            placeholder=""
                            name="username"
                            value={usernameValue}
                            onChange={(e) => setUsernameValue(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                    >
                        Registreren
                    </button>


                </form>
            </div>

            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>


        </>
    );
}

export default SignUp;