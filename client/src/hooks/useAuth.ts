import axios from "axios";
import { useEffect, useState } from "react";

export type User = {
    userId: number;
    username: string;
}

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axios.get('https://movie-db-omega-ten.vercel.app/users/verify', { withCredentials: true });
                setLoggedIn(true);
                setUser(res.data.user);
            } catch {
                setUser(null);
                setLoggedIn(false);
            }
        }

        verifyUser();
    }, [])

    return { user, setUser, loggedIn, setLoggedIn };
}

export default useAuth;