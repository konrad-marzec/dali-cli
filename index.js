#!/usr/bin/env node

const { program } = require("commander");
const inquirer = require("inquirer");

const { connectToServer } = require("./connection");
const { buildDALIFrame } = require("./dali-frame-factory");
const { buildValidationSchema } = require("./validation-schema-factory");

const QUESTIONS = [
  { type: "input", name: "address", message: "DALI device address:" },
  { type: "input", name: "level", message: "Light level:" },
];

program
  .name("DALI CLI interface")
  .description("CLI to send DALI commands via WebSocket")
  .version("0.0.1")
  .option("--group", "send command to group address")
  .action((options) => {
    inquirer
      .prompt(QUESTIONS)
      .then(async (data) => {
        buildValidationSchema(options.group).parse(data);

        const address = Number(data.address) << 1;
        const frame = buildDALIFrame(16, [
          options.group ? address | 0x80 : address,
          Number(data.level),
        ]);

        const connection = await connectToServer();

        if (connection.connected) {
          connection.send(JSON.stringify(frame.payload), (error) => {
            if (error) {
              console.log(`Send Error: ${error.toString()}"`);
            }

            setTimeout(() => connection.close(), 100);
          });
        }
      })
      .catch((error) => {
        console.error(`Inquirer error: ${error.toString()}`);

        process.exit();
      });
  })
  .parse();
