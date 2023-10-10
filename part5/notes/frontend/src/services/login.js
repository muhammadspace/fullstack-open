import axios from "axios"

const login = async credentials => {
    console.log("Logging in with", credentials)
    const response = await axios.post("https://probable-potato-p677x67prgrfvjw-3001.app.github.dev/api/login", credentials)
    
    console.log(response)
    return response.data 
}

export default {
    login,
}