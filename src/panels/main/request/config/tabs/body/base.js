import { handleTabClicked } from "../base"
import { getInitialTabs } from "./templates"

const container = document.querySelector(".bodyTab")
const tabButton = document.querySelector('[data-tab="body"] button')
let tabContentContainer

function initialize() {
    const span = document.createElement("span")
    span.innerHTML = getInitialTabs()

    document.querySelector(".bodyTab").appendChild(span)

    tabContentContainer = document.querySelector(
        ".bodyTab .body-tabs-contents-wrapper",
    )

    tabButton.addEventListener("click", handleTabClicked)

    handleBodyTabClicked()
    activateTab()
}

initialize()

function handleBodyTabClicked() {
    container.querySelectorAll("[data-body-tab] button").forEach((element) => {
        element.addEventListener("click", handleClick)

        activateTabContent()
    })

    function handleClick(ev) {
        const targetTab = ev.currentTarget
        const activeTab = container.querySelector(
            "[data-body-tab] button.active",
        )
        activeTab.classList.remove("active")
        targetTab.classList.add("active")

        const tabName = targetTab.parentElement.dataset.bodyTab
        updateContentDisplay(tabName)
    }

    function updateContentDisplay(tabName) {
        const targetTabContent = tabContentContainer.querySelector(
            `[data-content].${tabName}-encode`,
        )

        const activeTabContent = tabContentContainer.querySelector(
            "[data-content].active",
        )

        activeTabContent.classList.remove("active")
        targetTabContent.classList.add("active")

        activeTabContent.classList.add("hidden")
        targetTabContent.classList.remove("hidden")
    }
}

// todo ---> optimize
function activateTab() {
    const activeButton = container.querySelector(
        '[data-body-tab="form"] button',
    )

    activeButton.classList.add("active")
}

function activateTabContent() {
    // tabContentContainer
}
