import * as json5 from "json5";

function convertInlineStyleToCSS(selection: string): string {
  selection = selection.trim();
  if (selection.includes("style=")) {
    selection = selection.split("style=")[1].slice(1, -1);
  }
  const styleObject = json5.parse(selection);

  const css = Object.keys(styleObject)
    .map((property) => {
      const cssProperty = property.replace(
        /[A-Z]/g,
        (match) => `-${match.toLowerCase()}`
      );
      return `${cssProperty}: ${styleObject[property]}`;
    })
    .join("; ");

  return css;
}
export { convertInlineStyleToCSS };
