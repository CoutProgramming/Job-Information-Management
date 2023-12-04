import axios from "./CustomizeAxios";

const handleLogin = (username, password) => {
    return axios.post('/api/v1/login', {username, password});
}

const handleSignup = (data) => {
    return axios.post('/api/v1/signup',data);
}

export{handleLogin, handleSignup}