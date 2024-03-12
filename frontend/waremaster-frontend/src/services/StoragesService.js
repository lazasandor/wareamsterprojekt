import axios from "axios";

const STORAGE_API_URL = "http://localhost:8080/api/storage";

const StoragesService = {
    getAll: () => {
        return axios.get(STORAGE_API_URL + "/findall")
    },
    getById: (id) => {
        return axios.get(STORAGE_API_URL + "/findbyid/" + id);
    },
    getSums: () => {
        return axios.get(STORAGE_API_URL + "/getsums")
    }
}

export default StoragesService