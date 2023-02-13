export const fieldHeader = (tab) => {
    const header = `
        <div class="content-header w-full py-1">
            <div class="flex justify-around w-full">
                <h5 class="text-center">${tab} ${
        tab === "Form" ? "Key" : "Name"
    }</h5>
                <h5 class="text-center">${tab} Value</h5>
            </div>
        </div>
    `

    return header
}

export const field = (data) => {
    const f = `
        <div
            data-key-val='${data.index}'
            class="flex justify-between items-center p-1 mt-1 gap-4 w-full"
        >
            <div class="index w-[1.2rem] flex justify-center items-center">
                <span class="text-sm font-semibold">
                    ${data.index}.
                </span>
            </div>
            <div class="key flex-1">
                <input
                    class="p-1 w-full rounded-sm border-0 focus:border-0 outline-[1px] focus:outline-[3px] outline outline-slate-400"
                    type="text"
                    placeholder="key"
                    data-key
                    name="key"
                    autoComplete="on"
                     aria-autocomplete="list"
                />
            </div>
            <div class="value flex-1">
                <input
                    class="p-1 w-full rounded-sm border-0 focus:border-0 outline-[1px] focus:outline-[3px] outline outline-slate-400"
                    type="text"
                    placeholder="value"
                    data-value
                    name="value"
                    autoComplete="on"
                />
            </div>
            <div
                class='block w-[2rem]'
            >
                <button
                    data-delete-field
                    class="flex justify-center items-center h-[30px] w-[30px] transition text-red-400 outline hover:bg-red-400 hover:text-white rounded-full leading-4 outline-[1px] outline-red-200"
                    >
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"
                    class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"
                >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                    </button
                >
            </div>
        </div>
    `
    return f
}

export const getKeyValuePairsWrapper = (tab, init) => {
    if (!tab) {
        tab = "header"
    }
    if (!init) {
        init = { index: 1 }
    }

    const wrapper = `
         <div  class="w-full flex flex-col gap-2 overflow-hidden>
           ${fieldHeader(tab)}
           
           <div data-fields class='max-h-[200px] h-full min-h-[50px] overflow-hidden overflow-y-auto'>
                ${field(init)}
                ${field({ ...init, index: 2 })}
           </div>

            <button
                data-add-field
                class="w-max ml-[2.5rem] p-1 px-2 rounded-md bg-blue-500 text-slate-200"
            >
                Add Field
            </button>
        </div>
        </div>
    `

    return wrapper
}
