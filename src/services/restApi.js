import $http from "./http_util";

const getAll = baseUrl =>
    () => {
        const request = $http.get(`${baseUrl}/list`, {params: {count: 50}})
        return request.then(response => response.data)
    }

const create = baseUrl =>
    (newObject) => {
        console.log("create call")
        console.log(newObject)
        const request = $http.post(`${baseUrl}/create`, newObject)
        return request.then(response => response.data)
    }

const update = baseUrl =>
    (id, newObject) => {
        const request = $http.patch(`${baseUrl}/${id}`, newObject)
        return request.then(response => response.data)
    }
const deleteItem = baseUrl =>
    (id) => {
        const request = $http.delete(
            `${baseUrl}/delete`,
            {
                data: {"id": id}
            }
        )
        return request.then(response => response.data)
    }
export default class BaseService {
    constructor(baseUrl) {
        this.getAll = getAll(baseUrl)
        this.create = create(baseUrl)
        this.update = update(baseUrl)
        this.delete = deleteItem(baseUrl)
    }
}