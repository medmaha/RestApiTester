import "./description"
import "./headers"
import "./query"
import "./body"

const tabsContainer = document.querySelector(".__header_tabs")
const tabs = document.querySelectorAll(".__header_tabs [data-tab]")
const tabsContentsContainer = document.querySelector("[data-tab-content]")

let activeTab = localStorage.getItem("activeConfigTab")

function initialize(tabName) {
    const tabButton = tabsContainer.querySelector(`[data-tab="${tabName}"]`)
    const tabContent = tabsContentsContainer.querySelector(`.${tabName}Tab`)

    tabButton.classList.add("active")
    tabContent.classList.add("active")
    tabContent.classList.remove("hidden")
}

initialize(activeTab || "headers")

document.addEventListener("preformsubmit", () => {
    let config = {}

    for (const tab of tabs) {
        const lookup = tab.dataset.tab + "Tab"
        if (["descriptionTab", "settingsTab", ""].includes(lookup)) continue

        const container = tabsContentsContainer.querySelector("." + lookup)

        const data = parseConfiguration(tab.dataset.tab, container)

        if (!!data) {
            config = {
                ...config,
                ...data,
            }
        }
    }

    const configParseEvent = new CustomEvent("onconfigparse", {
        detail: { data: config },
    })

    document.dispatchEvent(configParseEvent)
})

function parseConfiguration(lookup, container) {
    function getKeyValuePairs(KEY = String("")) {
        const data = {}
        container.querySelectorAll("[data-key-val]").forEach((field) => {
            const key = field.querySelector("input[data-key]").value
            const value = field.querySelector("input[data-value]").value

            if (key.length) {
                data[key] = value
            }
        })

        if (Object.keys(data).length > 0) {
            if (KEY === "body") {
                const form = new FormData()
                for (const _key in data) {
                    form.append(_key, data[_key])
                }
                return { data: form }
            }
            return { [KEY]: { ...data } }
        }
    }

    if (lookup.toLowerCase() === "body") {
        const activeTabContainer = container.querySelector(
            "[data-content].active",
        )

        if (activeTabContainer.classList.contains("json-encode")) {
            const activeTabData =
                activeTabContainer.querySelector(".textarea").textContent
            const json = JSON.parse(activeTabData)
            return { data: json }
        }
        if (activeTabContainer.classList.contains("text-encode")) {
            const activeTabData =
                activeTabContainer.querySelector("textarea").value
            const text = String(activeTabData)

            return { data: text }
        }
    }
    return getKeyValuePairs(lookup)
}
