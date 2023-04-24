const responseHeaders = document.querySelector("[data-response-headers]")

const statusElement = responseHeaders.querySelector("[data-status]")
function setStatus(status) {
    var bgColor

    switch (true) {
        case status.code === 200:
            bgColor = "bg-blue-500 px-4"
            break
        case status.code === 201:
            bgColor = "bg-green-500 px-4"
            status.text = "Created"
            break
        case status.code < 400:
            bgColor = "bg-orange-500"
            break
        case status.code >= 400:
            bgColor = "bg-red-500"
            break
        case status.code === "":
            bgColor = "bg-red-400"
            break
        default:
            bgColor = ""
            break
    }
    const temp = `<b>${status.code}<b/> ${status.text}`
    statusElement.classList.add(...bgColor.split(" "))
    statusElement.innerHTML = temp
}

document.addEventListener("onpreresponse", () => {
    statusElement.innerHTML = "HTTP_STATUS"
    statusElement.classList.remove(
        ..."bg-blue-500 bg-orange-500 bg-red-500 bg-green-500 px-4".split(" "),
    )
    statusElement.classList.add(..."bg-slate-600 px-2".split(" "))
})

document.addEventListener("onresponse", ({ detail }) => {
    statusElement.classList.remove("bg-slate-600")
    detail = detail.data
    let status = {}
    if (detail.data) {
        status.code = detail.status
        status.text = detail.statusText || "Ok"
    } else if (detail.response) {
        status.code = detail.response.status
        status.text = detail.response.statusText
    } else if (detail.request) {
        status.code = ""
        status.text = detail.code
    } else {
        status.code = 400
        status.text = "BAD REQUEST"
    }
    setStatus(status)
})
