import axios from 'axios';

const api = axios.create({
    baseURL: "https://fundoonotes.incubation.bridgelabz.com/api/user",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;