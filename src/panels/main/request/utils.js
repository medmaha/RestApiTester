import { field } from "./config/templates"

const formElement = document.querySelector("form[data-api]")

export function dispatchRequestConfiguration(data) {
    formElement.URL.value = data.url
    formElement.METHOD.value = data.method

    const configTabs = document.querySelectorAll(".__header_tabs [data-tab]")

    configTabs.forEach((tab) => {
        clearConfigFields(tab.dataset.tab)
        switch (tab.dataset.tab) {
            case "headers":
                updateConfigContainer(tab, data.headers)
                break
            case "query":
                updateConfigContainer(tab, data.query)
                break
            case "body":
                const [formData, jsonData, textData] = data.body

                let fContainer = document.querySelector(".bodyTab .form-encode")
                updateConfigContainer(
                    tab,
                    formData.data,
                    ".bodyTab .form-encode",
                )

                let tContainer = document.querySelector(".bodyTab .text-encode")
                tContainer.querySelector(`textarea`).value = textData.data

                let jContainer = document.querySelector(".bodyTab .json-encode")

                function activeTab() {
                    const tabs = [fContainer, jContainer, tContainer]

                    const actives = [
                        formData.isActive,
                        jsonData.isActive,
                        textData.isActive,
                    ]

                    let other = []
                    let iter
                    for (let i = 0; i < 3; i++) {
                        const container = tabs.shift()
                        const isActive = actives.shift()

                        if (i === 0) {
                            iter = "form"
                        } else if (i == 1) {
                            iter = "json"
                        } else {
                            iter = "text"
                        }

                        if (isActive) {
                            container.classList.add("active")
                            container.classList.remove("hidden")

                            const targetTab = document.querySelector(
                                `.bodyTab [data-body-tab="${iter}"] button`,
                            )

                            const activeTab = document.querySelector(
                                ".bodyTab [data-body-tab] button.active",
                            )

                            activeTab?.classList.remove("active")
                            targetTab?.classList.add("active")
                        } else {
                            other.push(container)
                        }
                    }

                    other.forEach((container) => {
                        container.classList.add("hidden")
                        container.classList.remove("active")
                    })
                }

                activeTab()

                break

            case "description":
                const tabContentContainer =
                    document.querySelector(".descriptionTab")
                const descriptionName = tabContentContainer.querySelector(
                    "[data-endpoint-name]",
                )
                const descriptionValue = tabContentContainer.querySelector(
                    "[data-endpoint-description]",
                )

                descriptionName.value = data.name
                descriptionValue.value = data.description
                break

            default:
                break
        }
    })
}

function updateConfigContainer(tab, query, lookup) {
    const fieldContainer = document.querySelector(
        !!lookup ? lookup : `.${tab.dataset.tab}Tab [data-fields]`,
    )

    const keyValuePairs = fieldContainer.querySelectorAll(`[data-key-val]`)

    const headers = Object.entries(query || {})

    for (const field of keyValuePairs) {
        const [headerKey, headerValue] = headers.shift() || []

        if (headerKey) {
            const fieldKey = field.querySelector("[data-key]")
            const fieldValue = field.querySelector("[data-value]")

            fieldKey.value = headerKey
            fieldValue.value = headerValue
            continue
        }
        if (keyValuePairs.length > 2) field.remove()
        break
    }

    if (headers.length > 0) {
        for (const h of headers) {
            const [key, value] = h
            const newField = field({ index: keyValuePairs.length + 1 })
            const span = document.createElement("span")
            span.innerHTML = newField
            fieldContainer.appendChild(span)

            const fieldKey = span.querySelector("[data-key]")
            const fieldValue = span.querySelector("[data-value]")

            fieldKey.value = key
            fieldValue.value = value
        }
    }
}

function clearConfigFields(tab) {
    const keyValuePairs = document.querySelectorAll(`.${tab}Tab [data-key-val]`)
    for (const field of keyValuePairs) {
        const fieldKey = field.querySelector("[data-key]")
        const fieldValue = field.querySelector("[data-value]")

        fieldKey.value = ""
        fieldValue.value = ""
    }
}
