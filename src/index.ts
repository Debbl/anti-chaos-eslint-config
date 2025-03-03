import type { JavascriptConfig } from "./configs/javascript";
import { javascript } from "./configs/javascript";
import type { FlatGitignoreOptions } from "eslint-config-flat-gitignore";
import gitignore from "eslint-config-flat-gitignore";
import type { PrettierConfig } from "./configs/prettier";
import { prettier } from "./configs/prettier";
import type {
  Awaitable,
  ConfigItem,
  GetConfigOptions,
  withBoolean,
} from "./types";
import { combine } from "./utils";
import { ignore } from "./configs/ignore";
import type { TypescriptConfig } from "./configs/typescript";
import { typescript } from "./configs/typescript";
import { getConfigOption } from "./utils";

export default function defineConfig(
  options: {
    gitignore?: withBoolean<FlatGitignoreOptions>;
    ignores?: withBoolean<FlatGitignoreOptions>;
    javascript?: withBoolean<GetConfigOptions<JavascriptConfig>>;
    prettier?: withBoolean<GetConfigOptions<PrettierConfig>>;
    typescript?: withBoolean<GetConfigOptions<TypescriptConfig>>;
  } = {},
  ...userConfigs: ConfigItem[]
) {
  const {
    gitignore: enableGitignore = true,
    ignores: enableIgnores = true,
    javascript: enableJavascript = true,
    prettier: enablePrettier = true,
    typescript: enableTypescript = false,
  } = options;

  const configs: Awaitable<ConfigItem[] | ConfigItem>[] = [];
  if (enableGitignore) {
    configs.push(gitignore(getConfigOption(enableGitignore)));
  }

  if (enableIgnores) {
    configs.push(ignore(getConfigOption(enableIgnores)));
  }

  if (enableJavascript) {
    configs.push(javascript(getConfigOption(enableJavascript)));
  }

  if (enableTypescript) {
    configs.push(typescript(getConfigOption(enableTypescript)));
  }

  if (enablePrettier) {
    configs.push(prettier(getConfigOption(enablePrettier)));
  }

  return combine(...configs, ...userConfigs);
}

export { defineConfig };
