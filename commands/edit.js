// commands/edit.js

commands.edit = {
    execute: function(args, callback) {
        // Ensure the user passed a file name
        if (!args || args.length === 0) {
            callback("Error: No file name provided.");
            return;
        }

        const fileName = args[0].toLowerCase();

        // Look for the file in the virtual file system
        let file = fileSystem[currentDir]?.find(f => f.name.toLowerCase() === fileName && f.type === 'MD');

        // If the file isn't found, create a new file
        if (!file) {
            const confirmCreation = confirm(`File "${fileName}" not found. Do you want to create a new file?`);
            if (confirmCreation) {
                // Create a new file in the virtual file system
                file = {
                    name: fileName,
                    type: 'MD',
                    content: ''
                };
                fileSystem[currentDir].push(file);  // Add the new file to the virtual file system
            } else {
                callback('File creation canceled.');
                return;
            }
        }

        // Display the content in a textarea for editing
        try {
            const content = file.content || '';

            // Render an editable textarea for the content
            const editableContent = `
                <textarea id="editorTextArea" style="width: 100%; height: calc(100% - 40px); resize: none;">${content}</textarea>
                <button id="saveFileButton" class="btn btn-primary mt-2">Save</button>
            `;

            // Open the floating window with the editable textarea
            openFloatingWindow(editableContent, `Editing: ${file.name}`);

            // Handle saving the content when the user clicks the save button
            document.getElementById('saveFileButton').addEventListener('click', function () {
                const updatedContent = document.getElementById('editorTextArea').value;
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
