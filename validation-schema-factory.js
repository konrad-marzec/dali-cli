const { z } = require("zod");

const shortAddressSchema = z.preprocess(
  (val) => parseInt(val, 10),
  z
    .number({
      required_error: "Address of device is required",
      invalid_type_error: "Address of device must be a number",
    })
    .gte(0)
    .lt(64)
);

const groupAddressSchema = z.preprocess(
  (val) => parseInt(val, 10),
  z
    .number({
      required_error: "Group address is required",
      invalid_type_error: "Group address must be a number",
    })
    .gte(0)
    .lt(16)
);

function buildValidationSchema(group) {
  return z.object({
    address: group ? groupAddressSchema : shortAddressSchema,
    level: z.preprocess(
      (val) => parseInt(val, 10),
      z
        .number({
          required_error: "Level is required",
          invalid_type_error: "Level must be a number",
        })
        .gte(0)
        .lte(254)
    ),
  });
}

exports.buildValidationSchema = buildValidationSchema;
