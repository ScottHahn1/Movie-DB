import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState<null | boolean>(null);

    const navigate = useNavigate();

    const signUp = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (password === confirmPassword) {
            axios.post('https://movie-db-omega-ten.vercel.app/users/register', {
                username: username,
                password: password
            }).then(res => {
                if (res.data.registered) {
                    navigate('/login');
                } else {
                    alert('Register Failed');
                }
                console.log(res)
            }).catch(err => {
                console.log(err);
            })
        } else {
            setPasswordsMatch(false);
        }
    }

    return (
        <div className='register'>
            <form onSubmit={signUp}>
                <label> Username <br></br>
                    <input className='form-input' type='text' value={username} onChange={ e => setUsername(e.target.value) } />
                </label>
                <label> Password <br></br>
                    <input className='form-input' type='text' value={password} onChange={ e => setPassword(e.target.value) } />
                </label>
                <label> Confirm Password <br></br>
                    <input className='form-input' type='text' value={confirmPassword} onChange={ e => setConfirmPassword(e.target.value) } />
                </label>
                <button type='submit'>Sign Up</button>
            </form>

            <div style={{ textAlign: 'center' }}>
                {
                    !passwordsMatch && passwordsMatch !== null && (
                        <h4>Passwords don't match!</h4>
                    )
                }
            </div>
        </div>
    )
}

export default Register;