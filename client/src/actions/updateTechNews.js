import axios from 'axios';
import { useNewsFetcher } from '../hooks/UseNewsFetcher';

const newsSearchURL = `${process.env.REACT_APP_NEWS_API}q=Technology&count=50&mkt=en-US`
const newsSearchAPI=`${process.env.REACT_APP_AZURE_BING_KEY}` 



// const fetcher = async(url, token) => {
//     const res = await fetch(url, {
//         "headers": {
//             "Ocp-Apim-Subscription-Key": token,
//         }
//     });
//     // const data = await res.json();
//     const data = await res.json();
//     console.log(data)


//     return data
// }

// const fetchedArticles = fetcher(newsSearchURL, newsSearchAPI);

export default () => {
    return {
        type:'UpdatetechNews',
        payload:[]
    }
}