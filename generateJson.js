"use strict";
exports.__esModule = true;
var fs = require("fs");
var images = fs.readdirSync('art/img').filter(function (i) { return i !== ".DS_Store"; });
console.log("Found " + images.length + " images");
var data = images.map(function (img) {
    return {
        name: "",
        description: "",
        file: img,
        originalPrice: "$400",
        printPrice: "$280",
        size: "14\" x 17\""
    };
});
fs.writeFileSync("art/info.json", JSON.stringify(data, undefined, 2));
