import axios from "axios"

const apiClient = axios.create({
    baseURL: `http://localhost:3001`,
    headers: {
        "Content-type": "application/json",
    },
})

const predictClient = axios.create({
    baseURL: `http://localhost:5050`,
    headers: {
        "Content-type": "application/json",
    },
})

export { apiClient, predictClient }
