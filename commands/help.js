// commands/help.js

commands.help = {
    execute: function(args, callback) {
        const outputDiv = document.getElementById('output');

        // Define the help content for each command
        const helpText = `
            <div class="output-line">
                <div><strong>CKOS Help - List of Available Commands:</strong></div>
            </div>
            <div class="output-line">
                <div><strong>help</strong> - Displays this help message.</div>
            </div>
            <div class="output-line">
                <div><strong>version</strong> - Displays the current version of CKOS.</div>
            </div>
            <div class="output-line">
                <div><strong>dir</strong> - Displays the contents of the current directory, including file sizes and free space.</div>
            </div>
            <div class="output-line">
                <div><strong>cd &lt;directory&gt;</strong> - Changes the current directory.</div>
            </div>
            <div class="output-line">
                <div><strong>ckcode &lt;filename&gt;</strong> - Opens and edits HTML files using a built-in editor.</div>
            </div>
            <div class="output-line">
                <div><strong>read &lt;filename&gt;</strong> - Reads and displays markdown (.md) files in a floating modal window.</div>
            </div>
            <div class="output-line">
                <div><strong>view &lt;filename&gt;</strong> - Views images or videos in a floating modal. Supports .webp and .mp4 formats.</div>
            </div>
            <div class="output-line">
                <div><strong>browser &lt;filename or URL&gt;</strong> - Renders HTML files in a floating modal as a preview, or opens external websites in an iframe. Includes bookmarks functionality (e.g., Foreman Learning).</div>
            </div>
            <div class="output-line">
                <div><strong>format C: [/q]</strong> - Formats the C: drive. Supports quick format with the /q switch. Simulates formatting with progress indicators.</div>
            </div>
        `;

        // Append the help content to the output div
        outputDiv.innerHTML += helpText;
    }
};
