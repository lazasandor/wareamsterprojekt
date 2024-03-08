import axios from "axios";

const REQUEST_M_API_URL = "http://localhost:8080/api/productmovement";

const RequestMovementService = {
    save: (from, to, quantity, product, user) => {
        const requestBody = {
            quantity: quantity,
            fromStorage: from,
            toStorage: to,
            product: product,
            userWhoRequested: user
        }

        return axios.post(REQUEST_M_API_URL + "/save", requestBody);
    },
    findAll: (page, size) => {
        return axios.get(REQUEST_M_API_URL + "/find" + "?page=" + page + "&size=" + size)
    },
    getStatus: () => {
        return axios.get(REQUEST_M_API_URL + "/getstatus")
    },
    reuqestCancel: (id) => {
        return axios.post(REQUEST_M_API_URL + "/requestcancel/" + id)
    },
    reuqestDone: (id) => {
        return axios.post(REQUEST_M_API_URL + "/requestdone/" + id)
    },
    findById: (id) => {
        return axios.get(REQUEST_M_API_URL + "/findbyid/" + id)
    }
}

export default RequestMovementService