import { getTextarea } from "./templates"
import { highlightJSON } from "../langs"

function initLines(container, count) {
    if (!container) return `<span>1</span><span>2</span><span>3</span>`

    let wrapper = ``

    for (let i = 0; i < count; i++) {
        wrapper += `<span>${i + 1}</span>`
    }

    container.innerHTML = wrapper
}

const createPreTagWrappers = () => {
    const wrapper = `
        <pre
            data-pre-editor
            class="lines"
            id="preTextareaLines"
        ></pre>
        <pre
            data-pre-editor
            class="content"
            id="preTextareaContent"
        ></pre>
    `
    const element = document.createElement("div")
    element.classList.add("wrapper")
    element.innerHTML = wrapper

    return element
}

export default function responseEditor(doc_id) {
    const container = document.querySelector(
        doc_id || "#responseEditor .response",
    )
    container.innerHTML = ""
    container.appendChild(createPreTagWrappers())

    const preTextareaContent = container.querySelector("#preTextareaContent")
    const preTextareaLines = container.querySelector("#preTextareaLines")

    preTextareaContent.innerHTML = `<span>{}</span>`
    preTextareaLines.innerHTML = initLines()

    function updateResponse(payload) {
        if (payload.string) {
            preTextareaContent.innerHTML = payload.string
            preTextareaLines.innerHTML = ""
            return
        } else if (payload.html) {
            preTextareaLines.innerHTML = ""
            preTextareaContent.innerHTML = ""
            console.log(payload.html)
            preTextareaContent.innerHTML = JSON.stringify(payload.html, null, 2)
            return
        }

        if (payload === "{}") {
            preTextareaContent.innerHTML = "{}"
            return
        }
        preTextareaContent.innerHTML = ""
        const [data, linesCount] = highlightJSON(payload)
        initLines(preTextareaLines, linesCount)
        preTextareaContent.appendChild(data)
    }

    return { updateResponse }
}
