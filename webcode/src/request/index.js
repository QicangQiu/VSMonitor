import requests from "./request";
export const userLogin = (data) => {
    console.log("data的数据==》", data)
    return requests({
        url: '/user/login',
        method: 'get',
        params: data
    })
}

// 
export const updatePersonInforData = (data) => {
    // console.log("更新的数据==>", data)
    return requests({
        url: '/alert',
        method: 'post',
        data: data
    })
}

