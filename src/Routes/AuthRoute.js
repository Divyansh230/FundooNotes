import api from '../Services/axiosServices.js'

const signupUser = () => {
    return api.post("/userSignup")
}

export default signupUser;