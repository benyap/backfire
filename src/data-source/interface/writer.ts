import { Writable } from "stream";

import { StreamNotOpenedError } from "../errors";

export interface IDataWriter {
  /**
   * The path to where the data will be output.
   */
  readonly path: string;

  /**
   * Open a connection to the write stream.
   * Returns `true` if the write location was cleared.
   *
   * @param force Clear any existing data if the write location is not empty.
   */
  open(force?: boolean): Promise<boolean>;

  /**
   * Write data to the stream.
   */
  write(lines: string[]): Promise<void>;

  /**
   * Close the write stream.
   */
  close(): Promise<void>;
}

export abstract class DataStreamWriter implements IDataWriter {
  abstract readonly path: string;
  protected abstract stream?: Writable;

  abstract open(force?: boolean): Promise<boolean>;

  async write(lines: string[]) {
    return new Promise<void>((resolve, reject) => {
      if (!this.stream) return reject(new StreamNotOpenedError());
      this.stream.write(lines.join("\n") + "\n", (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  async close() {
    await new Promise<void>((resolve, reject) => {
      if (!this.stream) return reject(new StreamNotOpenedError());
      this.stream.end(() => resolve());
    });
  }
}
