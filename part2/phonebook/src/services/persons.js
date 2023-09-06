import axios from 'axios'

const baseUrl = 'https://probable-potato-p677x67prgrfvjw-3001.app.github.dev/api/persons'

const getAll = () => {
    return axios
            .get(baseUrl)
            .then( res => res.data )
}

const create = person => {
    return axios
            .post(baseUrl, person)
            .then( res => res.data )
}

const update = (id, newPerson) => {
    return axios
        .put(`${baseUrl}/${id}`, newPerson)
        .then( res => res.data )
}

const deletePerson = (id) => {
    return axios
            .delete(`${baseUrl}/${id}`)
            .then( res => res.data )
}

export default { getAll, create, update, deletePerson }