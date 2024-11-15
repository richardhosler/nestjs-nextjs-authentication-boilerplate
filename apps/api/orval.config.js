module.exports = {
  main: {
    input: {
      target: "./swagger-spec.json",
    },
    output: {
      target: "./../../common/schema/src/react-query.generated.ts",
      client: "react-query",
      prettier: true,
      override: {
        mutator: {
          path: "./../../common/schema/src/axios-instance.ts",

          name: "customInstance",
        },
      },
    },
  },
  mainzod: {
    input: {
      target: "./swagger-spec.json",
    },
    output: {
      target: "./../../common/schema/src/zod.generated.ts",
      client: "zod",
      prettier: true,
    },
  },
};
