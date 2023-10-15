// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { convertInlineStyleToCSS } from "./converter";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  let disposable = vscode.commands.registerCommand(
    "jsx-css-converter.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user

      const cssCode: string = convertInlineStyleToCSS(`{
        display: "-webkit-box",
        maxHeight: "44px",
        fontSize: "14px",
        lineHeight: "19px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
      }`);

      vscode.window.showInformationMessage(`Converted CSS: ${cssCode}`);
    }
  );
  const disposable2 = vscode.commands.registerCommand(
    "jsx-css-converter.getSelectedValues",
    () => {
      const editor = vscode.window.activeTextEditor;
      const selectedtext = editor?.document.getText(editor.selection);
      const css = convertInlineStyleToCSS(selectedtext || "");

      vscode.window.showInformationMessage(css);
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
