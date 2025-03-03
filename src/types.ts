import type { Linter } from "eslint";

export type Awaitable<T> = T | Promise<T>;

export interface ConfigItem extends Linter.Config {
  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>;
}

export interface OptionsOverrides {
  overrides?: ConfigItem["rules"];
}

export type ConfigFn = (options?: OptionsOverrides) => Awaitable<ConfigItem[]>;

export type GetConfigOptions<T extends (...args: any) => any> =
  Parameters<T>[0];

export type withBoolean<T> = T | boolean;
