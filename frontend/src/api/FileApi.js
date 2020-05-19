import Api from "./Api";

class FileApi {

    getImage(fileId) {
        return Api.get(`/downloadFile/`)  
    } 
    uploadImage(file) {
        return Api.post(`/uploadFile/`, file, { headers: { 'Content-Type': 'multipart/form-data' }})
    }

    getProfilePic() {
        return Api.get('/getImage')
    }

}

export default new FileApi();
