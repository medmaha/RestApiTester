import { getKeyValuePairsWrapper } from "../templates"

//
const container = document.querySelector(".bodyTab .body-tabs-contents-wrapper")

function init() {
    const div = document.createElement("div")
    div.id = "formEncode"
    div.classList.add(..."active form-encode".split(" "))
    div.setAttribute("data-content", "true")
    div.innerHTML = getKeyValuePairsWrapper("Form")

    container.appendChild(div)
}

init()
