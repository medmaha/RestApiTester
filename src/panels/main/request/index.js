import "./config"
import "./form"
import { RESTTester } from "../../../library"
import { dispatchRequestConfiguration } from "./utils"

const preRequestEvent = new Event("onprerequest")
const preResponseEvent = new Event("onpreresponse")

// ? coming from --> .src/panels/main/request/form/bar.js
document.addEventListener("onformsubmit", async ({ detail }) => {
    document.dispatchEvent(preRequestEvent)

    const data = detail.data

    if (!data.url?.length > 0) return

    document.dispatchEvent(preResponseEvent)

    const RESPONSE = await RESTTester.make(data)

    const status_code = (() => {
        let code = 423
        if (RESPONSE.status) {
            code = RESPONSE.status
        } else if (RESPONSE.response?.status) {
            code = RESPONSE.response.status
        } else if (RESPONSE.request) {
            code = 408
        }
        return code
    })()

    const signalHistoryEvent = new CustomEvent("signalhistory", {
        detail: { data: { ...data, status_code } },
    })
    document.dispatchEvent(signalHistoryEvent)

    const onResponseEvent = new CustomEvent("onresponse", {
        detail: { data: RESPONSE },
    })
    document.dispatchEvent(onResponseEvent)
})

// ? coming from --> .src/panels/history/getter.js
document.addEventListener("endpointclick", ({ detail }) => {
    const data = detail.data
    dispatchRequestConfiguration(data)
})
