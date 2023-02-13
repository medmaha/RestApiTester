import parser from "./parser.js"

function traverseJson(jsonString) {
    let compiledJson = ``
    const abstractedSyntaxTree = parser(jsonString)
    let INDENTATION = ""
    let tapSize = "  "

    let idx = 0
    while (idx < abstractedSyntaxTree.length) {
        let ast = abstractedSyntaxTree[idx]

        var reIndent = ""
        let text = ast.element
        switch (ast.name) {
            case "opening-brace":
            case "opening-sqr-bracket":
                const emptyValue =
                    !!abstractedSyntaxTree[idx + 1]?.value.match(/[\]}]/)
                if (abstractedSyntaxTree[idx - 1]?.value === ":") {
                    reIndent = ""
                } else {
                    reIndent = INDENTATION
                }

                let empty = emptyValue ? "" : "\n"
                compiledJson += reIndent + ast.element + empty

                INDENTATION += tapSize
                if (emptyValue) {
                    compiledJson += abstractedSyntaxTree[idx + 1].element
                    idx++
                    continue
                }
                break

            case "closing-brace":
                const iLength = INDENTATION.length
                const tLength = tapSize.length
                for (let i = 0; i < iLength - tLength; i++) {
                    reIndent += " "
                }
                compiledJson += "\n" + reIndent + ast.element
                INDENTATION = reIndent
                break
            case "closing-sqr-bracket":
                compiledJson += "\n" + INDENTATION + ast.element
                break
            case "json-value":
                compiledJson += ast.element
                break
            case "array-item":
                reIndent = INDENTATION
                if (abstractedSyntaxTree[idx + 1].name?.match(/bracket/)) {
                    reIndent = ""
                    const iLength = INDENTATION.length
                    const tLength = tapSize.length
                    for (let i = 0; i < iLength - tLength; i++) {
                        reIndent += " "
                        // text += "\n"
                    }
                }
                compiledJson += INDENTATION + text
                INDENTATION = reIndent
                break
            case "comma":
                const nextElement = abstractedSyntaxTree[idx + 1]
                if (!nextElement?.value.match(/[\]}]/g)) text += "\n"
                compiledJson += text
                break
            case "semicolon":
                compiledJson += ast.element + " "
                break
            default:
                compiledJson += INDENTATION + ast.element
                break
        }

        idx++
    }

    const lines = compiledJson.match(/\r?\n\t?/g)?.length || 0

    return { output: compiledJson, lines: lines + 1 }
}

export default traverseJson
