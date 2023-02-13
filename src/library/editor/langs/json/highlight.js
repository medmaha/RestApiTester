import tokenize from "./tokenize.js"
import traverseJson from "./traverse.js"

function highlightJSON(json, tokenized = false) {
    if (typeof json !== "string") {
        json = JSON.stringify(json)
    }

    if (tokenized) {
        const tokens = tokenize(json)
        let compiledJson = ""
        for (const ast of tokens) {
            compiledJson += ast.element
        }

        const wrapper = document.createElement("pre")
        wrapper.innerHTML = compiledJson
        return [wrapper, 2]
    }

    const { output, lines } = traverseJson(json)

    const wrapper = document.createElement("div")
    wrapper.classList.add("content-wrapper")
    wrapper.innerHTML = output

    return [wrapper, lines]
}

export default highlightJSON
