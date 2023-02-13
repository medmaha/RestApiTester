import { getKeyValuePairsWrapper } from "../templates"
import { handleTabClicked } from "../base"

const tabButton = document.querySelector('[data-tab="query"] button')
const tabContentContainer = document.querySelector(".queryTab")

function initialize() {
    const span = document.createElement("span")
    span.innerHTML = getKeyValuePairsWrapper("Query")
    // tabContentContainer.classList.remove("hidden")
    tabContentContainer.appendChild(span)

    tabButton.addEventListener("click", (ev) => {
        handleTabClicked(ev)
    })
}

initialize()
