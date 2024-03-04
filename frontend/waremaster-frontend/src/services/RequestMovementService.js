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
    }
}

export default RequestMovementService