import api from '../Services/axiosServices'


//Signup

export const signup = async(userData) => {
    const existing = await api.get(`/users?email=${userData.email}`)
    if (existing.length > 0) throw new Error("Email Exits");

    console.log("---")
    const res = await api.post('/users', {
        ...userData,
        // notes: [],
        createdAt: new Date().toUTCString()
    });

    return res;
}



//Login

export const login = async(email, password) => {
    const response = await api.get(`/users?email=${email}&password=${password}`)
    if (response.length === 0) {
        throw new Error("Invalid Credentials")
    }

    //console.log(response.data)
    return response.data[0]
}