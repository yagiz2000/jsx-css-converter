import * as vscode from "vscode";
import { convertInlineStyleToCSS } from "./converter";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "jsx-css-converter.getSelectedValues",
    () => {
      try {
        const editor = vscode.window.activeTextEditor;
        const selectedtext = editor?.document.getText(
          editor.selection
        ) as string;
        const css = convertInlineStyleToCSS(selectedtext);
        if (css) {
          vscode.window.showInformationMessage(
            "Css converted and copied to clipboard"
          );
          vscode.env.clipboard.writeText(css);
        }
      } catch (error) {
        vscode.window.showErrorMessage(
          "Higlighted content is not a valid style object. Please try again."
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
