// commands/help.js

commands.help = {
    execute: function(args, callback) {
        const helpText = `
            <strong>Welcome to CKOS (Computer Knowledge Enthusiast Operating System)</strong><br>
            This operating system was invented by the community at www.tiktok.com/ckenthusiast.<br><br>

            <strong>Available commands:</strong><br>
            <ul>
                <li><strong>help</strong>: Show this help message with available commands.</li>
                <li><strong>dir</strong>: Lists files and directories in the current directory.</li>
                <li><strong>cd [directory-name]</strong>: Change the current directory to the specified directory. Use "cd .." to go up one level.</li>
                <li><strong>read [filename.md]</strong>: Display the content of a markdown (.md) file inside a modal.</li>
                <li><strong>view [filename]</strong>: Open and display an image (.webp) or video (.mp4) inside a modal.</li>
            </ul>
        `;

        // Send the help text to the terminal output via callback
        callback(helpText);
    }
};
