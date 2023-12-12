import axios from "./CustomizeAxios";

const getAllApply = () => {
    return axios.get("/applies");
}

const getAllNotification = () => {
    return axios.get("/notification");
}

const getApplyByID = (id) =>{
    return axios.get(`/get-apply/${id}`);
}

const getAllApplyByID = (id) =>{
    return axios.get(`/get-AllApply/${id}`);
}

const getAllApplyIsCheck = () =>{
    return axios.get(`/getApplyIsCheck`);
}

const createApply = (data) => {
    return axios.post('create-apply', data);
}

const createNotification = (data) => {
    return axios.post('create-notification', data);
}

const updateApply = (id) =>{
    return axios.put(`/update-apply/${id}`);
}

const uploadCV = (data) =>{
    return axios.post(`/upload-cv`, data);
}

const deleteApply = (id) =>{
    return axios.delete(`/delete-apply/${id}`);
}

export {getAllApply, getApplyByID, createApply, deleteApply, getAllApplyByID, getAllApplyIsCheck, updateApply, createNotification, getAllNotification, uploadCV}