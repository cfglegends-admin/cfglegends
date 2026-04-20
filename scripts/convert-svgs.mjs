/**
 * Converts SVG files from public/icons/ into React (TSX) components
 * in components/icons/. Replaces all dark fill colors with "currentColor"
 * and converts SVG attributes to JSX-compatible camelCase.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "fs";
import { join, basename } from "path";

const INPUT_DIR = join(process.cwd(), "public/icons");
const OUTPUT_DIR = join(process.cwd(), "components/icons");

mkdirSync(OUTPUT_DIR, { recursive: true });

// Convert kebab-case SVG attributes to JSX camelCase
const ATTR_MAP = {
  "clip-path": "clipPath",
  "clip-rule": "clipRule",
  "fill-opacity": "fillOpacity",
  "fill-rule": "fillRule",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-miterlimit": "strokeMiterlimit",
  "stroke-opacity": "strokeOpacity",
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-weight": "fontWeight",
  "text-anchor": "textAnchor",
  "text-decoration": "textDecoration",
  "dominant-baseline": "dominantBaseline",
  "alignment-baseline": "alignmentBaseline",
  "xmlns:xlink": "xmlnsXlink",
  "xlink:href": "xlinkHref",
  "xml:space": "xmlSpace",
  preserveaspectratio: "preserveAspectRatio",
};

function toPascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

function convertSvgToJsx(svgContent) {
  let jsx = svgContent;

  // Replace all dark/near-black fill colors with currentColor
  jsx = jsx.replace(/fill="#[0-9a-fA-F]{6}"/g, (match) => {
    const hex = match.match(/#([0-9a-fA-F]{6})/)[1];
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // If the color is dark (close to black), replace with currentColor
    if (r < 40 && g < 40 && b < 40) {
      return 'fill="currentColor"';
    }
    return match;
  });

  // Convert SVG attributes to JSX camelCase
  for (const [svgAttr, jsxAttr] of Object.entries(ATTR_MAP)) {
    const regex = new RegExp(`(\\s)${svgAttr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=`, "g");
    jsx = jsx.replace(regex, `$1${jsxAttr}=`);
  }

  // Remove xmlns:xlink (not needed in JSX)
  jsx = jsx.replace(/\s+xmlnsXlink="[^"]*"/g, "");

  // Remove zoomAndPan attribute
  jsx = jsx.replace(/\s+zoomAndPan="[^"]*"/g, "");

  // Remove version attribute
  jsx = jsx.replace(/\s+version="[^"]*"/g, "");

  // Remove fixed width/height so SVGs scale via className
  jsx = jsx.replace(/\s+width="[^"]*"/g, "");
  jsx = jsx.replace(/\s+height="[^"]*"/g, "");

  // Add {...props} spread to the <svg> element, and aria-hidden
  jsx = jsx.replace(
    "<svg ",
    "<svg aria-hidden=\"true\" {...props} "
  );

  return jsx;
}

const files = readdirSync(INPUT_DIR).filter((f) => f.endsWith(".svg"));
const exports = [];

for (const file of files) {
  const name = toPascalCase(basename(file, ".svg"));
  const svgContent = readFileSync(join(INPUT_DIR, file), "utf-8").trim();
  const jsxContent = convertSvgToJsx(svgContent);

  const componentCode = `import type { SVGProps } from "react";

export function ${name}Icon(props: SVGProps<SVGSVGElement>) {
  return (
    ${jsxContent}
  );
}
`;

  const outFile = `${basename(file, ".svg")}.tsx`;
  writeFileSync(join(OUTPUT_DIR, outFile), componentCode);
  exports.push({ name: `${name}Icon`, file: `./${basename(file, ".svg")}` });
  console.log(`✓ ${file} → ${outFile} (${name}Icon)`);
}

// Generate barrel index
const indexContent =
  exports.map((e) => `export { ${e.name} } from "${e.file}";`).join("\n") +
  "\n";
writeFileSync(join(OUTPUT_DIR, "index.ts"), indexContent);
console.log(`\n✓ Generated index.ts with ${exports.length} exports`);
