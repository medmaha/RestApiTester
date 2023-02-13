import { getKeyValuePairsWrapper } from "../templates"
import { handleTabClicked } from "../base"

const tabButton = document.querySelector('[data-tab="headers"] button')
const tabContentContainer = document.querySelector(".headersTab")

function initialize() {
    const span = document.createElement("span")
    span.innerHTML = getKeyValuePairsWrapper("Header")
    // tabContentContainer.classList.remove("hidden")
    tabContentContainer.appendChild(span)

    tabButton.addEventListener("click", (ev) => {
        handleTabClicked(ev)
    })
}

initialize()
