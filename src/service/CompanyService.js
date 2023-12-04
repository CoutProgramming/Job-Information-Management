import axios from "./CustomizeAxios";

const getAllCompany = () => {
    return axios.get('/companies');
}

const createCompany = (data) => {
    return axios.post('/create-company', data);
}

const getCompanyByID = (id) =>{
    return axios.get(`/get-company/${id}`);
}

const updateCompany = (data) =>{
    return axios.put(`/update-company`, data);
}

const deleteCompany = (id) =>{
    return axios.delete(`/delete-company/${id}`);
}
export{getAllCompany, createCompany, getCompanyByID, updateCompany, deleteCompany}