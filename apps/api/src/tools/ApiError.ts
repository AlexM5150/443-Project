export default class ApiError {
  code: number;
  error: string;

  constructor(code: number, error: string) {
    this.code = code;
    this.error = error;
  }

  static check(field: string, required: { [key: string]: string }) {
    const missingParams = [];
    for (const key in required)
      if (typeof required[key] === "undefined" || required[key] === "") missingParams.push(key);
    if (missingParams.length > 0) {
      const errorMessage = `Missing ${field} parameters: ${missingParams.join(", ")}`;
      throw new ApiError(400, errorMessage);
    }
  }
}
