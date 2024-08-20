// commands/view.js

commands.view = {
    execute: function(args, callback) {
        // Ensure the user passed a file name
        if (!args || args.length === 0) {
            callback("Error: No file name provided.");
            return;
        }

        const fileName = args[0].toLowerCase();

        // Look for the file in the virtual file system
        const file = fileSystem[currentDir]?.find(f => f.name.toLowerCase() === fileName);

        // If the file isn't found, return an error
        if (!file) {
            callback(`Error: File "${fileName}" not found.`);
            return;
        }

        // Handle image files
        if (file.type === 'WEBP') {
            const content = `<img src="${file.link}" class="img-fluid" alt="${file.name}">`;
            openFloatingWindow(content, file.name); // Use the floating window to display the image
            callback();
        } 
        // Handle video files
        else if (file.type === 'MP4') {
            const content = `<video controls class="w-100"><source src="${file.link}" type="video/mp4">Your browser does not support the video tag.</video>`;
            openFloatingWindow(content, file.name); // Use the floating window to display the video
            callback();
        } 
        else {
            callback('Error: Unsupported file type.');
        }
    }
};
