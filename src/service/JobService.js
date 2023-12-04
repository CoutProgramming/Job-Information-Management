import axios from "./CustomizeAxios";

const getAllJob = () => {
    return axios.get('/jobs');
}

const getAllPriority = () => {
    return axios.get('/priority');
}

const getAllMajor = () => {
    return axios.get('/major');
}

const getAllEducation = () => {
    return axios.get('/education');
}

const getJobById = (id_Job) => {
    return axios.get(`/job/${id_Job}`);
}

const getJobByCategory = (id_category) => {
    return axios.get(`/category/${id_category}`);
}
const getJobBySearch = (value) => {
    return axios.get(`/search-job/${value}`);
}

const createNewJob = (data) => {
    return axios.post("/create-job", data);
}

const updateJob = (data) =>{
    return axios.put(`/update-job`, data);
}

const deleteJob = (id) =>{
    return axios.delete(`/delete-job/${id}`);
}

export{getAllJob, getJobById, getJobByCategory, 
    getAllPriority, getAllMajor, getAllEducation, createNewJob,updateJob, deleteJob, getJobBySearch}