import axios from "axios"
const baseUrl = "https://probable-potato-p677x67prgrfvjw-3003.app.github.dev/api/login"

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }