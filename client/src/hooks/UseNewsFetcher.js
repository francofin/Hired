import axios from 'axios';
import useSWR from 'swr'

const fetcher = async(url, token) => {
    const res = await fetch(url, {
        "headers": {
            "Ocp-Apim-Subscription-Key": token,
        }
    });
    // const data = await res.json();
    const data = await res.json();
    console.log(data)


    return data
}

export const useNewsFetcher = (newsUrl, newsApi) => {
    const swrResponse = useSWR( {newsUrl, newsApi}, fetcher)
    return swrResponse;
}