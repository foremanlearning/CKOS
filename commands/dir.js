// commands/dir.js

commands.dir = {
    execute: function() {
        const outputDiv = document.getElementById('output');
        const files = fileSystem[currentDir] || [];
        if (files.length > 0) {
            const fileList = files.map(file => file.name).join('<br>'); // Access the file names
            outputDiv.innerHTML += `<div>${fileList}</div>`;
        } else {
            outputDiv.innerHTML += `<div>No files found.</div>`;
        }
        addNewPrompt();
    }
};
