import env from "./env";
import crypto from "crypto";

export default class Account {
  private static encryptionKey = Buffer.from(env.ENCRYPTION_KEY, "hex");
  private static ivKey = Buffer.from(env.IV_KEY, "hex");

  static encrypt(value: string) {
    const cipher = crypto.createCipheriv("aes-256-cbc", Account.encryptionKey, Account.ivKey);
    let encrypted = cipher.update(value, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  static decrypt(encrypted: string) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", Account.encryptionKey, Account.ivKey);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  static verify(value: string, encrypted: string) {
    const decrypted = Account.decrypt(encrypted);
    return value === decrypted;
  }
}
