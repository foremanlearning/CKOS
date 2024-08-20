Here is the updated CKOS manual reflecting all the latest features, including version tracking, new commands like `version`, enhanced `dir` output, and the `format` command's additional behavior:

---

## CKOS Version 0.1.0 - User Manual

Welcome to CKOS, a command-line-based operating system for Computer Knowledge Enthusiasts.

### Table of Contents
1. [Commands Overview](#commands-overview)
2. [Command Descriptions](#command-descriptions)
   - [help](#help)
   - [version](#version)
   - [dir](#dir)
   - [cd](#cd)
   - [ckcode](#ckcode)
   - [read](#read)
   - [view](#view)
   - [browser](#browser)
   - [format](#format)

---

## Commands Overview

Below is a list of available commands in CKOS:

| Command   | Description                                            |
|-----------|--------------------------------------------------------|
| `help`    | Displays a list of available commands.                 |
| `version` | Displays the current version of CKOS.                  |
| `dir`     | Displays the contents of the current directory with file sizes and free space. |
| `cd`      | Changes the current directory.                         |
| `ckcode`  | Opens and edits HTML files with a built-in editor.     |
| `read`    | Reads and displays markdown files in a modal.          |
| `view`    | Views images or videos in a floating modal.            |
| `browser` | Renders HTML files in a floating modal as a preview.   |
| `format`  | Formats the C: drive with an optional quick format.    |

---

## Command Descriptions

### `help`

Displays a list of available commands in CKOS.

- **Usage**:  
  ```
  help
  ```

---

### `version`

Displays the current version of CKOS, as stored in the `settings.json` file.

- **Usage**:  
  ```
  version
  ```

- **Example Output**:  
  ```
  CKOS Version 0.1.0
  ```

---

### `dir`

Displays the contents of the current directory, including file names, sizes, total used space, and available free space. It also displays the volume name and tracks the free space, with a maximum of 150MB.

- **Usage**:  
  ```
  dir
  ```

- **Example Output**:
  ```
  Volume in drive C: is CKOS
  Directory of C:\

  manual.md           2.34 KB
  index.html          5.67 KB

  2 file(s)     8.01 KB used
  149.99 MB free
  ```

- **Notes**:  
  - The `dir` command calculates and displays the file sizes in human-readable formats (e.g., KB, MB).
  - Free space is dynamically calculated based on the total size of files in the virtual file system.

---

### `cd`

Changes the current directory to the specified directory.

- **Usage**:  
  ```
  cd <directory>
  ```

- **Example**:  
  ```
  cd projects
  ```

- **Notes**:  
  - You can use this command to navigate between different directories in the virtual file system.

---

### `ckcode`

Opens and edits HTML files using a built-in editor that features a toolbar for common HTML operations such as bold, italic, headings, and links. You can create new files if they don't exist.

- **Usage**:  
  ```
  ckcode <filename>
  ```

- **Example**:  
  ```
  ckcode index.html
  ```

- **Editor Features**:  
  - Toolbar buttons for common HTML tags (e.g., bold, italic, headings).
  - Files are saved back to the virtual file system, and optionally to `localStorage`.

---

### `read`

Reads and displays markdown (`.md`) files in a floating modal window. The markdown is rendered as HTML for easy reading.

- **Usage**:  
  ```
  read <filename>
  ```

- **Example**:  
  ```
  read manual.md
  ```

- **Notes**:  
  - This command opens the file in a modal window, and the markdown content is rendered into HTML.

---

### `view`

Views images or videos in a floating modal. Supported formats include `.webp` for images and `.mp4` for videos.

- **Usage**:  
  ```
  view <filename>
  ```

- **Example**:  
  ```
  view example.webp
  ```

- **Notes**:  
  - This command displays the image or video in a floating modal window for easy viewing.

---

### `browser`

Renders HTML files in a floating modal window as a preview, simulating how the HTML would appear in a web browser.

- **Usage**:  
  ```
  browser <filename>
  ```

- **Example**:  
  ```
  browser index.html
  ```

- **Notes**:  
  - This command is useful for previewing how HTML files will render in a browser without leaving the command-line environment.

---

### `format`

Formats the `C:` drive. This command supports a full format, which takes 5 minutes, or a quick format with the `/q` switch, which takes 15 seconds. After formatting, the user is prompted to enter a new volume name. During the format process, user input is disabled.

- **Usage**:  
  ```
  format C: [/q]
  ```

- **Options**:
  - `/q`: Quick format (15 seconds).
  
- **Example**:
  - **Normal Format**:
    ```
    format C:
    ```
    - Simulates a full format taking 5 minutes.
  
  - **Quick Format**:
    ```
    format C: /q
    ```
    - Simulates a quick format taking 15 seconds.

- **Process**:
  - **Step 1**: During the format, input from the user is disabled.
  - **Step 2**: A progress bar and status updates simulate the formatting process (e.g., "Writing tables...", "Lining up dominos...").
  - **Step 3**: After the format is completed, you will be prompted to enter a new volume name.
  - **Step 4**: The system resets the file system and reloads from `filesystem.json`, clearing local storage.

---

## Notes

- **Version Tracking**: CKOS includes version tracking, which is stored in `settings.json`. You can view the current version using the `version` command.
- **Local Storage**: CKOS uses local storage to persist files. The `format` command clears local storage and resets the file system to its initial state.
- **Floating Modal Windows**: Many commands, such as `read`, `view`, `ckcode`, and `browser`, open content in floating modal windows for a dynamic and modern interaction experience.

---

### Enjoy CKOS – an OS for the true Computer Knowledge Enthusiast!

---

This manual now includes the updated functionality such as the `version` command, formatted file sizes, and the enhanced behavior of the `format` command with user interaction.