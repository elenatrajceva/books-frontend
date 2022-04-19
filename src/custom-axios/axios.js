import axios from "axios";

const instance = axios.create({
    baseURL: 'https://books-backend-181262.herokuapp.com/api',
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
})

export default instance;