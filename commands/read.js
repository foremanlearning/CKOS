// commands/read.js

commands.read = {
    execute: function(args, callback) {
        // Ensure the user passed a file name
        if (!args || args.length === 0) {
            callback("Error: No file name provided.");
            return;
        }

        const fileName = args[0].toLowerCase();

        // Look for the file in the virtual file system
        const file = fileSystem[currentDir]?.find(f => f.name.toLowerCase() === fileName && f.type === 'MD');

        // If the file isn't found, return an error
        if (!file) {
            callback(`Error: File "${fileName}" not found.`);
            return;
        }

        // Check if the file has content
        if (!file.content || file.content.trim() === '') {
            callback(`Error: File "${fileName}" has no content.`);
            return;
        }

        try {
            // Initialize markdown-it to render the markdown content to HTML
            const md = new markdownit();
            const renderedHTML = md.render(file.content);

            // Use the floating window to display the rendered HTML content
            openFloatingWindow(renderedHTML, file.name);

            // Let the system know the command finished
            callback();
        } catch (error) {
            // Handle any errors during markdown rendering
            callback(`Error rendering markdown: ${error.message}`);
        }
    }
};
