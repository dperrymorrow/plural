const ejs = require("ejs");
const stylus = require("stylus");
const path = require("path");
const fs = require("fs");
const instagram = require("../_src/data/instagram.json");
const grid = require("../_src/data/grid.json");
const bios = require("../_src/data/bios.json");
const experiences = require("../_src/data/experiences.json");
const featured = require("../_src/data/featured.json");

const source = path.join(__dirname, "../_src/");
const dest = path.join(__dirname, "../docs/");
const files = ["index.ejs", "workshops.ejs", "about.ejs"];

const stylusFile = path.join(source, "styles.stylus");
const cssFile = path.join(dest, "styles.css");

files.forEach((fileName) => {
  ejs.renderFile(
    path.join(source, fileName),
    {
      instagram,
      grid,
      bios: bios.sort((a, b) => a.name.localeCompare(b.name)),
      experiences,
      featured,
    },
    {},
    (err, str) => {
      fs.writeFileSync(path.join(dest, fileName.replace(".ejs", ".html")), str);
    },
  );
});

stylus.render(
  fs.readFileSync(stylusFile, "utf-8"),
  { filename: cssFile },
  (err, css) => {
    if (err) throw err;
    fs.writeFileSync(path.join(dest, "styles.css"), css);
  },
);
