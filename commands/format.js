// commands/format.js

commands.format = {
    execute: function(args, callback) {
        // Check if C: is being formatted
        if (args.length === 0 || args[0].toUpperCase() !== 'C:') {
            callback("Error: You can only format the C: drive.");
            return;
        }

        // Check for the /q switch
        const quickFormat = args.includes('/q');

        // Disable user input during the format process
        disableInput();

        // Determine the format duration
        const formatDuration = quickFormat ? 15000 : 300000; // 15 seconds or 5 minutes in milliseconds

        // Start formatting message and initialize progress
        const outputDiv = document.getElementById('output');
        const progressBarHTML = `
            <div class="output-line">
                <div>${currentDir}> Formatting C: ${quickFormat ? '(Quick Format)' : ''}</div>
            </div>
            <div class="output-line">
                <div id="formatStatus">Starting format...</div>
            </div>
            <div class="progress-bar" style="width: 100%; background-color: #ddd; border: 1px solid #000; height: 20px; margin: 10px 0;">
                <div id="progress" style="width: 0%; height: 100%; background-color: #007bff;"></div>
            </div>
            <div class="output-line">
                <div id="progressPercent">0%</div>
            </div>
        `;
        outputDiv.innerHTML += progressBarHTML;

        let progress = 0;
        const steps = quickFormat ? [
            'CKOS-FileSystem written.',
            'Quick formatting completed.'
        ] : [
            'Writing tables...',
            'Lining up dominos...',
            'CKOS-FileSystem written.',
            'Formatting nearly done...'
        ];

        // Update progress every second
        const updateInterval = formatDuration / 100;
        let stepIndex = 0;
        const progressInterval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(progressInterval);
                finalizeFormat(callback);
            } else {
                progress += 1;
                document.getElementById('progress').style.width = `${progress}%`;
                document.getElementById('progressPercent').textContent = `${progress}%`;

                // Update status messages based on progress
                if (progress % (100 / steps.length) === 0 && stepIndex < steps.length) {
                    document.getElementById('formatStatus').textContent = steps[stepIndex++];
                }
            }
        }, updateInterval);
    }
};

// Finalize the format by clearing storage, reloading the file system, and asking for a volume name
function finalizeFormat(callback) {
    const outputDiv = document.getElementById('output');

    // Clear local storage and reload file system
    localStorage.clear();
    fetch('filesystem.json')
        .then(response => response.json())
        .then(async (fs) => {
            fileSystem = {};  // Reset the file system
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

            // Ask for the volume name after formatting is complete
            askForVolumeName(callback);
        })
        .catch(() => {
            callback("Error: Failed to reload the file system.");
        });
}

// Function to ask for the new volume name after format
function askForVolumeName(callback) {
    const outputDiv = document.getElementById('output');
    const promptDiv = document.createElement('div');
    promptDiv.innerHTML = `
        <div class="output-line">
            <div>Format complete. Enter new volume label: <input type="text" id="volumeLabelInput"></div>
        </div>
    `;
    outputDiv.appendChild(promptDiv);

    const volumeInput = document.getElementById('volumeLabelInput');
    volumeInput.focus();

    volumeInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const volumeLabel = volumeInput.value.trim();
            if (volumeLabel !== '') {
                outputDiv.innerHTML += `
                    <div class="output-line">
                        <div>Volume label set to: ${volumeLabel}</div>
                    </div>
                `;
                callback(); // Formatting complete
            } else {
                outputDiv.innerHTML += `
                    <div class="output-line">
                        <div>No volume label set.</div>
                    </div>
                `;
            }

            // Re-enable user input after the volume name is set
            enableInput();
        }
    });
}

// Disable user input entirely
function disableInput() {
    inputEnabled = false;
    document.getElementById('current-input').style.display = 'none';  // Hide input during formatting
}

// Re-enable user input after formatting is complete
function enableInput() {
    inputEnabled = true;
    document.getElementById('current-input').style.display = 'block';  // Show input after formatting
}
