/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const Product = require("../models/product.js");

module.exports = async (req, res, next) => {
  let products = await Product.find({}).sort('sku');

  let results = products.map((prod) => {
    return {
      id: prod._id,
      sku: prod.sku,
      description: prod.description,
      image: prod.imagePath,
      price: prod.price,
      quantity: prod.quantityInStock
    };
  });

  res.render("displayProductsView", {
    title: "List of Products",
    data: results,
    user: res.locals.user
  });
};
