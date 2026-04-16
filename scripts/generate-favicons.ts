import sharp from "sharp";

const SQUARE_SOURCE = "public/assets/logo.png";
const WIDE_SOURCE = "public/assets/logo-wide.png";

async function generate() {
  await sharp(SQUARE_SOURCE)
    .resize(180, 180, { fit: "contain", background: { r: 10, g: 10, b: 10, alpha: 1 } })
    .png()
    .toFile("public/apple-touch-icon.png");

  await sharp(SQUARE_SOURCE)
    .resize(32, 32, { fit: "contain", background: { r: 10, g: 10, b: 10, alpha: 1 } })
    .png()
    .toFile("public/favicon-32x32.png");

  await sharp(SQUARE_SOURCE)
    .resize(16, 16, { fit: "contain", background: { r: 10, g: 10, b: 10, alpha: 1 } })
    .png()
    .toFile("public/favicon-16x16.png");

  await sharp(WIDE_SOURCE)
    .resize(1200, 800, { fit: "cover" })
    .png({ quality: 90 })
    .toFile("public/og.png");

  console.log("Favicons + OG image generated.");
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
