import * as fs from 'fs';
import { ImageMetadata } from "./types";

const sourceImageDir = "art/img";
const htmlImageDir = "assets/img/art";

console.log(`Cleaning destination art directory ${htmlImageDir}`);
const oldImages = fs.readdirSync(htmlImageDir);
oldImages.forEach(i => fs.unlinkSync(htmlImageDir + "/" + i));

console.log("Reading metadata file")
const fileContents = fs.readFileSync("art/info.json");
const imageInfo = JSON.parse(fileContents.toString('utf8')) as ImageMetadata[];

console.log(`Found ${imageInfo.length} images`);

const copyImage = (imageName: string) => {
    fs.copyFileSync(sourceImageDir + "/" + imageName, htmlImageDir + "/" + imageName);
}

const thumbnails = imageInfo.map(image => {

    copyImage(image.file);

    const title = image.name && `<h5 class="card-title">${image.name}</h5>`;
    const originalPrice = image.originalPrice == "sold" || image.originalPrice == "nfs"
        ? "<span class=\"not-available text-muted\">Original</span>"
        : `<span>Original: ${image.originalPrice}</span>`;

    const printPrice = image.printPrice && `<span>Print: ${image.printPrice}</span>`;

    return `
    <div class="col-md-4">
      <div class="card mb-4 box-shadow">
        <img class="card-img-top" src="${htmlImageDir + "/" + image.file}" alt="${image.name}">
        <div class="card-body">
          ${title}
          <p class="card-text">${image.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            ${originalPrice}
            ${printPrice}
            <small class="text-muted">${image.size}</small>
          </div>
        </div>
      </div>
    </div>
    `;
});

console.log("Generating template");
const templateContents = fs.readFileSync("index.template.html").toString('utf-8');
const html = templateContents.replace("<!-- IMAGEDATA -->", thumbnails.join("\n"));

fs.writeFileSync("index.html", html);

