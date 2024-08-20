// commands/dir.js

let volumeName = 'CKOS'; // Default volume name after formatting
const maxDiskSpace = 150 * 1024 * 1024; // 150MB in bytes

commands.dir = {
    execute: function(args, callback) {
        const outputDiv = document.getElementById('output');
        let totalUsedSpace = 0;

        // Display volume name
        outputDiv.innerHTML += `
            <div class="output-line">
                <div>Volume in drive C: is ${volumeName}</div>
            </div>
        `;

        // Display directory contents and calculate used space
        outputDiv.innerHTML += `
            <div class="output-line">
                <div>Directory of ${currentDir}</div>
            </div>
        `;

        const files = fileSystem[currentDir];
        if (files && files.length > 0) {
            files.forEach(file => {
                const fileSize = calculateFileSize(file.content);
                totalUsedSpace += fileSize;
                const fileSizeFormatted = formatFileSize(fileSize);
                
                outputDiv.innerHTML += `
                    <div class="output-line">
                        <div>${file.name.padEnd(20, ' ')} ${fileSizeFormatted}</div>
                    </div>
                `;
            });
        } else {
            outputDiv.innerHTML += `
                <div class="output-line">
                    <div>No files found in this directory.</div>
                </div>
            `;
        }

        // Calculate free space
        const freeSpace = maxDiskSpace - totalUsedSpace;
        const freeSpaceFormatted = formatFileSize(freeSpace);

        // Display free space
        outputDiv.innerHTML += `
            <div class="output-line">
                <div>${files ? files.length : 0} file(s)     ${formatFileSize(totalUsedSpace)} used</div>
            </div>
            <div class="output-line">
                <div>${freeSpaceFormatted} free</div>
            </div>
        `;
    }
};

// Function to calculate the size of a file in bytes based on its content
function calculateFileSize(content) {
    if (!content) return 0;
    return new Blob([content]).size; // Calculate the size of the file content
}

// Function to format file sizes in a human-readable format
function formatFileSize(sizeInBytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = sizeInBytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
}
