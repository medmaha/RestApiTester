// ? coming from --> .src/panels/main/request/index.js
document.addEventListener("signalhistory", ({ detail }) =>
    createHistory(detail.data),
)

const bodyTabContent = document.querySelector(".bodyTab")

async function createHistory(data) {
    const endpoints = JSON.parse(localStorage.getItem("endpoints") || "{}")

    const formEncode = (() => {
        const data = {}
        const container = bodyTabContent.querySelector(".form-encode")

        const keyValuePairs = container.querySelectorAll("[data-key-val]")
        keyValuePairs.forEach((field) => {
            const key = field.querySelector("[data-key]")
            const value = field.querySelector("[data-value]")

            if (!!key.value.length) {
                data[key.value] = value.value
            }
        })

        const isActive = container.classList.contains("active")

        return { data, isActive }
    })()

    const jsonEncode = (() => {
        const container = bodyTabContent.querySelector(".json-encode")
        const data = container.querySelector("[data-editor]").textContent
        const isActive = container.classList.contains("active")
        return {
            data,
            isActive,
        }
    })()

    const textEncode = (() => {
        const container = bodyTabContent.querySelector(".text-encode")
        const data = container.querySelector("textarea").value
        const isActive = container.classList.contains("active")

        return { data, isActive }
    })()

    const _data = {
        ...data,
        id: Object.keys(endpoints).length + 1,
        timestamp: Date.now(),
        description: "",
        body: [formEncode, jsonEncode, textEncode],
    }

    const key = `${data.method}__${data.url}`

    const preEndpointData = endpoints[key]

    if (!preEndpointData) {
        _data["name"] = data.url
    } else {
        _data["name"] = preEndpointData.name
    }

    delete _data["data"]

    endpoints[key] = _data
    localStorage.setItem("endpoints", JSON.stringify(endpoints))

    if (!preEndpointData) {
        const newEndpointEvent = new CustomEvent("newendpointevent", {
            detail: { data: { ..._data, active: true } },
        })
        document.dispatchEvent(newEndpointEvent)
    }
}
