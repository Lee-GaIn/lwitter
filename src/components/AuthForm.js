import React, {useState} from 'react';
import { authService } from '../fBase';
const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === "email") {
            setEmail(value);
        }else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                //create account 
                await authService.createUserWithEmailAndPassword(email, password);
            } else {
                //log in 
                await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);


    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input className="authInput" name = "email" type="text" placeholder='Email' value = {email} required onChange={onChange} />
                <input className="authInput" name = "password" type="password" placeholder='password' value = {password} required onChange={onChange} />
                <input className="authInput authSubmit" type="submit" value={newAccount ? "Sign In" : "Sign Up"} />  
            </form>
            {error && <span className="authError">{error}</span>}
            <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Log in" : "Create Account"}</span>
        </>
    );
};

export default AuthForm;