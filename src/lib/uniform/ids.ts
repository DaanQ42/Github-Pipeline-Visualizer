import * as crypto from "crypto";

const salt = crypto.randomBytes(32).toString("hex");

export namespace Identify {
  export function obfuscate(id: string | number): string {
    const hmac = crypto.createHmac("sha256", salt);

    if (typeof id === "number") {
      id = id.toString();
    }

    const result = hmac.update(id).digest("hex");
    return result;
  }
}
