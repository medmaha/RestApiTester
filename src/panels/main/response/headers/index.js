import "./tabs"
import "./status"
import { responseEditor } from "../../../../library/editor"

const { updateResponse } = responseEditor("#responseEditor .headers")

document.addEventListener("onpreresponse", () => {
    updateResponse({ string: CENTER_TEXT("REQUESTING...") })
})

document.addEventListener("onresponse", ({ detail }) => {
    const RESPONSE = detail.data
    updateResponse(RESPONSE.headers || RESPONSE.config.headers)
})

function CENTER_TEXT(text) {
    return `<div class="h-full w-full flex justify-center font-semibold text-xl items-center">${text}</div>`
}
