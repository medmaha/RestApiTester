export function handleTabClicked(ev) {
    const targetTab = ev.currentTarget.parentElement
    const activeTab = ev.currentTarget
        .closest(".__header_tabs")
        .querySelector("[data-tab].active")

    activeTab?.classList.remove("active")
    targetTab.classList.add("active")

    const tabName = targetTab.dataset.tab
    const preTabName = activeTab.dataset.tab
    localStorage.setItem("activeConfigTab", tabName)

    activateTabContent(tabName, preTabName)
}

function activateTabContent(tabName = "", activeTabName = "") {
    const targetTabContent = document.querySelector(`.${tabName}Tab`)
    const activeTabContent = document.querySelector(`.${activeTabName}Tab`)

    activeTabContent.classList.remove("active")
    activeTabContent.classList.add("hidden")

    targetTabContent.classList.add("active")
    targetTabContent.classList.remove("hidden")
}
