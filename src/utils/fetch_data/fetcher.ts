import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { errorHandler } from '../error_handler/error.handler';
import { SERVER_ROUTES, isValidPath } from './server.routes';

/**
 * Configuración extendida para peticiones HTTP
 * Incluye opciones de autenticación básica, esto se tendrá que adaptar a cada app
 */
interface RequestConfig extends AxiosRequestConfig {
  auth?: {
    username: string;
    password: string;
  };
}

/**
 * Configuración base para el cliente HTTP
 * @property baseURL - URL base para todas las peticiones
 * @property timeout - Tiempo máximo de espera en milisegundos
 * @property headers - Cabeceras HTTP personalizadas
 */
interface FetcherConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Cliente HTTP personalizado para la aplicación
 * Proporciona una capa de abstracción sobre axios con manejo de errores integrado
 * y configuración centralizada para todas las peticiones HTTP
 */
export class Fetcher {
  private instance: AxiosInstance;

  constructor(config: FetcherConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json', // este header nos obliga a usar json, si queremos enviar un formulario deberíamos pensar en como mandar los datos de un multipart por ejemplo.
        ...config.headers,
      },
    });

    // Interceptor para errores en las peticiones
    this.instance.interceptors.request.use(
      (config) => config,
      (error) => {
        errorHandler.handle(
          error,
          'NETWORK',
          {
            layer: 'Fetcher',
            stage: 'Request Interceptor',
            url: error.config?.url
          }
        );
        return Promise.reject(error);
      }
    );

    // Interceptor para errores en las respuestas
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        errorHandler.handle(
          error,
          error.response?.status >= 400 ? 'AUTHENTICATION' : 'NETWORK',
          {
            layer: 'Fetcher',
            stage: 'Response Interceptor',
            status: error.response?.status,
            url: error.config?.url
          }
        );
        return Promise.reject(error);
      }
    );
  }

  /**
   * Realiza una petición GET
   * @param url - Ruta del servidor (debe ser una ruta válida de SERVER_ROUTES)
   * @param config - Configuración adicional para la petición
   * @returns Datos de la respuesta tipados según T
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    if (!isValidPath(url)) {
      const pathError = new Error(`Ruta inválida: ${url}`);

      errorHandler.handle(
        pathError,
        'OPERATION',
        {
          layer: 'Fetcher',
          method: 'GET',
          url
        }
      );
      throw pathError;
    }

    try {
      const response = await this.instance.get<T>(url, config);
      return response.data;
    } catch (error) {
      errorHandler.handle(
        error as Error,
        'OPERATION',
        {
          layer: 'Fetcher',
          method: 'GET',
          url
        }
      );
      throw error;
    }
  }

  /**
   * Realiza una petición POST
   * @param url - Ruta del servidor (debe ser una ruta válida de SERVER_ROUTES)
   * @param data - Datos a enviar en el cuerpo de la petición
   * @param config - Configuración adicional para la petición
   * @returns Datos de la respuesta tipados según T
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    if (!isValidPath(url)) {
      throw new Error(`Ruta inválida: ${url}`);
    }

    try {
      const response = await this.instance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      errorHandler.handle(
        error as Error,
        'OPERATION',
        {
          layer: 'Fetcher',
          method: 'POST',
          url
        }
      );
      throw error;
    }
  }

  /**
   * Realiza una petición PATCH
   * @param url - Ruta del servidor (debe ser una ruta válida de SERVER_ROUTES)
   * @param data - Datos a enviar en el cuerpo de la petición
   * @param config - Configuración adicional para la petición
   * @returns Datos de la respuesta tipados según T
   */
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    if (!isValidPath(url)) {
      throw new Error(`Ruta inválida: ${url}`);
    }

    try {
      const response = await this.instance.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      errorHandler.handle(
        error as Error,
        'OPERATION',
        {
          layer: 'Fetcher',
          method: 'PATCH',
          url
        }
      );
      throw error;
    }
  }

  /**
   * Realiza una petición PUT
   * @param url - Ruta del servidor (debe ser una ruta válida de SERVER_ROUTES)
   * @param data - Datos a enviar en el cuerpo de la petición
   * @param config - Configuración adicional para la petición
   * @returns Datos de la respuesta tipados según T
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    if (!isValidPath(url)) {
      throw new Error(`Ruta inválida: ${url}`);
    }

    try {
      const response = await this.instance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      errorHandler.handle(
        error as Error,
        'OPERATION',
        {
          layer: 'Fetcher',
          method: 'PUT',
          url
        }
      );
      throw error;
    }
  }

  /**
   * Realiza una petición DELETE
   * @param url - Ruta del servidor (debe ser una ruta válida de SERVER_ROUTES)
   * @param config - Configuración adicional para la petición
   * @returns Datos de la respuesta tipados según T
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    if (!isValidPath(url)) {
      throw new Error(`Ruta inválida: ${url}`);
    }

    try {
      const response = await this.instance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      errorHandler.handle(
        error as Error,
        'OPERATION',
        {
          layer: 'Fetcher',
          method: 'DELETE',
          url
        }
      );
      throw error;
    }
  }

  /**
   * Establece la URL base para todas las peticiones
   * @param baseURL - Nueva URL base
   */
  public setBaseURL(baseURL: string): void {
    this.instance.defaults.baseURL = baseURL;
  }

  /**
   * Establece las cabeceras HTTP para todas las peticiones
   * @param headers - Nuevas cabeceras HTTP
   */
  public setHeaders(headers: Record<string, string>): void {
    this.instance.defaults.headers = {
      ...this.instance.defaults.headers,
      ...headers,
    };
  }

  /**
   * Establece la autenticación básica para todas las peticiones
   * @param username - Nombre de usuario
   * @param password - Contraseña
   */
  public setAuth(username: string, password: string): void {
    this.instance.defaults.auth = { username, password };
  }

  /**
   * Realiza una petición HTTP personalizada
   * @param config - Configuración de la petición
   * @returns Datos de la respuesta tipados según T
   */
  public async request<T>(config: RequestConfig & { url: string }): Promise<T> {
    if (!isValidPath(config.url)) {
      throw new Error(`Ruta inválida: ${config.url}`);
    }

    try {
      const response = await this.instance.request<T>(config);
      return response.data;
    } catch (error) {
      errorHandler.handle(
        error as Error,
        'OPERATION',
        {
          layer: 'Fetcher',
          method: 'REQUEST',
          url: config.url
        }
      );
      throw error;
    }
  }
}

// Exportamos una instancia única del fetcher configurada con la URL base
export const fetchData = new Fetcher({
  baseURL: SERVER_ROUTES.BASE_URL || 'https://jsonplaceholder.typicode.com', // Debería venir de variables de entorno
  timeout: 10000,
});
