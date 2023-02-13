import axiosInstance from "./axiosInstance"

export default class RESTTester {
    static async make(options) {
        let data
        return new Promise((resolve) => {
            axiosInstance({
                ...cleanData(options),
            })
                .then((res) => {
                    data = res
                })
                .catch((err) => {
                    data = err
                })
                .finally(() => {
                    resolve(data)
                })
        })
    }
}

function cleanData(data) {
    return { ...data }
}
