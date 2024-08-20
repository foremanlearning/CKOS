// commands/browser.js

commands.browser = {
    execute: function(args, callback) {
        if (!args || args.length === 0) {
            callback("Error: No file or URL provided.");
            return;
        }

        let address = args[0].toLowerCase();

        // Build the browser interface with address bar, navigation buttons, and bookmarks
        const browserUI = `
            <div id="browserToolbar" style="display: flex; align-items: center; padding: 5px; background-color: #f1f1f1; border-bottom: 1px solid #ccc;">
                <button id="browserBack" style="margin-right: 5px;">&larr;</button>
                <button id="browserForward" style="margin-right: 5px;">&rarr;</button>
                <button id="browserReload" style="margin-right: 5px;">&#x21bb;</button>
                <button id="browserStop" style="margin-right: 10px;">&#x2716;</button>
                <select id="bookmarkSelect" style="margin-right: 10px;">
                    <option value="">Bookmarks</option>
                    <option value="https://www.foremanlearning.com">Foreman Learning</option>
                </select>
                <input type="text" id="browserAddress" value="${address}" style="flex: 1; padding: 5px;" />
                <button id="browserGo" style="margin-left: 10px;">Go</button>
            </div>
            <iframe id="browserFrame" style="width: 100%; height: calc(100% - 50px); border: none;"></iframe>
        `;

        // Open the floating window with the browser interface
        openFloatingWindow(browserUI, `Browser`);

        const iframe = document.getElementById('browserFrame');
        const addressBar = document.getElementById('browserAddress');
        const bookmarkSelect = document.getElementById('bookmarkSelect');

        // Set up event listeners for the toolbar and bookmarks
        document.getElementById('browserGo').addEventListener('click', () => loadContent(addressBar.value));
        document.getElementById('browserBack').addEventListener('click', () => iframe.contentWindow.history.back());
        document.getElementById('browserForward').addEventListener('click', () => iframe.contentWindow.history.forward());
        document.getElementById('browserReload').addEventListener('click', () => iframe.contentWindow.location.reload());
        document.getElementById('browserStop').addEventListener('click', () => iframe.contentWindow.stop());
        
        // Handle bookmark selection
        bookmarkSelect.addEventListener('change', () => {
            const selectedBookmark = bookmarkSelect.value;
            if (selectedBookmark) {
                loadContent(selectedBookmark);
                addressBar.value = selectedBookmark; // Update address bar
            }
        });

        // Load the initial content from the command argument
        loadContent(address);

        function loadContent(addr) {
            addr = ensureHTTPS(addr);

            if (isValidURL(addr)) {
                iframe.src = addr;
            } else {
                // Check for local file in the virtual file system
                const file = fileSystem[currentDir]?.find(f => f.name.toLowerCase() === addr && f.type === 'HTML');
                if (file) {
                    const blob = new Blob([file.content], { type: 'text/html' });
                    const localUrl = URL.createObjectURL(blob);
                    iframe.src = localUrl;
                } else {
                    callback(`Error: File "${addr}" not found.`);
                }
            }
        }

        callback(); // Command complete
    }
};

// Function to ensure the URL uses HTTPS
function ensureHTTPS(url) {
    if (!url.startsWith('https://') && url.startsWith('http://')) {
        return url.replace('http://', 'https://');
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`;
    }
    return url;
}

// Helper function to check if the input is a valid URL
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}
