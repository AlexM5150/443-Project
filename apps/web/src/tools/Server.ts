import env from "./env";
import Cookies from "js-cookie";
import { IError } from "../types";
import axios, { AxiosInstance, AxiosRequestConfig, isAxiosError, AxiosResponse } from "axios";

interface HttpClientOptions {
  baseURL: string;
  headers?: Record<string, string>;
}

class Server {
  private static instance: Server;
  private readonly client: AxiosInstance;

  private constructor({ baseURL, headers }: HttpClientOptions) {
    const config: AxiosRequestConfig = {
      baseURL,
      headers,
    };
    console.log("creating new class");
    this.client = axios.create(config);
  }

  static getInstance(token: string | undefined): Server {
    if (!Server.instance) {
      return (Server.instance = new Server({
        baseURL: `${env.SERVER_URL}/api`,
        headers: { Authorization: `Bearer ${token}` },
      }));
    }
    Server.instance.client.defaults.headers.Authorization = `Bearer ${token}`;
    return Server.instance;
  }

  // eslint-disable-next-line
  private getError(e: any): IError {
    if (!isAxiosError(e)) return { message: "API request failed", active: true };
    return { message: e.response?.data.error || e.message, active: true };
  }

  async get<T>(url: string): Promise<{ response?: T; error?: IError }> {
    try {
      const response = await this.client.get<AxiosResponse & T>(url);
      return { response: response.data.data };
    } catch (e) {
      return { error: this.getError(e) };
    }
  }

  async post<T>(url: string, data?: any): Promise<{ response?: T; error?: IError }> {
    try {
      const response = await this.client.post<{ data: any; message: string } & T>(url, data);
      return { response: response.data.data || response.data.message };
    } catch (e) {
      return { error: this.getError(e) };
    }
  }
}

export default Server.getInstance(Cookies.get("jwt"));
