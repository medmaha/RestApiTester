import { dispatchRequestConfiguration } from "../utils"
const formElement = document.querySelector("form[data-api]")

formElement.addEventListener("submit", handleFormSubmit)

let formData

async function handleFormSubmit(ev) {
    ev.preventDefault()
    formData = getData(ev)

    const preFormSubmitEvent = new Event("preformsubmit")
    document.dispatchEvent(preFormSubmitEvent)
}

document.addEventListener("onconfigparse", ({ detail }) => {
    const onFormSubmitEvent = new CustomEvent("onformsubmit", {
        detail: { data: { ...formData, ...detail.data } },
    })
    document.dispatchEvent(onFormSubmitEvent)
})

function getData(ev) {
    const data = {}
    data.method = ev.target.METHOD.value
    data.url = ev.target.URL.value
    return data
}

function init() {
    const endpoints = localStorage.getItem("endpoints")
    const activeEndpoint = localStorage.getItem("activeEndpoint")

    if (activeEndpoint && endpoints) {
        const endpoint = JSON.parse(endpoints)[activeEndpoint]

        if (endpoint) {
            dispatchRequestConfiguration(endpoint)
        }
    }
}

init()
