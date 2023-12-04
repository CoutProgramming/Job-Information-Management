import axios from "./CustomizeAxios";

const getAllApply = () => {
    return axios.get("/applies");
}

const getApplyByID = (id) =>{
    return axios.get(`/get-apply/${id}`);
}

const getAllApplyByID = (id) =>{
    return axios.get(`/get-AllApply/${id}`);
}

const createApply = (data) => {
    return axios.post('create-apply', data);
}

const deleteApply = (id) =>{
    return axios.delete(`/delete-apply/${id}`);
}

export {getAllApply, getApplyByID, createApply, deleteApply, getAllApplyByID}