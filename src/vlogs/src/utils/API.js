import Axios from 'axios'
export default {
    getVlogs: function() {
        let key = process.env.REACT_APP_YOUTUBE_KEY
        let queryURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}`
        return Axios.get(queryURL, {params:{"part": "snippet", "playlistId": "PLlpUVoEJrP3ZRMaGAQPtjKsDjPPFIEL_8"}})
    }
}