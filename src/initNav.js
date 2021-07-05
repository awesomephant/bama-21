function handleIntersect(entries, observer) {
    const e = entries[0];
    console.log(entries[0])
    document.body.classList.toggle("nav-stuck", e.isIntersecting)
}

function createObserver(el) {
    let observer;
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: [0]
    };

    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(el);
}
function initNav() {
    const sentry = document.querySelector(".intersection-sentry")
    if (sentry) {
        createObserver(sentry);
    }

}

export { initNav }
