const { GenericDALIFrame } = require("./GenericDALIFrame");

class DALI24SpecialFrame extends GenericDALIFrame {
  constructor(data) {
    super(24, data);
    if (!this.isSpecial()) {
      throw new Error("DALI frame is not a special frame");
    }
  }
}

exports.DALI24SpecialFrame = DALI24SpecialFrame;
