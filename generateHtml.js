"use strict";
exports.__esModule = true;
var fs = require("fs");
var sourceImageDir = "art/img";
var htmlImageDir = "assets/img/art";
console.log("Cleaning destination art directory " + htmlImageDir);
var oldImages = fs.readdirSync(htmlImageDir);
oldImages.forEach(function (i) { return fs.unlinkSync(htmlImageDir + "/" + i); });
console.log("Reading metadata file");
var fileContents = fs.readFileSync("art/info.json");
var imageInfo = JSON.parse(fileContents.toString('utf8'));
console.log("Found " + imageInfo.length + " images");
var copyImage = function (imageName) {
    fs.copyFileSync(sourceImageDir + "/" + imageName, htmlImageDir + "/" + imageName);
};
var thumbnails = imageInfo.map(function (image) {
    copyImage(image.file);
    var title = image.name && "<h5 class=\"card-title\">" + image.name + "</h5>";
    var originalPrice = image.originalPrice == "sold" || image.originalPrice == "nfs"
        ? "<span class=\"not-available text-muted\">Original</span>"
        : "<span>Original: " + image.originalPrice + "</span>";
    var printPrice = image.printPrice && "<span>Print: " + image.printPrice + "</span>";
    return "\n    <div class=\"col-md-4\">\n      <div class=\"card mb-4 box-shadow\">\n        <img class=\"card-img-top\" src=\"" + (htmlImageDir + "/" + image.file) + "\" alt=\"" + image.name + "\">\n        <div class=\"card-body\">\n          " + title + "\n          <p class=\"card-text\">" + image.description + "</p>\n          <div class=\"d-flex justify-content-between align-items-center\">\n            " + originalPrice + "\n            " + printPrice + "\n            <small class=\"text-muted\">" + image.size + "</small>\n          </div>\n        </div>\n      </div>\n    </div>\n    ";
});
console.log("Generating template");
var templateContents = fs.readFileSync("index.template.html").toString('utf-8');
var html = templateContents.replace("<!-- IMAGEDATA -->", thumbnails.join("\n"));
fs.writeFileSync("index.html", html);
