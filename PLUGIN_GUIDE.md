# Plugin Development Guide

## 1. Project Setup

1. **Install Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/en/download/). This includes npm, which is required for managing dependencies.
2. **Install TypeScript**: Run `npm install -g typescript` to install TypeScript globally.
3. **Install Figma Plugin Typings**: In your project directory, run `npm install --save-dev @figma/plugin-typings` to get the latest type definitions for the Figma Plugin API.

---

## 2. Project Structure

Your project should have the following structure:

```
code.ts         # Main TypeScript file containing the plugin logic
code.js         # Compiled JavaScript file from code.ts
manifest.json   # Configuration file for the plugin
ui.html         # HTML file for the plugin's user interface
ui.css          # CSS file for styling the UI
package.json    # npm configuration file for managing dependencies and scripts
tsconfig.json   # TypeScript configuration file
```

---

## 3. Writing the Plugin Logic

- Use `figma.showUI()` to display the plugin's UI.
- Use `figma.ui.onmessage` to handle messages sent from the UI.

Example:
```typescript
figma.showUI(__html__, { width: 600, height: 800 });
figma.ui.onmessage = async (data) => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  const { navbarType, color, theme, menuItems } = data;
  // Plugin logic here
  figma.closePlugin();
};
```

---

## 4. Creating the UI

- The `ui.html` file defines the structure of the plugin's interface.
- Use standard HTML elements like `<select>`, `<input>`, and `<button>` for user inputs.
- Use JavaScript in the `<script>` tag to handle user interactions and send data to the plugin logic.

---

## 5. Configuring the Plugin

- The `manifest.json` file specifies the plugin's metadata:
  - `id`: Unique identifier for the plugin.
  - `name`: Display name of the plugin.
  - `main`: Entry point for the plugin logic.
  - `ui`: Path to the UI file.
  - `editorType`: Specifies compatibility with Figma or FigJam.

Example:
```json
{
  "id": "nav-bar-genrator",
  "name": "Navbar Generator",
  "api": "1.0.0",
  "main": "code.js",
  "ui": "ui.html",
  "editorType": ["figma", "figjam"]
}
```

---

## 6. Building the Plugin

- Use the `tsconfig.json` file to configure TypeScript compilation.
- Run `npm run build` to compile `code.ts` into `code.js`.

---

## 7. Testing the Plugin

1. Open Figma and go to `Plugins > Development > Import Plugin from Manifest...`.
2. Select the `manifest.json` file to load your plugin.
3. Test the plugin by interacting with the UI and verifying the output in Figma.

---

## 8. Additional Notes

- **Styling**: Use `ui.css` for custom styles.
- **Linting**: Use ESLint to maintain code quality (`npm run lint`).
- **Preview**: The UI includes a live preview of the navbar based on user inputs.