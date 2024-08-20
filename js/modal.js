// js/modal.js

function openFloatingWindow(content, title) {
    const floatingWindow = document.getElementById('floatingWindow');
    const windowTitle = document.getElementById('windowTitle');
    const windowBody = document.getElementById('windowBody');

    // Ensure the floating window elements exist
    if (!floatingWindow || !windowTitle || !windowBody) {
        console.error('Floating window elements not found.');
        return;
    }

    // Set the content and title
    windowTitle.textContent = title;
    windowBody.innerHTML = content;

    // Display the window and disable input to the DOS prompt
    floatingWindow.style.display = 'block';
    isModalOpen = true; // Disable DOS prompt input

    // Ensure the window can be dragged
    makeDraggable(floatingWindow);

    // Handle window controls
    const closeBtn = document.getElementById('closeWindow');
    const minimizeBtn = document.getElementById('minimizeWindow');
    const maximizeBtn = document.getElementById('maximizeWindow');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            floatingWindow.style.display = 'none';
            isModalOpen = false; // Re-enable DOS prompt input
        });
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            floatingWindow.style.height = '40px';
            windowBody.style.display = 'none';
        });
    }

    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', () => {
            floatingWindow.style.width = '100%';
            floatingWindow.style.height = '100%';
            floatingWindow.style.top = '0';
            floatingWindow.style.left = '0';
            windowBody.style.display = 'block';
        });
    }
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = document.getElementById('windowHeader');

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
