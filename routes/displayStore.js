/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const Product = require("../models/product.js");

module.exports = async (req, res, next) => {
  let desc = req.query.desc
    ? {
        $or: [
          { description: { $regex: req.query.desc, $options: "i" } },
          { sku: { $regex: req.query.desc, $options: "i" } },
        ],
      }
    : {};

  let maxPrice = req.query.maxPrice
    ? { price: { $lte: req.query.maxPrice } }
    : {};
  let minPrice = req.query.minPrice
    ? { price: { $gte: req.query.minPrice } }
    : {};

  if (req.query.minPrice) {
    query = { price: { $gte: req.query.minPrice } };
  }

  let products = await Product.find(desc)
    .and(maxPrice)
    .and(minPrice)
    .sort("sku");

  let results = products.map((prod) => {
    return {
      id: prod._id,
      sku: prod.sku,
      description: prod.description,
      image: prod.imagePath,
      price: prod.price,
      quantity: prod.quantityInStock,
    };
  });

  res.render("displayStoreView", {
    title: "Storefront",
    data: results,
    user: res.locals.user,
    isAdmin: res.locals.isAdmin,
    query: req.query

  });
};
