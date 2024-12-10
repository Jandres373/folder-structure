class BairuLogger {
    private signature = '\x1b[1m\x1b[36m【bairu logger】\x1b[0m';

    private formatDate(date: Date): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
        
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    private timestamp() {
        return `\x1b[2m[${this.formatDate(new Date())}]\x1b[0m`;
    }

    private formatMessage(message: string | object) {
        if (typeof message === 'object') {
            return `\x1b[3m${JSON.stringify(message, null, 2)}\x1b[0m`;
        }
        return message;
    }

    private prefix(icon: string, color: string) {
        return `${color}\x1b[1m${icon} \x1b[0m`;
    }

    log(message: string | object) {
        const formattedMessage = this.formatMessage(message);
        console.log(`${this.signature} ${this.timestamp()} ${formattedMessage}`);
    }

    info(message: string | object) {
        const formattedMessage = this.formatMessage(message);
        console.info(`${this.signature} ${this.timestamp()} ${this.prefix('ℹ', '\x1b[34m')}\x1b[34m\x1b[1m${formattedMessage}\x1b[0m`);
    }

    success(message: string | object) {
        const formattedMessage = this.formatMessage(message);
        console.log(`${this.signature} ${this.timestamp()} ${this.prefix('✓', '\x1b[32m')}\x1b[32m\x1b[1m${formattedMessage}\x1b[0m`);
    }

    warn(message: string | object) {
        const formattedMessage = this.formatMessage(message);
        console.warn(`${this.signature} ${this.timestamp()} ${this.prefix('⚠', '\x1b[33m')}\x1b[33m\x1b[1m${formattedMessage}\x1b[0m`);
    }

    error(message: string | object | Error) {
        const formattedMessage = message instanceof Error ? message.message : this.formatMessage(message);
        console.error(`${this.signature} ${this.timestamp()} ${this.prefix('✖', '\x1b[31m')}\x1b[31m\x1b[1m${formattedMessage}\x1b[0m`);
        if (message instanceof Error && message.stack) {
            console.error(`\x1b[31m${message.stack}\x1b[0m`);
        }
    }
}

// Export a single instance of the logger
export const logger = new BairuLogger();