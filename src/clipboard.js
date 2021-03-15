document.addEventListener("DOMContentLoaded", setupClipboardEvents);

function copyColorToClipboard(e) {
    const color = e.target.getAttribute("data-color");

    navigator.clipboard.writeText(color).then(
        () => {
            /* clipboard successfully set */
        },
        () => {
            /* clipboard write failed */
        }
    );

    console.log(color);
}

function setupClipboardEvents() {
    const colorButtons = document.getElementsByClassName("color-button");

    for (let node of colorButtons) {
        node.addEventListener("click", handleClick);
    }
}
