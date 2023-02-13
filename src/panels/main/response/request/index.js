import responseEditor from "../../../../library/editor/view/readonly"

const { updateResponse } = responseEditor("#responseEditor .request")

document.addEventListener("onprerequest", async () => {
    updateResponse({ string: CENTER_TEXT("Requesting....") })
})

document.addEventListener("onresponse", async ({ detail }) => {
    const RESPONSE = detail.data

    const {
        headers,
        url,
        method,
        adapters,
        timeout,
        xsrfCookieName,
        xsrfHeaderName,
    } = RESPONSE.config

    const data = {
        method,
        url,
        headers,
        adapters,
        timeout,
        xsrfCookieName,
        xsrfHeaderName,
    }
    updateResponse(data)
})

function CENTER_TEXT(text) {
    return `<div class="h-full w-full flex justify-center font-semibold text-xl items-center">${text}</div>`
}
