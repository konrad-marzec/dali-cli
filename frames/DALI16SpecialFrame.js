const { GenericDALIFrame } = require("./GenericDALIFrame");

class DALI16SpecialFrame extends GenericDALIFrame {
  constructor(data) {
    super(16, data);
    if (!this.isSpecial()) {
      throw new Error("DALI frame is not a special frame");
    }
  }
}

exports.DALI16SpecialFrame = DALI16SpecialFrame;
