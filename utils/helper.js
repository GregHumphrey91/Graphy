const helper = {
  asyncHandler(cb) {
    try {
      return async (req, res, next) => {
        await cb(req, res, next);
      };
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

module.exports = helper;
