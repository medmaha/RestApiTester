import { getKeyValuePairsWrapper } from "../templates"

export function getInitialTabs() {
    const wrapper = `
    <div
        data-body-t-b
        class="flex gap-4 justify-evenly w-[50%] px-8"
    >
        <style>
            [data-body-t-b] .active {
                color: rgb(59 130 246 / 1);
                background-color: rgb(241 245 249 / 1);
            }
        </style>
        <div data-tab data-body-tab="form" class="">
            <button class="px-2 hover:bg-slate-100">
                FormData
            </button>
        </div>
        <div data-tab data-body-tab="text" class="">
            <button class="px-2 hover:bg-slate-100">
                Text
            </button>
        </div>
        <div data-tab data-body-tab="json" class=" ">
            <button class="px-2 hover:bg-slate-100">
                JSON
            </button>
        </div>
    </div>
    <div class="h-[1px] w-full bg-slate-300"></div>
    <div class="body-tabs-contents-wrapper"></div>

  `
    return wrapper
}

export function getFormEncodeContainer() {
    const wrapper = getKeyValuePairsWrapper("Form")
    return wrapper
}

export function getTextEncodeContainer() {
    const wrapper = `
            <textarea class="w-full h-[200px] bg-slate-200 outline-[2px] outline-slate-300 focus:outline-blue-400
            outline border-none hover:bottom-0 p-2 resize-none" placeholder="eg. name=john&surname=doe"
            ></textarea>
            <p class='text-sm mt-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
    `

    const __class = "w-full p-2"
    const element = document.createElement("div")
    element.classList.add(...__class.split(" "))
    element.innerHTML = wrapper
    return element
}
