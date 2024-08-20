// commands/ckcode.js

commands.ckcode = {
    execute: function(args, callback) {
        // Ensure the user passed a file name
        if (!args || args.length === 0) {
            callback("Error: No file name provided.");
            return;
        }

        const fileName = args[0].toLowerCase();

        // Look for the file in the virtual file system
        let file = fileSystem[currentDir]?.find(f => f.name.toLowerCase() === fileName && f.type === 'HTML');

        // If the file isn't found, create a new file
        if (!file) {
            const confirmCreation = confirm(`File "${fileName}" not found. Do you want to create a new file?`);
            if (confirmCreation) {
                // Create a new file in the virtual file system
                file = {
                    name: fileName,
                    type: 'HTML',
                    content: ''
                };
                fileSystem[currentDir].push(file);  // Add the new file to the virtual file system
            } else {
                callback('File creation canceled.');
                return;
            }
        }

        // Display the content in a textarea for editing with a toolbar
        try {
            const content = file.content || '';

            // Build the HTML for the editor with a toolbar
            const editorHTML = `
                <div id="toolbar">
                    <button onclick="insertTag('<b>', '</b>')"><b>B</b></button>
                    <button onclick="insertTag('<i>', '</i>')"><i>I</i></button>
                    <button onclick="insertTag('<h1>', '</h1>')">H1</button>
                    <button onclick="insertTag('<h2>', '</h2>')">H2</button>
                    <button onclick="insertTag('<p>', '</p>')">P</button>
                    <button onclick="insertLink()">Link</button>
                </div>
                <textarea id="htmlEditor" style="width: 100%; height: calc(100% - 90px);">${content}</textarea>
                <button id="saveFileButton" class="btn btn-primary mt-2">Save</button>
            `;

            // Open the floating window with the editor
            openFloatingWindow(editorHTML, `Editing: ${file.name}`);

            // Save the file when the save button is clicked
            document.getElementById('saveFileButton').addEventListener('click', function () {
                const updatedContent = document.getElementById('htmlEditor').value;
                file.content = updatedContent;  // Update the file content in the virtual file system
                localStorage.setItem(file.name, updatedContent);  // Optionally save to localStorage for persistence
                alert('File saved!');
            });

            callback();
        } catch (error) {
            callback(`Error editing file: ${error.message}`);
        }
    }
};

// Functions for inserting HTML tags at the current cursor position in the textarea
function insertTag(openTag, closeTag) {
    const textarea = document.getElementById('htmlEditor');
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    // Insert the open and close tags at the current cursor position
    const originalText = textarea.value;
    const selectedText = originalText.substring(startPos, endPos);
    const newText = originalText.substring(0, startPos) + openTag + selectedText + closeTag + originalText.substring(endPos);

    textarea.value = newText;

    // Place the cursor between the open and close tags
    const cursorPos = startPos + openTag.length;
    textarea.setSelectionRange(cursorPos, cursorPos);
    textarea.focus();
}

function insertLink() {
    const url = prompt("Enter the URL");
    if (url) {
        insertTag(`<a href="${url}">`, '</a>');
    }
}
