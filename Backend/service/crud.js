const uniqid = require("uniqid");
const products = require("../model/products");
const fs = require("fs");

exports.addProduct = (req, res) => {
  let data = {
    name: req.body.name,
    price: parseInt(req.body.price),
    description: req.body.description,
  };

  if (req.files) {
    let file = req.files.photo;
    let extension = file.name.split(".");
    extension = extension[extension.length - 1];
    let filename = `${uniqid()}.${extension}`;

    file.mv(`./assets/images/${filename}`, function (err) {
      if (err) console.log(err);
    });

    data.image_filename = filename;
  }

  products
    .insert(data)
    .then(() => {
      res.json({
        success: true,
      });
    })
    .catch(() => {
      res.json({
        success: false,
        message: "Insert product failed.",
      });
    });
};

exports.getProducts = (req, res) => {
  products
    .getProducts(req.params.product_id)
    .then((result) => {
      res.json(result);
    })
    .catch(() => {
      res.json({});
    });
};

exports.delete = (req, res) => {
  products.getProducts(req.params.product_id).then((result) => {
    // fs.unlinkSync(`./assets/images/${result[0].image_filename}`);

    products
      .delete(req.params.product_id)
      .then(() => {
        products.getProducts().then((result) => {
          res.json({
            success: true,
            products: result,
          });
        });
      })
      .catch(() => {
        res.json({
          success: false,
          message: "Failed to delete product.",
        });
      });
  });
};

exports.edit = (req, res) => {
  let data = {
    name: req.body.name,
    price: parseInt(req.body.price),
    description: req.body.description,
  };

  if (req.files) {
    products.getProducts(req.params.product_id).then((result) => {
      fs.unlinkSync(`./assets/images/${result[0].image_filename}`);
    });

    let file = req.files.product_image;
    let extension = file.name.split(".");
    extension = extension[extension.length - 1];
    let filename = `${uniqid()}.${extension}`;

    file.mv(`./assets/images/${filename}`, function (err) {
      if (err) console.log(err);
    });

    data.image_filename = filename;
  }

  products.update(data, req.params.product_id).then(() => {
    res.json({
      success: true,
    });
  });
};
