import * as axios from 'axios';

export function getAll(){
    return axios.get("/api/lms-doc-response");
}

export function getById(id){
    return axios.get("/api/lms-doc-response/" + id);
}

export function createStudentResponse(data){
    return axios.post("/api/lms-doc-response", data);
}

export function updateStudentResponse(data){
    return axios.put("/api/lms-doc-response/" + data.id, data);
}

export function getWordData(word){
    return axios.get("/api/characters/" + word);
}

export function getFileContent(docId) {
    return axios.get('/api/lmsDocumentStorage/file/' + docId);
}

export function getByDocId(docId){
    return axios.get('/api/lms-doc-response/file/'  + docId);
}