export function getTextarea() {
    const __classesA = `h-[200px] text-inherit w-full resize-none bg-slate-200 p-1 px-3 editor focus:outline-blue-400 outline-[1px]`
    const __classesB = `bg-transparent rounded-sm textarea focus:border-none border border-[2px] border-slate-300 active:border-blue-400`

    const textarea = document.createElement("div")
    textarea.setAttribute("contenteditable", "true")
    textarea.setAttribute("data-editor", "true")
    textarea.classList.add(...(__classesA + __classesB).split(" "))

    textarea.innerHTML = "<span class='h'>{</span><span class='h'>}</span>"
    return textarea
}
