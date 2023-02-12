#!/usr/bin/env node

const { program } = require("commander");
const inquirer = require("inquirer");

const { connectToServer } = require("./connection");
const { buildDALIFrame } = require("./dali-frame-factory");
const { buildQuestions } = require("./questions-factory");
const { buildValidationSchema } = require("./validation-schema-factory");

program
  .name("DALI CLI interface")
  .description("CLI to send DALI commands via WebSocket")
  .version("0.0.1")
  .option("--group", "send command to group address")
  .option("--broadcast", "broadcast command")
  .action((options) => {
    inquirer
      .prompt(buildQuestions(options.group, options.broadcast))
      .then(async (data) => {
        buildValidationSchema(options.group, options.broadcast).parse(data);

        const address = options.broadcast
          ? 0xfe
          : options.group
          ? (Number(data.address) << 1) | 0x80
          : Number(data.address) << 1;

        const frame = buildDALIFrame(16, [address, Number(data.level)]);

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
