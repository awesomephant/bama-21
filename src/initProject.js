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

        videoContainers.forEach(container => {
            const video = container.querySelector("video")
            const muteToggle = container.querySelector(".video__mute")
            const playToggle = container.querySelector(".video__play")

            playToggle.addEventListener("click", e => {
                e.preventDefault()
                if (video.paused) {
                    video.play()
                    container.classList.remove("is-paused")
                } else {
                    video.pause()
                    container.classList.add("is-paused")
                }
            })

            if (container.getAttribute("data-has-audio") === "true") {
                muteToggle.addEventListener("click", e => {
                    e.preventDefault();
                    if (video.muted === true) {
                        video.muted = false;
                        container.classList.remove("is-muted")
                    } else {
                        video.muted = true;
                        container.classList.add("is-muted")
                    }
                })
            }
        })
    }
}

export { initProject }
