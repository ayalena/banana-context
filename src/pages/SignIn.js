import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function SignIn() {
    const {logIn} = useContext(AuthContext);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <div className="form-container">
                <form>

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

                    <button
                        type="button"
                        onClick={logIn}
                    >
                        Inloggen
                    </button>
                </form>
            </div>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;