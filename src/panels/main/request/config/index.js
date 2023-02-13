import "./styles.css"
import "./tabs"
import { field } from "./tabs/templates"

document.querySelectorAll("button[data-add-field]").forEach((button) => {
    const dataContent = button.parentElement
    const fieldsContainer = dataContent.querySelector("[data-fields]")

    button.addEventListener("click", () => {
        const index =
            fieldsContainer.querySelectorAll("[data-key-val]").length + 1
        const _field = field({ index })
        const span = document.createElement("span")
        span.innerHTML = _field

        fieldsContainer.appendChild(span)
    })
})

document.querySelectorAll("[data-fields]").forEach((wrapper) => {
    wrapper.addEventListener("click", (ev) => {
        const deleteButton = (() => {
            const dltBtn = ev.target.closest("button[data-delete-field]")
            if (dltBtn) return dltBtn
            if (ev.target.hasAttribute("data-delete-field")) return ev.target
        })()

        if (!!deleteButton) {
            const field = deleteButton.closest("[data-key-val]")

            const key = field.querySelector("[data-key]").value
            const activeTab = (() => {
                const button = document.querySelector(".__header_tabs .active")

                return button.dataset.tab
            })()

            if (wrapper.querySelectorAll("[data-key-val]").length > 2) {
                field.remove()
                // wrapper.removeChild(field)
                reArrangeIndex(wrapper)
                updateEndpoint(key, activeTab)
            }
        }
    })
})

function reArrangeIndex(fieldsContainer) {
    const fields = fieldsContainer.querySelectorAll("[data-key-val]")

    let idx = 0
    for (const __field of fields) {
        idx++
        __field.querySelector(".index span").innerHTML = String(idx) + "."
    }
}

function updateEndpoint(key, dataType) {
    const endpoints = JSON.parse(localStorage.getItem("endpoints") || "{}")

    const activeEndpoint = document.querySelector(
        "#endpoints [data-content] [data-endpoint].active",
    )

    if (!activeEndpoint || !key) return

    const endpointId = activeEndpoint.parentElement.dataset.endpointId
    const currentEndpoint = endpoints[endpointId]

    if (!currentEndpoint) return

    switch (dataType) {
        case "headers":
        case "query":
            const data = currentEndpoint[dataType]
            if (data) {
                delete data[key]

                const replacer = { ...data }
                currentEndpoint[dataType] = replacer
            }
            break

        case "body":
            const formData = currentEndpoint[dataType][0]

            if (formData) {
                delete formData.data[key]
                const replacer = { ...formData }
                currentEndpoint[dataType][0] = replacer
            }
            break

        default:
            break
    }

    localStorage.setItem("endpoints", JSON.stringify(endpoints))
}
