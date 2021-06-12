import axios from 'axios'

const getAll = baseUrl =>
    () => {
        const request = axios.get(`${baseUrl}/list`, {params: {count: 50}})
        return request.then(response => response.data)
    }

const create = baseUrl =>
    (newObject) => {
        console.log("create call")
        console.log(newObject)
        const request = axios.post(baseUrl, newObject)
        return request.then(response => response.data)
    }

const update = baseUrl =>
    (id, newObject) => {
        const request = axios.put(`${baseUrl}/${id}`, newObject)
        return request.then(response => response.data)
    }

export default class BaseService {
    constructor(baseUrl) {
        this.getAll = getAll(baseUrl)
        this.create = create(baseUrl)
        this.update = getAll(baseUrl)
    }
}