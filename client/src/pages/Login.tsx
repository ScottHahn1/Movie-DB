import axios from 'axios';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const naviagte = useNavigate();

    const login = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('https://movie-db-omega-ten.vercel.app/users/login', {
            username: username,
            password: password
        })
        .then(res => {
            if (res.data.login) {
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('userId', res.data.id);
                sessionStorage.setItem('username', res.data.username);
                naviagte('/');
            } else {
                alert('Login failed');
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <form onSubmit={login}>
                <label> Username <br></br>
                    <input className='form-input' type='text' value={username} onChange={ e => setUsername(e.target.value) } />
                </label>
                <label> Password <br></br>
                    <input className='form-input' type='text' value={password} onChange={ e => setPassword(e.target.value) } />
                </label>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;