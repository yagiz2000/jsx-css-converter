import * as json5 from "json5";

function convertInlineStyleToCSS(selection: string): string {
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
