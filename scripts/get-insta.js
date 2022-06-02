require("dotenv").config();
const Instagram = require("instagram-web-api");
const path = require("path");
const fs = require("fs");
const download = require("image-downloader");

const imageDir = path.join(__dirname, "../docs/images");
const dest = path.join(__dirname, "../_src/data/instagram.json");
const { INSTA_USERNAME, INSTA_PASSWORD } = process.env;

console.log(INSTA_USERNAME, INSTA_PASSWORD);

const client = new Instagram({
  username: INSTA_USERNAME,
  password: INSTA_PASSWORD,
});

async function run() {
  await client.login();

  const res = await client.getPhotosByUsername({
    username: "pluralcollectivepdx",
  });
  const posts = res.user.edge_owner_to_timeline_media.edges
    .filter((post) => !post.is_video)
    .map((post) => ({
      img: `images/instagram/${path.basename(post.node.thumbnail_src)}`,
      cdn: post.node.thumbnail_src,
      url: `https://www.instagram.com/p/${post.node.shortcode}`,
    }));

  await Promise.all(
    posts.map((post) =>
      download.image({ url: post.cdn, dest: `${imageDir}/instagram` })
    )
  );
  fs.writeFileSync(dest, JSON.stringify(posts, null, 2));
}

run();
