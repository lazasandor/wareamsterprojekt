import axios from "axios";

const STORAGE_API_URL = "http://localhost:8080/api/storage";

const StoragesService = {
    getAll: () => {
        axios.get(STORAGE_API_URL + "/findall")
    },
    getById: (id) => {
        axios.get(STORAGE_API_URL + "/findbyid/" + id);
    }
}

export default StoragesService