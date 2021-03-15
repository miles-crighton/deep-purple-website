const del = require("del");
const pug = require("pug");
const path = require("path");
const util = require("util");
const fs = require("fs");
const glob = require("glob");
const prettier = require("prettier");
const copyFilePromise = util.promisify(fs.copyFile);

let rawColors = fs.readFileSync("src/colors.json");
let colors = JSON.parse(rawColors);
console.log(colors);

const globPromise = (fileGlob, cb) => {
    return new Promise((res, rej) => {
        glob(fileGlob, (err, files) => {
            if (!err) {
                cb(files);
                res();
            }
            rej();
        });
    });
};

del.sync(["dist/*"]);

// // // Compile template.pug, and render a set of data
// console.log(
//     pug.renderFile("src/index.pug", {
//         name: "Timothy",
//     })
// );

let pugFile = pug.renderFile("src/index.pug", {
    colors: colors.colors,
});

function formatHtml(html) {
    return prettier.format(html, {
        parser: "html",
    });
}

fs.writeFileSync("dist/index.html", formatHtml(pugFile));

async function copyFiles(srcDir, destDir, files) {
    console.log(copyFiles);
    let allFiles = [];

    await Promise.all(
        files.map((file) => {
            const pathGlob = path.join(srcDir, file);
            return globPromise(
                pathGlob,
                (files) => (allFiles = [...allFiles, ...files])
            );
        })
    );

    console.log(allFiles, files);

    await Promise.all(
        allFiles.map((f) => {
            const filename = path.basename(f);
            return copyFilePromise(path.join(f), path.join(destDir, filename));
        })
    );
}

copyFiles("src", "dist", ["*.css", "*.json", "*.js"])
    .then(() => {
        console.log("done");
    })
    .catch((err) => {
        console.log(err);
    });
