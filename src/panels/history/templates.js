export function getEndpointTemplate(data, bg, _cls) {
    const lookup = `${data.method}__${data.url}`
    const activeEndpoint = localStorage.getItem("activeEndpoint")

    const isActive = lookup === activeEndpoint ? "active" : ""

    const statusColor = (() => {
        switch (Number(data.status_code || "0")) {
            case 200:
                return "text-blue-500"
            case 201:
                return "text-green-500"

            default:
                if (Number(data.status_code || "0") < 399)
                    return "text-orange-500"
                if (Number(data.status_code || "0") >= 400)
                    return "text-red-500"
                return "text-stale-800"
        }
    })()

    const template = `
        <div data-endpoint class="border-[1px] border-slate-400 border-r-0 border-l-0
           transition cursor-pointer bg-slate-${bg} py-[10px] px-2 ${isActive} ${
        _cls || ""
    }"
            >
            <div
                class="flex items-center gap-2 relative"
            >
                <div
                    class="__method h-full cursor-pointer text-sm text-[#293b97] font-semibold w-[35px]"
                >
                    ${data.method}
                </div>
                <div
                    title="${data.url}"
            
                    class="__url font-semibold text-sm text-center truncate flex-1 flex justify-center items-center"
                >

                    <div
                        contenteditable="true"
                        data-endpoint-name
                        class="leading-[30px] max-h-[30px] cursor-text text-sm text-center truncate w-max max-w-full font-semibold"
                    >
                        ${data.name}
                    </div>
            
                </div>
                <div
                    class="__status-code h-full text-sm font-semibold shrink-0 w-[25px]
                    ${statusColor}"
                >
                <div class="max-w-fit font-bold tracking-wide">
                    ${data.status_code}
                </div>
                </div>
                ${getEndpointDeleteTemp(bg)}
            </div>
        </div>
    `
    return template
}

export function getEndpointDeleteTemp(text) {
    const template = `
        <div class=" inline-flex right-1 z-10">
            <button class="p-1" title='delete' data-endpoint-delete>
                <svg stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"
                    class="h-4 w-4 hover:fill-red-100 hover:stroke-red-500 fill-slate-300 stroke-slate-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"
                >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        <div>
    `
    return template
}
