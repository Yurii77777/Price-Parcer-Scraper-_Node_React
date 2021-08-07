import { useState, useCallback } from 'react';

export const useFetch = () => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePerformRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setIsLoading(true);

            try {
                if (body) {
                    body = JSON.stringify(body);
                    headers['Content-Type'] = 'application/json';
                }

                const response = await fetch(url, { method, body, headers });
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Somthing wrong...');
                }

                setData(result);

                return result;
            } catch (error) {
                setError(error);

                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const clearErrors = () => setError(null);

    return {
        data,
        error,
        clearErrors,
        isLoading,
        request: handlePerformRequest,
    };
};
