import { useEffect, useState } from 'react';
import axios from 'axios';

const useAxios = <S, T>(url: string, params: T, headers?: Record<string, string>) => {
    const [data, setData] = useState<S | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);
                const res = await axios({ method: 'GET', url, headers, params });
                setData(res.data);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, JSON.stringify(params), headers])

    return { data, loading, error };
}

export default useAxios;