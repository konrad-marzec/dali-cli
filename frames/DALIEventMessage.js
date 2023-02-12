const { GenericDALIFrame } = require("./GenericDALIFrame");

class DALIEventMessage extends GenericDALIFrame {
  constructor(data) {
    super(24, data);
    if (!this.isEventMessage()) {
      throw new Error("DALI frame is not an event message");
    }
  }

  get eventScheme() {
    if ((this.data[0] & 0xc0) === 0x80 && this.data[1] & 0x80) {
      return "Instance";
    }

    if (!(this.data[0] & 0x80) && !(this.data[1] & 0x80)) {
      return "Device";
    }

    if (!(this.data[0] & 0x80) && this.data[1] & 0x80) {
      return "Device/Instance";
    }

    if ((this.data[0] & 0xc0) === 0x80 && !(this.data[1] & 0x80)) {
      return "Device group";
    }

    if ((this.data[0] & 0xc0) === 0xc0 && !(this.data[1] & 0x80)) {
      return "Instance group";
    }

    if (this.data[0] === 0xfe && (this.data[1] & 0xe0) === 0xe0) {
      return "Device power cycle";
    }

    return "Unknown";
  }

  get eventInstNum() {
    const scheme = this.eventScheme;
    if (scheme === "Instance" || scheme === "Device/Instance") {
      return (this.data[1] >> 2) & 0x1f;
    }

    return undefined;
  }

  get eventInstType() {
    const scheme = this.eventScheme;
    if (scheme === "Instance") {
      return (this.data[0] >> 1) & 0x1f;
    }

    if (
      scheme === "Device" ||
      scheme === "Device group" ||
      scheme === "Instance group"
    ) {
      return (this.data[1] >> 2) & 0x1f;
    }

    return undefined;
  }

  get eventShortAddr() {
    const scheme = this.eventScheme;
    if (scheme === "Device" || scheme === "Device/Instance") {
      return (this.data[0] >> 1) & 0x3f;
    }

    return undefined;
  }

  get eventDevGroup() {
    const scheme = this.eventScheme;
    if (scheme === "Device group") {
      return (this.data[0] >> 1) & 0x1f;
    }

    return undefined;
  }

  get eventInstGroup() {
    const scheme = this.eventScheme;
    if (scheme === "Instance group") {
      return (this.data[0] >> 1) & 0x1f;
    }

    return undefined;
  }

  get eventInfoData() {
    if (this.isEventMessage()) {
      return ((this.data[1] & 0x03) << 8) | this.data[2];
    }

    return undefined;
  }
}

exports.DALIEventMessage = DALIEventMessage;
