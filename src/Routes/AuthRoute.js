import api from '../Services/axiosServices.js'

const signupUser = () => {
    return api.post("/userSignup")
}

const loginUser = () => {
    return api.post("/login")
}

export { loginUser, signupUser };