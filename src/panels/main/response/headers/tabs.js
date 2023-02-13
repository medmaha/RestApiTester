const tabsContainer = document.querySelector("[data-response-headers]")
const tabs = tabsContainer.querySelectorAll("[data-header-tab]")

const responseEditor = document.querySelector("#responseEditor")

let ACTIVE_TAB
let ACTIVE_TAB_ELEMENT = tabsContainer.querySelector("[data-header-tab].active")

function handleTabClicked(ev) {
    tabsContainer
        .querySelector("[data-header-tab].active")
        .classList.remove("active")

    const TAB = ev.currentTarget
    TAB.classList.add("active")

    switch (true) {
        case "headers" in TAB.dataset:
            switchToTabContent("headers")
            break
        case "request" in TAB.dataset:
            switchToTabContent("request")
            break
        case "cookies" in TAB.dataset:
            switchToTabContent("cookies")
            break
        default:
            switchToTabContent("response")
    }
}

function switchToTabContent(ACTIVE_TAB) {
    const headersContainer = responseEditor.querySelector(".headers")
    const requestContainer = responseEditor.querySelector(".request")
    const cookiesContainer = responseEditor.querySelector(".cookies")
    const responseContainer = responseEditor.querySelector(".response")

    let loopLength = responseEditor.querySelectorAll("[data-editor_]")
    for (let idx = 0; idx < loopLength.length; idx++) {
        const element = loopLength[idx]
        if (!element.classList.contains("hidden")) {
            element.classList.add("hidden")
            // element.style.display = "none"
            break
        }
    }
    switch (ACTIVE_TAB) {
        case "response":
            responseContainer.classList.remove("hidden")
            break
        case "request":
            requestContainer.classList.remove("hidden")
            break
        case "headers":
            headersContainer.classList.remove("hidden")
            break
        case "cookies":
            cookiesContainer.classList.remove("hidden")
            break

        default:
            break
    }
}

tabs.forEach((tab) => {
    tab.addEventListener("click", handleTabClicked)
})
