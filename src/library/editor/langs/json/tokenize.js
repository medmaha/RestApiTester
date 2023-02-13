import AbstractedSyntaxTree from "./ast"

let LAST_ASTs

function tokenize(text = "") {
    const AbstractedSyntaxTreeList = [new AbstractedSyntaxTree()]
    const textArray = text.split("")
    const textArrayLength = textArray.length

    let idx = 0

    AbstractedSyntaxTreeList.pop()

    while (idx < textArrayLength) {
        const ast = { name: "", value: "", type: "" }
        const char = textArray[idx]

        let word

        switch (true) {
            case char === '"':
                word = text.substring(idx, textArrayLength)
                word = word.match(/.+?[^"\s }]+/)

                if (word) {
                    word = word[0]
                    const nextChar = textArray[idx + word.length]

                    if (nextChar === '"') {
                        ast.value = word += '"'
                        ast.type = "string"
                        idx += ast.value.length
                    } else {
                        ast.value = word
                        ast.name = "invalid"
                        ast.type = "string"
                        idx += ast.value.length
                        AbstractedSyntaxTreeList.push(
                            new AbstractedSyntaxTree(
                                AbstractedSyntaxTreeList.length + 1,
                                ast.name,
                                ast.value,
                                ast.type,
                            ),
                        )
                        continue
                    }

                    const toSave = []

                    if (textArray[idx]?.match(/:/)) {
                        ast.name = "json-key"
                        // todo handle whitespace in json key
                        const semicolon = {
                            name: "semicolon",
                            value: ":",
                            type: "string",
                        }

                        idx++
                        toSave.push(semicolon)
                    } else if (
                        AbstractedSyntaxTreeList[
                            AbstractedSyntaxTreeList.length - 1
                        ]?.value.match(/[{\]]/)
                    ) {
                        ast.name = "json-key"
                    } else {
                        ast.name = "json-value"
                    }
                    AbstractedSyntaxTreeList.push(
                        new AbstractedSyntaxTree(
                            AbstractedSyntaxTreeList.length + 1,
                            ast.name,
                            ast.value,
                            ast.type,
                        ),
                    )

                    for (const data of toSave) {
                        AbstractedSyntaxTreeList.push(
                            new AbstractedSyntaxTree(
                                AbstractedSyntaxTreeList.length + 1,
                                data.name,
                                data.value,
                                data.type,
                            ),
                        )
                    }
                    // Todo parse arrays
                } else {
                    AbstractedSyntaxTreeList.push(
                        new AbstractedSyntaxTree(
                            AbstractedSyntaxTreeList.length + 1,
                            "invalid",
                            char,
                            "string",
                        ),
                    )
                    idx++
                    break
                    // continue
                }
                continue

            case !!char.match(/[0-9]/):
                word = text.substring(idx, textArrayLength)
                word = word.match(/\w{0,}/)
                if (word) {
                    word = word[0]
                    ast.value = word
                    ast.name = "json-value"
                    ast.type = "number"
                    idx += word.length

                    AbstractedSyntaxTreeList.push(
                        new AbstractedSyntaxTree(
                            AbstractedSyntaxTreeList.length + 1,
                            ast.name,
                            ast.value,
                            ast.type,
                        ),
                    )
                } else {
                    idx++
                }
                continue

            case !!char.match(/[a-zA-Z]/):
                const t = text.substring(idx, textArrayLength)
                const wd = t.match(/\w{0,}/)

                ast.name = "invalid"
                ast.value = wd[0]
                ast.type = "string"
                AbstractedSyntaxTreeList.push(
                    new AbstractedSyntaxTree(
                        AbstractedSyntaxTreeList.length + 1,
                        ast.name,
                        ast.value,
                        ast.type,
                    ),
                )
                idx += wd[0].length
                continue

            case char === ",":
                idx += createAst(char, "comma", "string")
                continue
            case char === "{":
                idx += createAst(char, "opening-brace", "string")
                continue
            case char === "}":
                idx += createAst(char, "closing-brace", "string")
                continue
            case char === "[":
                idx += createAst(char, "opening-sqr-bracket", "string")
                continue
            case char === "]":
                idx += createAst(char, "closing-sqr-bracket", "string")
                continue

            case !!char.match(/ /):
                AbstractedSyntaxTreeList.push(
                    new AbstractedSyntaxTree(
                        AbstractedSyntaxTreeList.length + 1,
                        "space",
                        "",
                        "undefined",
                    ),
                )
                idx++
                continue
            case !!char.match(/[\n\r]/):
                AbstractedSyntaxTreeList.push(
                    new AbstractedSyntaxTree(
                        AbstractedSyntaxTreeList.length + 1,
                        "whitespace",
                        "",
                        "undefined",
                    ),
                )
                idx++
                continue

            default:
                if (!char) {
                    idx++
                    continue
                }
                AbstractedSyntaxTreeList.push(
                    new AbstractedSyntaxTree(
                        AbstractedSyntaxTreeList.length + 1,
                        "invalid",
                        char,
                        "string",
                    ),
                )

                idx++
                continue
        }
    }

    function createAst(value = "", name, type) {
        const ast = { name, value, type }
        AbstractedSyntaxTreeList.push(
            new AbstractedSyntaxTree(
                AbstractedSyntaxTreeList.length + 1,
                ast.name,
                ast.value,
                ast.type,
            ),
        )

        return value.length
    }

    const data = compareAST(AbstractedSyntaxTreeList)
    LAST_ASTs = AbstractedSyntaxTreeList
    return data
}

function compareAST(ASTs) {
    if (!LAST_ASTs) return ASTs

    const COPIED_ASTs = [...ASTs]

    for (let idx = 0; idx < ASTs.length; idx++) {
        const currentAst = COPIED_ASTs[idx]
        const lastAst = LAST_ASTs[idx]

        if (lastAst?.value === currentAst.value) continue
        else {
            currentAst.updateElement("added")
            if (lastAst) {
                lastAst.updateElement("deleted")
            }
            break
        }
    }
    return COPIED_ASTs
}

export default tokenize
