document.addEventListener("DOMContentLoaded", setupClipboardEvents);

function copyColorToClipboard(e) {
    const currentTarget = e.currentTarget;
    const color = e.currentTarget.getAttribute("data-color");

    navigator.clipboard.writeText(color).then(
        () => {
            /* clipboard successfully set */
            const alertNode = document.createElement("div");
            const textNode = document.createTextNode(`COPIED ${color}`);
            alertNode.appendChild(textNode);
            alertNode.setAttribute("aria-live", "polite");
            alertNode.setAttribute("role", "alert");
            alertNode.className = "color-button__alert";
            currentTarget.appendChild(alertNode);
            setTimeout(() => currentTarget.removeChild(alertNode), 2000);
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
