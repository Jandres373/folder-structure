import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface RequestConfig extends AxiosRequestConfig {
  auth?: {
    username: string;
    password: string;
  };
}

interface FetcherConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}


/* 

El fetcher es la capa más cercana al backend, define los métodos de comunicación, parámetros, etc. 
*/
export class Fetcher {
  private instance: AxiosInstance;

  constructor(config: FetcherConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });


    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public setBaseURL(baseURL: string): void {
    this.instance.defaults.baseURL = baseURL;
  }


  public setHeaders(headers: Record<string, string>): void {
    this.instance.defaults.headers = {
      ...this.instance.defaults.headers,
      ...headers,
    };
  }


  public setAuth(username: string, password: string): void {
    this.instance.defaults.auth = { username, password };
  }

  public async request<T>(config: RequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.request<T>(config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // GET request
  public async get<T>(path: string, config?: RequestConfig): Promise<{ data: T | null; error: string | null; status: number }> {
    try {
      const response = await this.instance.get<T>(path, config);
      return { data: response.data, error: null, status: response.status };
    } catch (error) {
      const handledError = this.handleError(error as Error);
      return { data: null, error: handledError.message, status: (error as any).response?.status || 500 };
    }
  }

  // POST request
  public async post<T>(path: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.post<T>(path, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }


  // PATCH request
  public async patch<T>(path: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.patch<T>(path, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // PUT request
  public async put<T>(path: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.put<T>(path, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // DELETE request
  public async delete<T>(path: string, config?: RequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.delete<T>(path, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return new Error(`From fetcher: Request failed: ${message}`);
    }
    return error;
  }
}