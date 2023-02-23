export default class ApiError {
  status: number;
  error: string;

  constructor(status: number, error: string) {
    this.status = status;
    this.error = error;
  }
}
