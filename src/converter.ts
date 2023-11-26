import * as json5 from "json5";
import { StyleObject } from "./data/types";
import { SpecialCaseProperties } from "./data/enums";

const convertInlineStyleToCSS = (selection: string): string => {
  try {
    const styleString = extractStyleString(selection);

    const styleObject = json5.parse<StyleObject>(styleString);

    const css = Object.keys(styleObject)
      .map((property: string) => {
        const cssProperty = property.replace(
          /[A-Z]/g,
          (match) => `-${match.toLowerCase()}`
        );
        let value;
        if (
          Object.values(SpecialCaseProperties).includes(
            property as SpecialCaseProperties
          )
        ) {
          value = getDerivedValueForSpecialCases(
            property,
            styleObject[property]
          );
        } else {
          value = styleObject[property];
        }
        return `${cssProperty}: ${value}`;
      })
      .join("; ");

    return css;
  } catch (error) {
    throw new Error("Invalid style");
  }
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

const getDerivedValueForSpecialCases = (
  property: string,
  value: string
): string | undefined => {
  if (property === SpecialCaseProperties.fontFamily) {
    if (value.includes("!important")) {
      const [fontFamily] = value.split(" ");
      return `'${fontFamily}' !important`;
    } else {
      return `'${value}'`;
    }
  }
};
export { convertInlineStyleToCSS };
