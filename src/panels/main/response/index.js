import "./styles.css"
import "./headers"
import "./request"
import "./dispatch"

const responseEditor = document.getElementById("responseEditor")

function setupSizing() {
    responseEditor.style.setProperty(
        "height",
        String(
            window.innerHeight - responseEditor.getBoundingClientRect().y - 3,
        ) + "px",
    )
}
setupSizing()

document.addEventListener("ontabchange", setupSizing)
