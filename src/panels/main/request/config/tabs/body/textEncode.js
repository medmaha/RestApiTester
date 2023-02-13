import { getTextEncodeContainer } from "./templates"
//
const container = document.querySelector(".bodyTab .body-tabs-contents-wrapper")

function init() {
    const div = document.createElement("div")
    div.id = "textEncode"
    div.classList.add("text-encode")
    div.setAttribute("data-content", "true")

    div.appendChild(getTextEncodeContainer())
    container.appendChild(div)

    const element = container.querySelector("#textEncode")
    element.classList.add("hidden")
}

init()
