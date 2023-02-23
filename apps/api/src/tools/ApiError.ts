export default class ApiError {
  status: number;
  error: string;

  constructor(status: number, error: string) {
    this.status = status;
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
