// js/main.js

let currentDir = "C:\\";
let inputBuffer = '';
let commands = {};
let fileSystem = {}; // Initialize as an empty object
let isModalOpen = false; // Flag to track if the modal is open
let inputEnabled = true; // Flag to track if input is enabled
let version = ""; // Store the version number

// Load settings and commands
fetch('settings.json')
    .then(response => response.json())
    .then(settings => {
        version = settings.version; // Store the version number
        settings.commands.forEach(cmd => {
            loadCommand(cmd.name, cmd.file);
        });
        displayVersion(); // Display the version number
    });

// Load and populate the virtual file system from filesystem.json
fetch('filesystem.json')
    .then(response => response.json())
    .then(async (fs) => {
        fileSystem = {};  // Ensure it's clean on each load
        for (let dir in fs) {
            fileSystem[dir] = [];
            for (let file of fs[dir]) {
                let fileContent = await fetch(file.link).then(response => {
                    return response.ok ? response.text() : null;
                }).catch(() => null);

                fileSystem[dir].push({
                    name: file.name,
                    type: file.type,
                    content: fileContent,
                    link: file.link
                });
            }
        }
    });

// Function to load a command dynamically
function loadCommand(name, file) {
    const script = document.createElement('script');
    script.src = `commands/${file}`;
    script.onload = () => {
        console.log(`${name} command loaded.`);
    };
    document.head.appendChild(script);
}

// Function to display the version number in the terminal
function displayVersion() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML += `
        <div class="output-line">
            <div>Welcome to CKOS Version ${version}</div>
        </div>
    `;
}

// Start the DOS-like interface
function startDOS() {
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(e) {
    if (isModalOpen || !inputEnabled) {
        return; // Block input if modal is open or input is disabled
    }

    const currentInputSpan = document.getElementById('current-input');

    if (e.key === 'Enter') {
        if (inputBuffer.trim() !== '') {
            processCommand(inputBuffer.trim());
        }
        inputBuffer = '';
        currentInputSpan.textContent = '';
    } else if (e.key === 'Backspace') {
        inputBuffer = inputBuffer.slice(0, -1);
        currentInputSpan.textContent = inputBuffer.replace(/\s/g, '\u00A0');
    } else if (e.key === ' ') {
        inputBuffer += ' ';
        currentInputSpan.textContent = inputBuffer.replace(/\s/g, '\u00A0');
    } else if (e.key.length === 1) {
        inputBuffer += e.key;
        currentInputSpan.textContent = inputBuffer.replace(/\s/g, '\u00A0');
    }
}

// Process the entered command and handle the prompt inline
function processCommand(command) {
    const outputDiv = document.getElementById('output');
    const terminal = document.getElementById('terminal');

    const cmdParts = command.split(' ');
    const cmd = cmdParts[0].toLowerCase();
    const argument = cmdParts.slice(1);

    outputDiv.innerHTML += `
        <div class="output-line">
            <div>${currentDir}> ${command}</div>
        </div>
    `;

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

    terminal.scrollTop = terminal.scrollHeight;
}

startDOS();
