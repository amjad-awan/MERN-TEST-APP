import API from "./globalSender"


const createUser= ((url, data)=>API.post(url,data))

export {
    createUser
}

