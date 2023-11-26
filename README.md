# jsx-css-converter - VSCode Extension

## Overview

This Visual Studio Code extension provides a convenient tool to convert inline JSX style CSS to standard CSS code. It simplifies the process of extracting and transforming inline styles within JSX components, making your styling workflow more efficient.

## Features

- **Inline Style to CSS Conversion:** Quickly convert inline styles within JSX components to standard CSS code.

- **Special Case Handling:** Handle special cases intelligently, providing meaningful and accurate CSS output.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or use the keyboard shortcut `Ctrl+Shift+X`.
3. Search for "jsx-css-converter".
4. Click the Install button for the extension publisged by yagizcer.

## Usage

1. Open a JSX file containing inline styles.
2. Select the JSX code with inline styles.
3. Right-click on the selected code.
4. Choose the "Convert jsx styles to css" option from the context menu.
5. The converted CSS code will copied to your clipboard.

## Example

```jsx
// Start highligthing whatever you want (careful to include style data)
const MyComponent = () => (
  <div style={{ backgroundColor: "blue", fontSize: "16px" }}>Hello World!</div>
);
```

```css
/* Copied to Your Clipboard*/
background-color: blue;
font-size: 16px;
```
