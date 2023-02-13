class AST {
    constructor(id = "", name = "", value = "", type = "") {
        this.id = id
        this.name = name
        this.value = value
        this.type = type
        this.element = null

        this.init()
    }

    init(text = "") {
        switch (this.name) {
            case "json-key":
                this.element = `<span class='${text} h-key'>${this.value}</span>`
                break
            case "array-item":
                this.element = `<span class='${text} h-item'>${this.value}</span>`
                break
            case "json-value":
                this.element = `<span class='${
                    this.type === "number"
                        ? "h-value-n"
                        : this.type === "boolean"
                        ? "h-value-b"
                        : "h-value"
                } ${text}'>${this.value}</span>`
                break

            case "comma":
            case "semicolon":
                this.element = `<span class='h ${text}'>${this.value}</span>`
                break

            case "space":
                this.element = `<span class='${text}'> </span>`
                break
            case "whitespace":
                this.element = `<span class='${text}'></span>\n`
                break
            case "invalid":
                this.element = `<span class='${text} text-black'>${this.value}</span>`
                break
            default:
                this.element = `<span class='${text}'>${this.value}</span>`
                break
        }
    }

    updateElement(text) {
        this.init(text)
    }
}
export default AST
