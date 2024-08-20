// js/main.js

let currentDir = "C:\\";
let inputBuffer = '';
let commands = {};
let fileSystem = {}; // Initialize as an empty object
let isModalOpen = false; // Flag to track if the modal is open

// Load settings and commands
fetch('settings.json')
    .then(response => response.json())
    .then(settings => {
        settings.commands.forEach(cmd => {
            loadCommand(cmd.name, cmd.file);
        });
    });

// Load and populate the virtual file system from filesystem.json
fetch('filesystem.json')
    .then(response => response.json())
    .then(async (fs) => {
        fileSystem = {};  // Ensure it's clean on each load
        for (let dir in fs) {
            fileSystem[dir] = [];
            for (let file of fs[dir]) {
                // Fetch the content for each real file
                let fileContent = await fetch(file.link).then(response => {
                    if (response.ok) {
                        return response.text();  // For markdown and text files
                    } else {
                        return null;
                    }
                }).catch(() => null);  // Handle fetch errors gracefully

                // Push the file along with its content into the file system
                fileSystem[dir].push({
                    name: file.name,
                    type: file.type,
                    content: fileContent,  // Store the actual content of the file
                    link: file.link        // Store the original link in case needed
                });
            }
        }
        console.log('Virtual file system populated with real files:', fileSystem);
    });

function loadCommand(name, file) {
    const script = document.createElement('script');
    script.src = `commands/${file}`;
    script.onload = () => {
        console.log(`${name} command loaded.`);
    };
    document.head.appendChild(script);
}

// Start the DOS-like interface
function startDOS() {
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(e) {
    // Block input if the modal is open
    if (isModalOpen) {
        return; // Do nothing if the floating modal is open
    }

    const currentInputSpan = document.getElementById('current-input');

    // Handle Enter key
    if (e.key === 'Enter') {
        if (inputBuffer.trim() !== '') {
            processCommand(inputBuffer.trim());
        }
        inputBuffer = '';  // Clear the buffer after processing the command
        currentInputSpan.textContent = '';  // Clear the visible input after execution
    }
    // Handle Backspace key
    else if (e.key === 'Backspace') {
        inputBuffer = inputBuffer.slice(0, -1);  // Remove last character from buffer
        currentInputSpan.textContent = inputBuffer.replace(/\s/g, '\u00A0'); // Handle space removal visually
    }
    // Handle spaces
    else if (e.key === ' ') {
        inputBuffer += ' ';  // Explicitly add a space to the input buffer
        currentInputSpan.textContent = inputBuffer.replace(/\s/g, '\u00A0'); // Replace spaces with non-breaking spaces for visibility
    }
    // Handle regular characters
    else if (e.key.length === 1) {
        inputBuffer += e.key;  // Add the character to the buffer
        currentInputSpan.textContent = inputBuffer.replace(/\s/g, '\u00A0');  // Display spaces as non-breaking spaces
    }
}

// Process the entered command and handle the prompt inline
function processCommand(command) {
    const outputDiv = document.getElementById('output');
    const terminal = document.getElementById('terminal');

    const cmdParts = command.split(' ');  // Split the command and arguments
    const cmd = cmdParts[0].toLowerCase();
    const argument = cmdParts.slice(1);

    // Display the entered command in the terminal
    const newOutput = `
        <div class="output-line">
            <div>${currentDir}> ${command}</div>
        </div>
    `;
    outputDiv.innerHTML += newOutput;

    // Execute the command if it exists
    if (commands[cmd]) {
        commands[cmd].execute(argument, (result) => {
            if (result) {
                outputDiv.innerHTML += `<div>${result}</div>`;
            }
            outputDiv.innerHTML += `
                <div class="output-line">
                    <div class="prompt">${currentDir}></div>
                    <div class="input-line"></div>
                </div>
            `;
        });
    } else {
        outputDiv.innerHTML += `<div>'${cmd}' is not recognized as an internal or external command.</div>`;
        outputDiv.innerHTML += `
            <div class="output-line">
                <div class="prompt">${currentDir}></div>
                <div class="input-line"></div>
            </div>
        `;
    }

    // Scroll to the bottom of the terminal
    terminal.scrollTop = terminal.scrollHeight;
}

startDOS();
