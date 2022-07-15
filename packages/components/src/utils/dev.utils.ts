let WINDOW: Window | null = null;
let DOCUMENT: Document | null = null;

export const configKoliBri = (window: Window): void => {
	if (window instanceof Window) {
		WINDOW = window;
		if (WINDOW.document instanceof Document) {
			DOCUMENT = window.document;
		} else {
			console.warn(`The given Window has no valid Document.`);
		}
	} else {
		console.warn(`The given Window is not valid.`);
	}
};

export const getWindow = (): Window => (WINDOW || typeof window === 'undefined' ? (null as unknown as Window) : window);
export const getDocument = (): Document => (DOCUMENT || typeof getWindow().document === 'undefined' ? (null as unknown as Document) : getWindow().document);

let META_CONFIG: string | null = null;
let DEV_MODE: boolean | null = null;

export const getDevMode = (): boolean => DEV_MODE === true;

type LogShield = {
	label: string;
	style: string;
};

type LogShieldOptions = {
	classifier?: string;
	forceLog?: boolean;
	overwriteStyle?: string;
};

export class Log {
	private static shield: LogShield = {
		label: '%cKoliBri',
		style: 'color: white; background: #666; font-weight: bold; padding: .25em .5em; border-radius: 3px; border: 1px solid #000',
	};

	private static mapToArray(msg: unknown | unknown[]): unknown[] {
		return Array.isArray(msg) ? msg : [msg];
	}

	private static handleClassifier(classifier?: string): string {
		if (typeof classifier === 'string' && classifier.length > 0) {
			return `${Log.shield.label} | ${classifier}`;
		} else {
			return Log.shield.label;
		}
	}

	private static getShield(options?: LogShieldOptions): string[] {
		return [Log.handleClassifier(options?.classifier), `${Log.shield.style};${options?.overwriteStyle || ''}`];
	}

	public static debug(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (DEV_MODE || options?.forceLog === true) {
			console.log(...Log.getShield(options), ...Log.mapToArray(msg));
		}
	}

	public static info(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (DEV_MODE || options?.forceLog === true) {
			console.info(...Log.getShield(options), ...Log.mapToArray(msg));
		}
	}

	public static trace(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (DEV_MODE || options?.forceLog === true) {
			console.trace(...Log.getShield(options), ...Log.mapToArray(msg));
		}
	}

	public static warn(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (DEV_MODE || options?.forceLog === true) {
			console.warn(...Log.getShield(options), ...Log.mapToArray(msg));
		}
	}

	public static error(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (DEV_MODE || options?.forceLog === true) {
			console.error(...Log.getShield(options), ...Log.mapToArray(msg));
		}
	}

	public static throw(msg: unknown | unknown[], options?: LogShieldOptions): void {
		if (DEV_MODE || options?.forceLog === true) {
			throw new Error(...Log.getShield(options), ...Log.mapToArray(msg));
		}
	}
}

export const initMeta = (): void => {
	if (DEV_MODE === null) {
		const meta = getDocument().querySelector('meta[name="leanup"]');
		if (meta && meta.hasAttribute('content')) {
			META_CONFIG = meta.getAttribute('content');
			if (typeof META_CONFIG === 'string') {
				DEV_MODE = META_CONFIG.includes('dev-mode=true');
			}
		}
	} else {
		console.warn(`You can only initialize DEV_MODE and COLOR_CONTRAST_ANALYSIS once.`);
	}
};
