const ejs = require("ejs");
const stylus = require("stylus");
const path = require("path");
const fs = require("fs");
const instagram = require("../_src/data/instagram.json");
const grid = require("../_src/data/grid.json");
const bios = require("../_src/data/bios.json");
const workshops = require("../_src/data/workshops.json");
const meta = require("./meta.json");

const source = path.join(__dirname, "../_src/");
const dest = path.join(__dirname, "../docs/");
const files = ["index.ejs", "workshops.ejs", "about.ejs"];

const stylusFile = path.join(source, "styles.stylus");
const cssFile = path.join(dest, "styles.css");

meta.version += 1;

files.forEach((fileName) => {
  ejs.renderFile(
    path.join(source, fileName),
    {
      instagram,
      grid,
      bios,
      workshops,
      meta,
    },
    {},
    (err, str) => {
      if (err) {
        throw err;
      }
      fs.writeFileSync(path.join(dest, fileName.replace(".ejs", ".html")), str);
    },
  );
});

workshops.forEach((workshop) => {
  ejs.renderFile(
    path.join(source, "workshop-details.ejs"),
    {
      workshop,
      meta,
    },
    {},
    (err, str) => {
      if (err) {
        throw err;
      }
      fs.writeFileSync(path.join(dest, `${workshop.slug}.html`), str);
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

fs.writeFileSync(
  path.join(__dirname, "meta.json"),
  JSON.stringify(meta, null, 2),
);
