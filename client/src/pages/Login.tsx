import axios from 'axios';
import {  Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../hooks/useAuth';
import { API_URL } from '../config/api';

type Props = {
    setUser: Dispatch<SetStateAction<User | null>>
    setLoggedIn: Dispatch<SetStateAction<boolean>>
}

const Login = ({ setUser, setLoggedIn }: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(
            `${API_URL}/users/login`,
            {
                username: username,
                password: password
            },
            { withCredentials: true }
        )   
        .then(res => {
            if (res.data.login) {
                setUser(res.data);
                setLoggedIn(true);
                navigate('/');
            } else {
                alert(res.data.message);
            }
        }).catch(() => {
            alert(`We're having trouble connecting to the server. Please try again later`);
        })
    }

    return (
        <div className='register-login'>
            <h2>Login</h2>

            <form onSubmit={login}>
                <label> Username <br></br>
                    <input className='form-input' required type='text' value={username} onChange={ e => setUsername(e.target.value) } />
                </label>

                <label> Password <br></br>
                    <input className='form-input' required type='text' value={password} onChange={ e => setPassword(e.target.value) } />
                </label>

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;