import axios from "axios";

const instance = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:9091/api',
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
})

export default instance;