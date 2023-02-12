const { GenericDALIFrame } = require("./GenericDALIFrame");

class DALI16ForwardFrame extends GenericDALIFrame {
  constructor(data) {
    super(16, data);
    if (!this.isAddressed()) {
      throw new Error("DALI frame is not an addressed frame");
    }
  }
}

exports.DALI16ForwardFrame = DALI16ForwardFrame;
