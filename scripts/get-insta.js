const Instagram = require("instagram-web-api");
const path = require("path");
const fs = require("fs");
const download = require("image-downloader");

const imageDir = path.join(__dirname, "../docs/images");
const dest = path.join(__dirname, "../_src/data/instagram.json");
const { instaUser, instaPassword } = process.env;

console.log(instaUser, instaPassword);

const client = new Instagram({ username: instaUser, password: instaPassword });

async function run() {
  try {
    await client.login();
  } catch (err) {
    throw err;
  }
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
    posts.map((post) => download.image({ url: post.cdn, dest: `${imageDir}/instagram` })),
  );
  fs.writeFileSync(dest, JSON.stringify(posts, null, 2));
}

run();
