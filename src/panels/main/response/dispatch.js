import responseEditor from "../../../library/editor/view/readonly"

const { updateResponse } = responseEditor()

document.addEventListener("onprerequest", async () => {
    updateResponse({ string: CENTER_TEXT("Requesting...") })
})

document.addEventListener("onresponse", async ({ detail }) => {
    const RESPONSE = detail.data
    if (RESPONSE.data) {
        updateResponse(RESPONSE.data)
        return
    }
    if (RESPONSE.response?.status === 500) {
        updateResponse({ string: CENTER_TEXT(RESPONSE.response.statusText) })
        return
    }
    if (RESPONSE.response?.headers["content-type"].match(/html/g)) {
        updateResponse({ html: RESPONSE.response.data })
    } else {
        updateResponse({ string: CENTER_TEXT(RESPONSE.message) })
    }
})

function CENTER_TEXT(text) {
    return `<div class="h-full w-full flex justify-center font-semibold text-xl items-center">${text}</div>`
}
