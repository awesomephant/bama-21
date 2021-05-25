import { initTweenLines } from "./initLine"

window.settings = {
}

function initSettings() {
    console.log(window.settings)
    const settingsEl = document.querySelector(".settings")
    const inputs = settingsEl.querySelectorAll("input")

    inputs.forEach(input => {
        let id = input.getAttribute("id");
        window.settings[id] = input.value * 1;
        input.addEventListener("input", e => {
            window.settings[id] = input.value * 1;
            if (id === "linecount"){
                initTweenLines();
            }
        })
    })

    console.log(window.settings)

}

export { initSettings }