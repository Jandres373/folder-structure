import { ErrorDetails } from "../error_handler/error.handler";

/**
 * Logger personalizado para las aplicaciones de Bairu
 * Proporciona métodos para registrar diferentes tipos de mensajes
 * con formato y colores para mejor legibilidad
 */
export class Logger {
    private signature = '\x1b[1m\x1b[36m【bairu logger】\x1b[0m';

    /**
     * Formatea una fecha para el timestamp del log
     * @param date - Fecha a formatear
     * @returns Cadena formateada HH:mm:ss.SSS
     */
    private formatDate(date: Date): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
        
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    /**
     * Genera el timestamp actual formateado
     */
    private timestamp() {
        return `\x1b[2m[${this.formatDate(new Date())}]\x1b[0m`;
    }

    /**
     * Formatea un mensaje para el log
     * Si es un objeto, lo convierte a JSON con formato
     */
    private formatMessage(message: string | object) {
        if (typeof message === 'object') {
            return `\x1b[3m${JSON.stringify(message, null, 2)}\x1b[0m`;
        }
        return message;
    }

    /**
     * Genera el prefijo con ícono y color para cada tipo de mensaje
     */
    private prefix(icon: string, color: string) {
        return `${color}\x1b[1m${icon} \x1b[0m`;
    }

    /**
     * Registra un mensaje informativo general
     */
    log(message: string | object) {
        const formattedMessage = this.formatMessage(message);
        console.log(`${this.signature} ${this.timestamp()} ${formattedMessage}`);
    }

    /**
     * Registra información importante
     * Se muestra con un ícono ℹ en color azul
     */
    info(message: string | object) {
        const formattedMessage = this.formatMessage(message);
        console.info(`${this.signature} ${this.timestamp()} ${this.prefix('ℹ', '\x1b[34m')}\x1b[34m\x1b[1m${formattedMessage}\x1b[0m`);
    }

    /**
     * Registra operaciones exitosas
     * Se muestra con un ícono ✓ en color verde
     */
    success(message: string | object) {
        const formattedMessage = this.formatMessage(message);
        console.log(`${this.signature} ${this.timestamp()} ${this.prefix('✓', '\x1b[32m')}\x1b[32m\x1b[1m${formattedMessage}\x1b[0m`);
    }

    /**
     * Registra advertencias
     * Se muestra con un ícono ⚠ en color amarillo
     */
    warn(message: string | object) {
        const formattedMessage = this.formatMessage(message);
        console.warn(`${this.signature} ${this.timestamp()} ${this.prefix('⚠', '\x1b[33m')}\x1b[33m\x1b[1m${formattedMessage}\x1b[0m`);
    }

    /**
     * Registra errores
     * Se muestra con un ícono ✖ en color rojo
     * Incluye el stack trace si está disponible
     */
    error(message: string | object | Error, errorDetails?: ErrorDetails) {
        const formattedMessage = message instanceof Error ? message.message : this.formatMessage(message);
        console.error(`${this.signature} ${this.timestamp()} ${this.prefix('✖', '\x1b[31m')}\x1b[31m\x1b[1m${formattedMessage}\x1b[0m`);
        
        if (message instanceof Error && message.stack) {
            console.error(message.stack);
        }
        
        if (errorDetails) {
            console.error('Detalles del Error:', JSON.stringify(errorDetails, null, 2));
        }
    }
}

// Exportamos una instancia única del logger
export const logger = new Logger();