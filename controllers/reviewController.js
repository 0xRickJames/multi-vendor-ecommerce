const Product = require("../Model/Product");
const Review = require("../Model/Review");
const serverError = require("../utils/serverError");

const addReview = (req, res) => {
  const { rating, comments } = req.body;
  Review.find({ productId: req.params.id, authorId: req.user._id })
    .then((reviewFind) => {
      if (!reviewFind.length) {
        Product.findOne({ _id: req.params.id })
          .then((product) => {
            const review = {
              authorId: req.user._id,
              productId: product._id,
              rating,
              comments,
            };
            Product.findOneAndUpdate(
              { _id: req.params.id },
              { reviewAppeared: product.reviewAppeared + 1 }
            )
              .then(() => {
                new Review(review)
                  .save()
                  .then(() => {
                    Review.find({ productId: req.params.id })
                      .populate("productId")
                      .populate("authorId")
                      .then((reviewRes) => {
                        let rating = 0;
                        reviewRes.forEach((el) => {
                          rating += el.rating;
                        });
                        const review = rating / reviewRes.length;
                        Product.findOneAndUpdate(
                          { _id: req.params.id },
                          { rating: review }
                        )
                          .then(() => {
                            res.status(200).json(reviewRes);
                          })
                          .catch(() => {
                            serverError(res);
                          });
                      })
                      .catch(() => {
                        serverError(res);
                      });
                  })
                  .catch(() => {
                    serverError(res);
                  });
              })
              .catch(() => {
                serverError(res);
              });
          })
          .catch(() => {
            serverError(res);
          });
      }
    })
    .catch(() => {
      serverError(res);
    });
};

const getReview = (req, res) => {
  Review.find({ productId: req.params.id })
    .populate("productId")
    .populate("authorId")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const getAllReview = (req, res) => {
  Review.find()
    .populate("productId")
    .populate("authorId")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  addReview,
  getReview,
  getAllReview,
};
