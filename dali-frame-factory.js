const { DALI16ForwardFrame } = require("./frames/DALI16ForwardFrame");
const { DALI16SpecialFrame } = require("./frames/DALI16SpecialFrame");
const { DALI24ForwardFrame } = require("./frames/DALI24ForwardFrame");
const { DALI24SpecialFrame } = require("./frames/DALI24SpecialFrame");
const { DALIDirectArcPower } = require("./frames/DALIDirectArcPower");
const { DALIEventMessage } = require("./frames/DALIEventMessage");
const { GenericDALIFrame } = require("./frames/GenericDALIFrame");

function buildDALIFrame(bits, data) {
  let frame = new GenericDALIFrame(bits, data);

  if (bits === 8) {
    return new DALIAnswer(data[0]);
  }

  if (bits === 16) {
    if (frame.isAddressed()) {
      if (frame.isDirectArcPower()) {
        return new DALIDirectArcPower(data);
      }

      return new DALI16ForwardFrame(data);
    }

    if (frame.isSpecial()) {
      return new DALI16SpecialFrame(data);
    }
  }

  if (bits === 24) {
    if (frame.isAddressed()) {
      return new DALI24ForwardFrame(data);
    }

    if (frame.isSpecial()) {
      return new DALI24SpecialFrame(data);
    }

    if (frame.isEventMessage()) {
      return new DALIEventMessage(data);
    }
  }

  return frame;
}

exports.buildDALIFrame = buildDALIFrame;
