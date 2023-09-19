function convertInlineStyleToCSS(styleObject: any): string {
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
