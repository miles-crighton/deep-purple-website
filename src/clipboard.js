document.addEventListener("DOMContentLoaded", setupClipboardEvents);

function copyColorToClipboard(e) {
    const color = e.currentTarget.getAttribute("data-color");

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
    const layerButtons = document.getElementsByClassName("layer-button");

    const buttons = [...colorButtons, ...layerButtons];

    for (let node of buttons) {
        node.addEventListener("click", copyColorToClipboard, false);
    }
}
