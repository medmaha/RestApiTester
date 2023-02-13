import { getTextarea } from "./templates"
import { highlightJSON } from "../langs"

function requestEditor(doc_id) {
    const container = document.getElementById(doc_id)

    container.classList.add("px-1")
    container.classList.add("mt-2")

    container.appendChild(getTextarea())

    const textarea = container.firstChild
    textarea.focus()

    const textSelector = document.createElement("input")

    let LAST_NODE

    let preDocument = textarea.innerHTML

    textarea.addEventListener("keydown", function (event) {
        let currentDocument = event.currentTarget.innerHTML
        if (event.ctrlKey && "KeyZ KeyY".split(" ").includes(event.code)) {
            if (preDocument !== currentDocument) {
                console.log("Ctrl+Z pressed.")
                textarea.innerHTML = preDocument
                // window.getSelection()
                // event.stopPropagation()
            }
        }
    })

    textarea.addEventListener("input", (ev) => {
        if (textarea.textContent.length > 2) {
            const [json, lines] = highlightJSON(
                textarea.innerText || textarea.textContent,
                true,
            )

            textarea.innerHTML = ""
            textarea.appendChild(json)

            textSelector.value = textarea.innerText || textarea.textContent

            preDocument = textarea.innerHTML

            var range = document.createRange()
            var sel = window.getSelection()

            const lastNode = (() => {
                let lastNode = json.childNodes[json.childNodes.length - 1]
                if (lastNode?.textContent === "}") {
                    lastNode = json.childNodes[json.childNodes.length - 2]
                }
                for (const elem of json.childNodes) {
                    if (elem.classList?.contains("added")) {
                        lastNode = elem
                        break
                    }
                }

                return lastNode
            })()
            LAST_NODE = lastNode

            range.setStart(LAST_NODE, 1)
            range.collapse(true)

            sel.removeAllRanges()
            sel.addRange(range)
        }
    })
}

export default requestEditor
