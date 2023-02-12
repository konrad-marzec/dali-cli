function calcOctetCount(bits) {
  return (bits + (8 - 1)) >> 3;
}

class GenericDALIFrame {
  constructor(bits, data) {
    this.bits = bits;
    this.data = data;

    if (data.length !== calcOctetCount(bits)) {
      throw new Error("Data array length and bit count don't match");
    }
  }

  get payload() {
    return {
      type: "daliFrame",
      data: {
        line: 0,
        numberOfBits: this.bits,
        mode: {
          priority: 3,
          sendTwice: false,
          waitForAnswer: false,
        },
        daliData: this.data,
      },
    };
  }

  isShortAddressed() {
    if (this.bits === 16) {
      return (this.data[0] & 0x80) === 0;
    }

    if (this.bits === 24) {
      return (this.data[0] & 0x81) === 0x01;
    }

    return false;
  }

  isGroupAddressed() {
    if (this.bits === 16) {
      return (this.data[0] & 0xe0) === 0x80;
    }

    if (this.bits === 24) {
      return (this.data[0] & 0xc1) === 0x81;
    }

    return false;
  }

  isBroadcastUnaddrAddressed() {
    if (this.bits === 16) {
      return (this.data[0] & 0xfc) === 0xfc;
    }

    if (this.bits === 24) {
      return (this.data[0] & 0xfd) === 0xfd;
    }

    return false;
  }

  isBroadcastAddressed() {
    if (this.bits === 16) {
      return (this.data[0] & 0xfe) === 0xfe;
    }

    if (this.bits === 24) {
      return (this.data[0] & 0xff) === 0xff;
    }

    return false;
  }

  isAddressed() {
    return (
      this.isShortAddressed() ||
      this.isGroupAddressed() ||
      this.isBroadcastUnaddrAddressed() ||
      this.isBroadcastAddressed()
    );
  }

  isDirectArcPower() {
    return this.bits === 16 && !(this.data[0] & 0x01) && this.isAddressed();
  }

  isSpecial() {
    if (this.bits === 16) {
      if (this.data[0] >= 0xa0 && this.data[0] <= 0xcb) {
        return true;
      }
    }

    if (this.bits === 24) {
      if ((this.data[0] & 0xe1) === 0xc1) {
        return true;
      }
    }

    return false;
  }

  isEventMessage() {
    return this.bits === 24 && !(this.data[0] & 0x01);
  }
}

exports.GenericDALIFrame = GenericDALIFrame;
