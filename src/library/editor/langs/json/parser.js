import AST from "./ast.js"

function parser(jsonString) {
    const ASTs = [new AST()]
    const stringList = jsonString.split("")
    const stringCount = stringList.length

    ASTs.pop()

    for (let idx = 0; idx < stringCount; ) {
        let char = stringList[idx]
        let ast = { type: "", name: "", value: "" }

        if (!char) {
            console.log(char)
            idx++
            continue
        }

        if (char === ",") {
            ast.name = "comma"
            ast.type = "string"
            ast.value = `${char}`
            idx++
            addToAST(ast)
            char = stringList[idx]
        }

        if (char === '"' || char?.match(/[a-zA-Z]/)) {
            const wordSequence = jsonString.substring(idx, stringCount)
            let word = wordSequence.match(/[^:,}\]]+/)[0]

            if (
                stringList[idx - 1]?.match(/\[/) ||
                [...ASTs].reverse()[1]?.name.match(/array/)
            ) {
                ast.name = "array-item"
            } else if (stringList[idx + word.length]?.match(/[,\]}]/)) {
                ast.name = "json-value"
            } else {
                ast.name = "json-key"
            }
            ast.value = word
            ast.type = "string"
            addToAST(ast)
            idx += word.length

            char = stringList[idx]

            if (["array-item", "json-value"].includes(ast.name)) {
                if (!char === ",")
                    addToAST({ name: "comma", value: ",", type: "string" })
            }
        }

        if (char === ":" || stringList[idx - 1]?.match(/[{\[]/)) {
            if (char === ":") {
                ast.name = "semicolon"
                ast.type = "string"
                ast.value = ":"
                addToAST(ast)
                idx++
            }

            const nextChar = stringList[idx]

            if (nextChar?.match(/[\[{]/)) {
                continue
            } else if (!nextChar) {
                idx++
                continue
            }

            const wordSequence = jsonString.substring(idx, stringCount)
            let word
            if (stringList[idx] === '"') {
                word = wordSequence?.match(/.+?[^"]+/)
                word = word ? word[0] : ""
            } else {
                word = wordSequence?.match(/[^:,}\]]+/)
                word = word ? word[0] : ""
            }

            if (Number(word) + 1 >= 0) {
                ast.type = "number"
            } else if (word.split("")[0].match(/["0-9]/)) {
                ast.type = "string"
            } else if (word.split("")[0].match(/[tf]/)) {
                ast.type = "boolean"
            } else {
                ast.type = "undefined"
            }

            ast.value = word
            ast.name = "json-value"
            addToAST(ast)

            idx += word.length

            char = stringList[idx]
        }

        if (char == "[") {
            ast.value = "["
            ast.name = "opening-sqr-bracket"
            ast.type = "string"
            idx++
            addToAST(ast)
            char = stringList[idx]
        }

        if (char == "]") {
            ast.value = char
            ast.type = "string"
            ast.name = "closing-sqr-bracket"
            idx++
            addToAST(ast)
            char = stringList[idx]
        }

        if (char == "{") {
            ast.value = `${char}`
            ast.name = "opening-brace"
            ast.type = "string"
            idx++
            addToAST(ast)
            char = stringList[idx]
        }

        if (char == "}") {
            ast.value = `${char}`
            ast.type = "string"
            ast.name = "closing-brace"
            idx++
            addToAST(ast)
            char = stringList[idx]
        }
    }

    function addToAST(data) {
        ASTs.push(new AST(ASTs.length + 1, data.name, data.value, data.type))
        return ASTs[ASTs.length - 1]
    }

    return ASTs
}

function stringParser(char, idx, stringList) {
    const wordSequence = ""
}

export default parser
