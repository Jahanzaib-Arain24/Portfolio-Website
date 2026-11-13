const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function generate() {
  const svgPath = path.join(__dirname, "..", "public", "favicon.svg");
  const svgBuffer = fs.readFileSync(svgPath);

  // Generate PNGs at multiple resolutions
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((size) =>
      sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );

  // Also generate 180x180 Apple touch icon and 32x32 png
  const appleTouch = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, "..", "public", "apple-touch-icon.png"), appleTouch);
  fs.writeFileSync(path.join(__dirname, "..", "public", "favicon-32x32.png"), pngBuffers[1]);

  // Construct standard multi-resolution ICO file
  const count = sizes.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(count, 4); // Count of images

  const dirEntries = [];
  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(dirEntrySize);

    entry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buf.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset of image data

    dirEntries.push(entry);
    offset += buf.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...pngBuffers]);

  // Write to both public and src/app
  fs.writeFileSync(path.join(__dirname, "..", "public", "favicon.ico"), icoBuffer);
  fs.writeFileSync(path.join(__dirname, "..", "src", "app", "favicon.ico"), icoBuffer);

  console.log("FAVICON_ICO_GENERATED_SUCCESSFULLY: Size =", icoBuffer.length, "bytes");
}

generate().catch(console.error);

