class SyntaxHighlightingTextarea extends HTMLElement {
    constructor() {
        super()

        // Create the textarea element and add it to the widget
        this.textarea = document.createElement("textarea")
        this.appendChild(this.textarea)

        // Listen for changes to the textarea and update the highlighting
        this.textarea.addEventListener("input", () => this.updateHighlighting())
    }

    updateHighlighting() {
        // Example implementation to highlight JSON syntax
        const text = this.textarea.value
        let highlightedText = ""

        try {
            // Try to parse the text as JSON
            JSON.parse(text)

            // Highlight the text as JSON
            highlightedText = text
                .replace(/\{/g, '<span class="json-keyword">{</span>')
                .replace(/\}/g, '<span class="json-keyword">}</span>')
                .replace(/\[/g, '<span class="json-keyword">[</span>')
                .replace(/\]/g, '<span class="json-keyword">]</span>')
                .replace(/:/g, '<span class="json-colon">:</span>')
                .replace(/,/g, '<span class="json-comma">,</span>')
        } catch (error) {
            // If the text is not valid JSON, just display it as plain text
            highlightedText = text
        }

        // Update the contents of the widget to display the highlighted text
        this.innerHTML = `<textarea>${highlightedText}</textarea>`
    }
}

export default SyntaxHighlightingTextarea
