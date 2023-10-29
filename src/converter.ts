import * as json5 from "json5";
import { StyleObject } from "./data/types";
import { SpecialCaseProperties } from "./data/enums";

const convertInlineStyleToCSS = (selection: string): string => {
  const styleString = extractStyleString(selection);

  const styleObject = json5.parse<StyleObject>(styleString);

  const css = Object.keys(styleObject)
    .map((property: string) => {
      const cssProperty = property.replace(
        /[A-Z]/g,
        (match) => `-${match.toLowerCase()}`
      );
      let value;
      if (property === SpecialCaseProperties.fontFamily) {
        value = `'${styleObject[property]}'`;
      } else {
        value = styleObject[property];
      }
      return `${cssProperty}: ${value}`;
    })
    .join("; ");

  return css;
};

const extractStyleString = (selection: string): string => {
  selection = selection.trim();
  if (selection.includes("style=")) {
    const styleMatch = selection.match(/style={\{([^}]*)\}}/) as string[];
    return `{${styleMatch[1].replaceAll(`\n`, "").trim()}}`;
  }
  if (!selection.includes("{")) {
    selection = selection.replaceAll(`\n`, "").trim();
    return `{${selection}}`;
  }
  return selection;
};
export { convertInlineStyleToCSS };
