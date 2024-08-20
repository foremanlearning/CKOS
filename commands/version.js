// commands/version.js

commands.version = {
    execute: function(args, callback) {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML += `
            <div class="output-line">
                <div>CKOS Version ${version}</div>
            </div>
        `;
    }
};
