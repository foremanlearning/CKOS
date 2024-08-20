// cd.js

commands.cd = {
    execute: function(args) {
        const outputDiv = document.getElementById('output');

        if (args.length === 0) {
            outputDiv.innerHTML += `<div>Invalid directory.</div>`;
        } else if (args[0] === '..') {
            let dirs = currentDir.split('\\');
            dirs.pop();
            currentDir = dirs.join('\\') || 'C:\\';
        } else if (fileSystem[currentDir + '\\' + args[0]]) {
            currentDir += '\\' + args[0];
        } else {
            outputDiv.innerHTML += `<div>Directory not found.</div>`;
        }

        addNewPrompt();
    }
};
