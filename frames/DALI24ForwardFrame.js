const { GenericDALIFrame } = require("./GenericDALIFrame");

class DALI24ForwardFrame extends GenericDALIFrame {
  constructor(data) {
    super(24, data);
    if (!this.isAddressed()) {
      throw new Error("DALI frame is not an addressed frame");
    }
  }
}

exports.DALI24ForwardFrame = DALI24ForwardFrame;
