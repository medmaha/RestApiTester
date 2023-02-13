import { handleTabClicked } from "../base"

const tabButton = document.querySelector('[data-tab="description"] button')

const tabContentContainer = document.querySelector(".descriptionTab")

const nameElement = tabContentContainer.querySelector("[data-endpoint-name]")
const descriptionElement = tabContentContainer.querySelector(
    "[data-endpoint-description]",
)
const saveButton = tabContentContainer.querySelector("button[data-save]")

let endpoints
let endpointData
let endpointElement

function set() {
    endpoints = JSON.parse(localStorage.getItem("endpoints") || "{}")

    endpointElement = document.querySelector(
        "#endpoints [data-content] .active",
    )?.parentElement

    if (endpointElement) {
        endpointData = endpoints[endpointElement.dataset.endpointId]
    }
}

function initialize() {
    set()
    if (endpointData) {
        nameElement.value = endpointData.name
        descriptionElement.value = endpointData.description
    }

    tabButton.addEventListener("click", (ev) => {
        handleTabClicked(ev)
    })
}

function dispatch() {
    set()
    const name = nameElement.value
    const description = descriptionElement.value

    if (!name.length) {
        alert("name field must not be empty")
        return
    }

    let id

    if (endpointElement) {
        id = endpointElement.dataset.endpointId
        endpointElement.querySelector("[data-endpoint-name]").innerHTML = name
    }
    if (endpointData) {
        endpointData.name = name
        endpointData.description = description

        if (id) {
            endpoints[id] = endpointData
            localStorage.setItem("endpoints", JSON.stringify(endpoints))

            alert("Saved")
        }
    }
}

function update() {
    set()
    const nameElement = tabContentContainer.querySelector(
        "[data-endpoint-name]",
    )
    const descriptionElement = tabContentContainer.querySelector(
        "[data-endpoint-description]",
    )
    nameElement.value = endpointData.name
    descriptionElement.value = endpointData.description
}

initialize()

saveButton.addEventListener("click", () => dispatch())
document.addEventListener("endpointupdate", update)
