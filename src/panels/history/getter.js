import { getEndpointTemplate } from "./templates"

const endpointsPanelDOM = document.querySelector("#endpoints [data-content]")

const getEndpoints = () => {
    return JSON.parse(localStorage.getItem("endpoints") || "{}")
}
const setEndpoints = (data) => {
    localStorage.setItem("endpoints", JSON.stringify(data))
}

const endpointsList = (endpoints) => {
    let list = []
    for (const key in endpoints) {
        list.push(endpoints[key])
    }
    return list.reverse()
}

function deleteOverload(endpoints) {
    let data = endpoints
    const list = endpointsList(data)

    if (list.length > 10) {
        list.pop()
        data = (() => {
            let _data = {}
            for (const route of list.reverse()) {
                const key = `${route.method}__${route.url}`
                _data[key] = route
            }
            return _data
        })()

        localStorage.setItem("endpoints", JSON.stringify(data))
    }
    return data
}

function init(__data) {
    const { detail } = __data || {}

    if (detail?.data) {
        const data = detail.data
        const id = `${data.method}__${data.url}`
        const bg = (() => {
            let b200 =
                endpointsPanelDOM.firstChild?.classList.contains("bg-slate-200")

            if (b200) return "300"
            return "200"
        })()
        endpointsPanelDOM
            .querySelector("[data-endpoint].active")
            ?.classList.remove("active")
        localStorage.setItem("activeEndpoint", id)

        const wrapper = create(data, bg, id, "pulse")
        endpointsPanelDOM.insertBefore(wrapper, endpointsPanelDOM.firstChild)
        return
    }
    endpointsPanelDOM.innerHTML = ""
    let endpoints = getEndpoints()
    const data = deleteOverload(endpoints)

    let templatedBg = "200"
    Object.entries(data)
        .reverse()
        .forEach(([key, value]) => {
            let bg = templatedBg

            if (templatedBg === "200") templatedBg = "300"
            else templatedBg = "200"

            const wrapper = create(value, bg, key)
            endpointsPanelDOM.appendChild(wrapper)
        })

    function create(value, bg, endpointId, _cls) {
        const template = getEndpointTemplate(value, bg, _cls)
        const wrapper = document.createElement("span")
        wrapper.setAttribute("data-endpoint-id", endpointId)
        wrapper.innerHTML = template

        wrapper.addEventListener("click", handleEndpointClick)
        return wrapper
    }
}

function handleEndpointClick(ev) {
    let deleteBtnClicked = (() => {
        if (ev.target.closest("[data-endpoint-delete]")) return true
        if (ev.target.dataset.endpointsDelete) return true
        return false
    })()

    let urlEditClicked = (() => {
        if (ev.target.closest("[data-endpoint-name]")) return true
        if (ev.target.dataset.endpointsUrl) return true
        return false
    })()

    if (deleteBtnClicked) deleteEndpoint(ev.target)
    if (deleteBtnClicked) return
    if (urlEditClicked) editEndpointUrl(ev.target)
    if (urlEditClicked) return

    const targetEndpoint = ev.currentTarget.querySelector("[data-endpoint]")
    const activeEndpoint = endpointsPanelDOM.querySelector(
        "[data-endpoint].active",
    )

    if (
        targetEndpoint.parentElement.dataset.endpointId ===
        activeEndpoint.parentElement.dataset.endpointId
    )
        return

    targetEndpoint.classList.add("active")
    activeEndpoint.classList.remove("active")

    localStorage.setItem(
        "activeEndpoint",
        targetEndpoint.parentElement.dataset.endpointId,
    )

    const endpoints = getEndpoints()
    const [endpoint] = getEndpointOnTarget(ev.target, endpoints)

    const endpointClickEvents = new CustomEvent("endpointclick", {
        detail: { data: endpoint },
    })
    document.dispatchEvent(endpointClickEvents)
}

function deleteEndpoint(target) {
    const endpoints = getEndpoints()
    const [_, id, wrapper] = getEndpointOnTarget(target, endpoints)
    delete endpoints[id]

    setEndpoints(endpoints)

    wrapper.removeEventListener("click", handleEndpointClick)
    endpointsPanelDOM.removeChild(wrapper)
}

function editEndpointUrl(target) {
    const endpoints = getEndpoints()
    const [endpoint] = getEndpointOnTarget(target, endpoints)

    target.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
            ev.preventDefault()
            target.blur()
            // save()
        }
    })
    target.addEventListener("blur", save)

    function save() {
        const urlName = target.textContent.trim()
        if (urlName.length < 1) alert("name cannot be empty")

        if (endpoint.name === urlName) return
        else {
            endpoint.name = urlName
            setEndpoints(endpoints)

            const ev = new Event("endpointupdate")
            document.dispatchEvent(ev)
        }
    }
}

function getEndpointOnTarget(target, endpoints) {
    const wrapper = target.closest("[data-endpoint-id]")
    const id = wrapper.dataset.endpointId

    const endpoint = endpoints[id]

    return [endpoint, id, wrapper]
}

init()

document.addEventListener("newendpointevent", init)
