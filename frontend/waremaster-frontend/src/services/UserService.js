import axios from "axios";

const USER_API_URL = "http://localhost:8080/api/user/";
const UserService = {
  saveUser: (user) => {
    return axios.post(USER_API_URL + "save", user);
  },
  getAllUser: () => {
    return axios.get(USER_API_URL + "find")
  },
  loginUser: (user) => {
    return axios.post(USER_API_URL + "login", user);
  },
  authUser: (token) => {
    return axios.get(USER_API_URL + "auth", {
      headers: {
        Authorization: token,
      },
    });
  },
  getIdByLoginInputs: (user) => {
    const requestBody = {
      email: user.email,
      password: user.password
    }
    return axios.post(USER_API_URL + "getid", requestBody);
  },
  registerUser: (user) => {
    return axios.post(USER_API_URL + "register", user)
  }
};

export default UserService;
