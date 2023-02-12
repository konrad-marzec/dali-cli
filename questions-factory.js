const COMMAND_QUESTION = {
  type: "input",
  name: "level",
  message: "Light level:",
};

function buildQuestions(group, broadcast) {
  if (broadcast) {
    return [COMMAND_QUESTION];
  }

  return [
    {
      type: "input",
      name: "address",
      message: group ? "DALI group address:" : "DALI device address:",
    },
    COMMAND_QUESTION,
  ];
}

exports.buildQuestions = buildQuestions;
