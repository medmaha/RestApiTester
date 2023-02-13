const responseHeaders = document.querySelector("[data-response-headers]")

const statusElement = responseHeaders.querySelector("[data-status] span")
function setStatus(status) {
    var bgColor
    var __class = "py-1 px-2 gap-1 sm:gap-2 text-center text-slate-200 "

    const temp = `
        <span class="font-bold tracking-wider">${status.code}</span>
        <span class="text-sm tracking-wider">${status.text}</span>
        `
    switch (true) {
        case status.code === 200:
            bgColor = "bg-blue-500"
            break
        case status.code === 201:
            bgColor = "bg-green-500"
            break
        case status.code < 400:
            bgColor = "bg-orange-500"
            break
        case status.code >= 400:
            bgColor = "bg-red-500"
            break
        default:
            bgColor = ""
            break
    }

    __class += bgColor

    statusElement.classList.add(...__class.split(" "))
    statusElement.innerHTML = temp
}

document.addEventListener("onpreresponse", () => {
    statusElement.innerHTML = ""
    statusElement.classList.remove(
        ..."bg-blue-500 bg-orange-500 bg-red-500 bg-green-500".split(" "),
    )
    statusElement.classList.add("bg-slate-600")
})

document.addEventListener("onresponse", ({ detail }) => {
    statusElement.classList.remove("bg-slate-600")
    detail = detail.data
    let status = {
        code: 400,
        text: "BAD REQUEST",
    }
    if (detail.data) {
        status.code = detail.status
        status.text = detail.statusText
    } else if (detail.response) {
        status.code = detail.response.status
        status.text = detail.response.statusText
    } else if (detail.request) {
        status.code = 408
        status.text = "REQUEST TIMEOUT"
    }
    setStatus(status)
})
