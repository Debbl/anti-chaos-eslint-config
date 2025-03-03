import { GLOB_EXCLUDE } from "src/globs";
import type { ConfigFn } from "src/types";

export const ignore: ConfigFn = () => {
  return [
    {
      name: "eslint/ignore/rules",
      ignores: [...GLOB_EXCLUDE],
    },
  ];
};
