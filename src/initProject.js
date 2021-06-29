function initProject() {
    const project = document.querySelector(".single-project");
    if (project) {
        const images = document.querySelectorAll("img");
        const videoContainers = document.querySelectorAll(".video__container");

        images.forEach((img) => {
            if (img.complete) {
                img.classList.add("loaded");
                img.classList.add("cached");
            }
            img.addEventListener("load", () => {
                img.classList.add("loaded");
            });
        });

        videoContainers.forEach(v => {
            const video = v.querySelector("video")
            const muteToggle = v.querySelector(".video__mute")
            if (v.getAttribute("data-has-audio") === "true") {
                muteToggle.addEventListener("click", e => {
                    e.preventDefault();
                    if (video.muted === true){
                        video.muted = false;
                        v.classList.remove("is-muted")
                    } else {
                        video.muted = true;
                        v.classList.add("is-muted")
                    }
                })
                v.appendChild(muteToggle)
            }
        })
    }
}

export { initProject }
