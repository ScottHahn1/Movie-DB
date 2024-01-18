import { useEffect, useState } from 'react';
import axios, { AxiosHeaders } from 'axios';

const useAxios = <S, T>(url: string, initialState: S, params: T, dependency?: number | string, secondDependency?: boolean, headers?: AxiosHeaders) => {
    const [data, setData] = useState<S>(initialState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        if (url) {
            setLoading(true);
            setError(false);
            axios({
                method: 'GET',
                headers: headers,
                url: url,
                params: params
            }).then(res => {
                setData(res.data);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setError(true);
            });
        }
    }, [url, dependency, secondDependency])

    return { data, loading, error };
}

export default useAxios;