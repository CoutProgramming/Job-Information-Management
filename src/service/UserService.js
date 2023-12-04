import axios from "./CustomizeAxios";


const getAllUser = () =>{
    return axios.get('/users');
}

const getUserByID = (id) =>{
    return axios.get(`/get-user/${id}`);
}

const updateUser = (data) =>{
    return axios.put(`/update-user`, data);
}


export{getUserByID, updateUser, getAllUser}