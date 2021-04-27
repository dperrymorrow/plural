(async function () {
  const res = await fetch("https://www.instagram.com/pluralcollectivepdx/?__a=1");
  const data = await res.json();
  console.log(data);
}());
