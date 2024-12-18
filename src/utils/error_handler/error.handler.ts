import { Logger, logger } from "../logger/logger";

/**
 * Tipos de errores que pueden ocurrir en la aplicación:
 * - NETWORK: Errores relacionados con la conexión o peticiones de red
 * - OPERATION: Errores en operaciones de negocio o procesos internos
 * - AUTHENTICATION: Errores de autenticación o permisos
 * - SYSTEM: Errores del sistema o ambiente
 * - UNKNOWN: Errores no categorizados
 */
export type ErrorType = 'NETWORK' | 'OPERATION' | 'AUTHENTICATION' | 'SYSTEM' | 'UNKNOWN';

/**
 * Interfaz que define la estructura de los detalles de un error
 * @property type - Categoría del error
 * @property message - Mensaje descriptivo del error
 * @property code - Código opcional para identificar el error
 * @property timestamp - Momento en que ocurrió el error
 * @property context - Información adicional relevante al error
 */
export interface ErrorDetails {
    type: ErrorType;
    message: string;
    code?: string | number;
    timestamp?: Date;
    context?: Record<string, any>;
}

/**
 * Manejador centralizado de errores para la aplicación
 * Proporciona métodos para procesar, registrar y dar seguimiento a errores
 * de manera consistente a través de toda la aplicación
 */
class ErrorHandler {
    private logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    /**
     * Procesa y registra errores con detalles completos
     * @param error - Objeto o mensaje de error
     * @param type - Categoría del error (por defecto: 'UNKNOWN')
     * @param context - Información adicional sobre el contexto del error
     */
    handle(error: Error | string, type: ErrorType = 'UNKNOWN', context?: Record<string, any>): void {
        const errorDetails: ErrorDetails = {
            type,
            message: error instanceof Error ? error.message : error,
            timestamp: new Date(),
            context
        };

        this.logger.error('Error Occurred', errorDetails);
        this.sendToErrorTrackingService(errorDetails);
    }

    /**
     * Crea una respuesta de error estandarizada para llamadas API
     * Útil para mantener un formato consistente en las respuestas de error
     */
    createErrorResponse(error: ErrorDetails): { success: false; error: ErrorDetails } {
        return {
            success: false,
            error
        };
    }

    /**
     * Envuelve funciones asíncronas para manejar errores de manera consistente
     * @param fn - Función asíncrona a ejecutar
     * @param errorType - Tipo de error a asignar si ocurre una excepción
     * @returns El resultado de la función o null si ocurre un error
     */
    async asyncWrapper<T>(
        fn: () => Promise<T>,
        errorType: ErrorType = 'UNKNOWN'
    ): Promise<T | null> {
        try {
            return await fn();
        } catch (error) {
            this.handle(error as Error, errorType);
            return null;
        }
    }

    /**
     * Método privado para enviar errores a un servicio de seguimiento
     * Puede implementarse para integrar servicios como Sentry o LogRocket
     */
    private sendToErrorTrackingService(_errorDetails: ErrorDetails) {
        // Implementar integración con servicios como Sentry, LogRocket, etc.
    }
}

// Exportamos una instancia única del manejador de errores
export const errorHandler = new ErrorHandler(logger);