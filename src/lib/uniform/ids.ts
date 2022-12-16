import * as crypto from "crypto";

const salt = crypto.randomBytes(32).toString("base64");

export namespace Identify {
  export function obfuscate(id: string | number): string {
    const hmac = crypto.createHmac("sha256", salt);

    if (typeof id === "number") {
      id = id.toString();
    }

    const result = hmac.update(id).digest("base64");
    return result;
  }
}
