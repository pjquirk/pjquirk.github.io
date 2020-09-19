import * as fs from 'fs';
import { ImageMetadata } from './types';

const images = fs.readdirSync('art/img').filter(i => i !== ".DS_Store");
console.log(`Found ${images.length} images`);

const data = images.map(img => {
    return {
        name: "",
        description: "",
        file: img,
        originalPrice: "$400",
        printPrice: "$280",
        size: "14\" x 17\""
    } as ImageMetadata
})

fs.writeFileSync("art/info.json", JSON.stringify(data, undefined, 2))