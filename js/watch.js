const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const text = document.querySelector(".text");
const context = canvas.getContext("2d");

const frameCount = 109;
const currentFrame = index => (
    `./watch/${index.toString()}.jpg`
)

const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
img.onload = function () {
    context.drawImage(img, 0, 0);
}

const updateTextOpacityOnScroll = (scrollTop) => {
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = (scrollTop / maxScrollTop);
    const opacity = 1 - scrollFraction;
    text.style.opacity = opacity;
}

const updateCanvasPositionOnScroll = (scrollTop) => {
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = (scrollTop / maxScrollTop);
    const maxTranslation = 100;
    const translation = scrollFraction * maxTranslation;
    canvas.style.transform = `translate(-50%, -${translation}%)`;
}

const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', (event) => {
    const scrollTop = event.target.scrollingElement.scrollTop;
    const maxScrollTop = event.target.scrollingElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => {
        updateImage(frameIndex + 1)
    })

    updateTextOpacityOnScroll(scrollTop);

    if (scrollTop < 1000) {
        // updateCanvasPositionOnScroll(scrollTop);
    }
});

preloadImages()