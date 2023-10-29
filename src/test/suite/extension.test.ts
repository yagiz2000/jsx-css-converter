import * as assert from "assert";
import { convertInlineStyleToCSS } from "../../converter";

suite("Multiple Conversion Test Suites ", () => {
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

  test("Convert style tag wrapped by HTML tags", () => {
    const css = convertInlineStyleToCSS(
      `<div
      style={{color: "red",display:"flex",justifyContent:"center",fontFamily:'Arial',}}
    ></div>`
    );
    assert.equal(
      css,
      "color: red; display: flex; justify-content: center; font-family: 'Arial'"
    );
  });
  test("Convert with !important keys", () => {
    const css = convertInlineStyleToCSS(
      `<div
      style={{color: "red",display:"flex",justifyContent:"center !important",fontFamily:'Arial !important',}}
    ></div>`
    );
    assert.equal(
      css,
      "color: red; display: flex; justify-content: center !important; font-family: 'Arial' !important"
    );
  });
});
