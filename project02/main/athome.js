const url =
"https://s3-us-west-2.amazonaws.com/s.cdpn.io/316753/starbucks.json";

const makeCard = (product) => {
  let imageURL = product.assets.thumbnail.large.uri;
  if (!imageURL) {
    imageURL = product.assets.masterImage.uri;
  }
  let ret = `
  <div class="card">
  <img src="${imageURL}" />
  <p>${product.name}</p>`;
  ret +=` <p>${product.availability}</p>`
  for (const size in product.sizes)
  ret +=` <p>${product.sizes[size].sizeCode}</p>`
  ret +=` </div>`
  return ret;
};

const showMerch = (data) => {
  let starbucksHTML = "";
  // there are 4 menus (Drinks, Food, "at Home Coffee", and "Shopping Bags")
  //for (const menu of data.menus) {

  // Index drinks then index hot drinks
  starbucksHTML += `<h2>${data.menus[2].name}</h2>`;
  // each menu has a sub-category
  // for (const item of data.menus[0].children) {
  starbucksHTML += `<h3>${data.menus[2].children[0].name}</h3>`;
  // each sub-category has a list of sub-items
  for (const subItem of data.menus[2].children[0].children) {
    starbucksHTML += `<h4>${subItem.name}</h4><section class="cards">`;
    // each sub-item has variations
    for (const product of subItem.products) {
      // all of the product listings are inside of the sub-item's products list:
      starbucksHTML += makeCard(product);
    }
    starbucksHTML += `</section>`;
  }

  // }
  // at the very end of your loop, attach the HTML to the DOM:
  document.querySelector("#results").innerHTML = starbucksHTML;
  // }
};

// code that actually does the fetch:
fetch(url)
.then((response) => response.json())
.then(showMerch);
