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

  res.format({
    "application/json": () => {
      res.type("json");
      res.json(results);
    },
    "application/xml": () => {
      let xmlProducts = "";
      for (const result of results) {
        xmlProducts +=
          "<product>\n" +
          "<id>" +
          result.id +
          "</id>\n" +
          "<sku>" +
          result.sku +
          "</sku>\n" +
          "<description>" +
          result.description +
          "</description>\n" +
          "<image>" +
          result.image +
          "</image>\n" +
          "<price>" +
          result.price +
          "</price>\n" +
          "<quantity>" +
          result.quantity +
          "</quantity>\n" +
          "</product>\n";
      }
      res.type("application/xml");
      res.send(
        '<?xml version="1.0"?>\n' + "<products>\n" + xmlProducts + "</products>"
      );
    },
    "text/html": () => {
      res.render("displayStoreView", {
        title: "Storefront",
        data: results,
        query: req.query,
      });
    },
  });
};
