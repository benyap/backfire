import { Command } from "commander";

import { resolveConfig, GlobalOptions } from "~/config";
import {
  listFirestoreCollections,
  listFirestoreDocuments,
} from "~/actions/listFirestoreData";

import { CountOption, LimitOption } from "./options";

export function createListCommand(cli: Command, globalOptions: GlobalOptions) {
  cli
    .command("list:documents <path>")
    .description("list document IDs from a collection")
    .addOption(LimitOption({ countable: true }))
    .addOption(CountOption())
    .action(async (path: string, options: any) => {
      const config = await resolveConfig(globalOptions, options);
      const output = await listFirestoreDocuments(
        config.connection,
        path,
        options
      );
      if (Array.isArray(output)) output.forEach((id) => console.log(id));
      else console.log(output);
    });

  cli
    .command("list:collections [path]")
    .description("list the collections at the specified path")
    .addOption(LimitOption({ countable: true }))
    .addOption(CountOption())
    .action(async (path: string | undefined, options: any) => {
      const config = await resolveConfig(globalOptions, options);
      const { connection, action } = config;
      const output = await listFirestoreCollections(
        connection,
        path,
        action as any
      );
      if (Array.isArray(output)) output.forEach((id) => console.log(id));
      else console.log(output);
    });
}
