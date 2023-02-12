const { GenericDALIFrame } = require("./GenericDALIFrame");

class DALIDirectArcPower extends GenericDALIFrame {
  constructor(data) {
    super(16, data);
    if (!this.isDirectArcPower()) {
      throw new Error("DALI frame is not a direct arc power frame");
    }
  }
}

exports.DALIDirectArcPower = DALIDirectArcPower;
