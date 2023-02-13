import { requestEditor } from "../../../../../../library/editor"
//
const container = document.querySelector(".bodyTab .body-tabs-contents-wrapper")

function init() {
    const div = document.createElement("div")
    div.id = "jsonEncode"
    div.classList.add("json-encode")
    div.setAttribute("data-content", "true")
    container.appendChild(div)

    const element = container.querySelector("#jsonEncode")
    element.classList.add("hidden")
}

init()

requestEditor("jsonEncode", "hidden ")
