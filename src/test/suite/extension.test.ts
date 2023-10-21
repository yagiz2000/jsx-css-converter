import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';
import { convertInlineStyleToCSS } from "../../converter";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
});
//can you write tests for the converter.ts file?
suite("Convert with style tag", () => {
  test("Convert style tag to css ends with double parentheses", () => {
    const css = convertInlineStyleToCSS(`style={{color: "red"}}`);
    assert.strictEqual(css, "color: red");
  });
  test("Convert style tag to css ends with single parentheses", () => {
    const css = convertInlineStyleToCSS(
      `style={{color: "red",display:"flex",justifyContent:"center"}}`
    );
    assert.strictEqual(
      css,
      "color: red; display: flex; justify-content: center"
    );
  });
  test("Convert style tag to css ends with quoted values", () => {
    const css = convertInlineStyleToCSS(
      `style={{color: 'red',display:'flex',justifyContent:'center'}}`
    );
    assert.strictEqual(
      css,
      "color: red; display: flex; justify-content: center"
    );
  });
  test("Convert without curly parentheses", () => {
    const css = convertInlineStyleToCSS(
      `color: 'red',display:'flex',justifyContent:'center',fontFamily:'Arial'`
    );
    assert.equal(
      css,
      "color: red; display: flex; justify-content: center; font-family: 'Arial'"
    );
  });
  test("Convert without curly parentheses and ends with comma", () => {
    const css = convertInlineStyleToCSS(
      `color: 'red',display:'flex',justifyContent:'center',fontFamily:'Arial',`
    );
    assert.equal(
      css,
      "color: red; display: flex; justify-content: center; font-family: 'Arial'"
    );
  });
});
