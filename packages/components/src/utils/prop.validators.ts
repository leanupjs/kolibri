import { Log } from '@leanup/lib';
import { querySelectorAll } from 'query-selector-all-shadow-root';
import { querySelector } from 'query-selector-shadow-root';
import { Generic } from '@a11y-ui/core';
import { getDocument } from './dev.utils';

// https://regex101.com/r/lSYLO9/1
/**
 * Bei Stencil kann es vorkommen, dass bei der Übergabe eines komplexer Objekte
 * der String "[object Object]" an die Web Component übergeben wird. Um den Neben-
 * effekt abzufangen, wird dieser Fall abgefangen und nicht ausgeführt.
 */
const OBJECT_OBJECT = /\[object Object\]/;
export const objectObjectHandler = (value: unknown, cb: () => void): void => {
	if (typeof value === 'string' && OBJECT_OBJECT.test(value)) {
		return;
	}
	cb();
};

/**
 * Bei Stencil kann es vorkommen, dass bei der Übergabe eines leeren Array's
 * ein leerer String an die Web Component übergeben wird. Um den Nebeneffekt
 * abzufangen, wird dieser Fall abgefangen und nicht ausgeführt.
 */
export const emptyStringByArrayHandler = (value: unknown, cb: () => void): void => {
	if (typeof value === 'string' && value === '') {
		return;
	}
	cb();
};

const patchState = (component: Generic.Element.Component): void => {
	component.nextHooks?.forEach((hooks, key) => {
		const beforePatch = hooks.get('beforePatch') as Generic.Element.NextStateHooksCallback;
		if (typeof beforePatch === 'function') {
			beforePatch(component.nextState?.get(key), component.nextState as Map<string, unknown>, component, key);
		}
	});
	/**
	 * Wenn in beforePatch Methoden die Änderung verworfen wird,
	 * muss auch nicht der State aktualisiert und neu gerendert
	 * werden.
	 */
	if ((component.nextState as Map<string, unknown>)?.size > 0) {
		component.state = {
			...component.state,
			...Object.fromEntries(component.nextState as Map<string, unknown>),
		};
		delete component.nextState;

		component.nextHooks?.forEach((hooks, key) => {
			const afterPatch = hooks.get('afterPatch') as Generic.Element.StateHooksCallback;
			if (typeof afterPatch === 'function') {
				afterPatch(component.state[key], component.state, component, key);
			}
		});
	}
	delete component.nextHooks;
};

type SetStateHooks = {
	afterPatch?: Generic.Element.StateHooksCallback;
	beforePatch?: Generic.Element.NextStateHooksCallback;
};

export const setState = <T>(component: Generic.Element.Component, propName: string, value?: T, hooks: SetStateHooks = {}): void => {
	if (component.nextHooks === undefined) {
		component.nextHooks = new Map();
	}
	if (component.nextState === undefined) {
		component.nextState = new Map();
	}
	if (component.nextState.get(propName) !== value) {
		const nextHooks = component.nextHooks.get(propName);
		if (nextHooks instanceof Map === false) {
			component.nextHooks.set(propName, new Map());
		}
		if (typeof hooks.afterPatch === 'function') {
			component.nextHooks.get(propName)?.set('afterPatch', hooks.afterPatch);
		}
		if (typeof hooks.beforePatch === 'function') {
			component.nextHooks.get(propName)?.set('beforePatch', hooks.beforePatch);
		}
		component.nextState.set(propName, value);
		/**
		 * Muss erstmal in sync bleiben, da sonst der
		 * Tooltip nicht korrekt ausgerichtet wird.
		 */
		// if (component.hydrated === true || process.env.NODE_ENV !== 'test') {
		// clearTimeout(component.timeout as NodeJS.Timeout);
		// component.timeout = setTimeout(() => {
		// 	clearTimeout(component.timeout as NodeJS.Timeout);
		// 	patchState(component);
		// }, 50);
		// } else {
		patchState(component);
		// }
	}
};

export const logWarn = (component: Generic.Element.Component, propName: string, value: unknown, requiredGeneric: Set<string | null | undefined>): void => {
	Log.debug(
		`[${component.constructor.name}] Der Property-Wert (${value as string}) für '${propName}' ist nicht valide. Folgende Werte sind erlaubt: ${Array.from(
			requiredGeneric
		).join(', ')}`
	);
};

export type WatchOptions = {
	allowNull?: boolean;
	defaultValue?: unknown;
	hooks?: SetStateHooks;
	required?: boolean;
};

export type WatchBooleanOptions = WatchOptions & {
	defaultValue?: boolean | null;
};

export type WatchStringOptions = WatchOptions & {
	defaultValue?: string | null;
	minLength?: number;
};

export type WatchNumberOptions = WatchOptions & {
	defaultValue?: number | null;
	min?: number;
	max?: number;
};

export const watchValidator = <T>(
	component: Generic.Element.Component,
	propName: string,
	validationFunction: (value?: T) => boolean,
	requiredGeneric: Set<string | null | undefined>,
	value?: T,
	options: WatchOptions = {}
): void => {
	if (validationFunction(value) && (options?.allowNull === undefined || options?.allowNull === false || value === null)) {
		setState(component, propName, value, options?.hooks);
	} else if (options?.defaultValue !== undefined || options?.required === undefined || options?.required === false) {
		setState(component, propName, options?.defaultValue, options?.hooks);
	} else {
		if (options.allowNull === true) {
			requiredGeneric.add(null);
		}
		if (options.required !== true) {
			requiredGeneric.add(undefined);
		}
		logWarn(component, propName, value, requiredGeneric);
	}
};

export const watchBoolean = (component: Generic.Element.Component, propName: string, value?: boolean, options?: WatchBooleanOptions): void => {
	watchValidator(component, propName, (value): boolean => typeof value === 'boolean', new Set(['Boolean {true, false}']), value, options);
};

export const watchString = (component: Generic.Element.Component, propName: string, value?: string, options?: WatchStringOptions): void => {
	watchValidator(
		component,
		propName,
		(value): boolean => typeof value === 'string' && value.length >= (typeof options?.minLength === 'number' ? options?.minLength : 1),
		new Set(['String (nicht leer)']),
		value,
		options
	);
};

export const watchNumber = (component: Generic.Element.Component, propName: string, value?: number, options?: WatchNumberOptions): void => {
	watchValidator(
		component,
		propName,
		(value): boolean =>
			typeof value === 'number' &&
			(typeof options?.min === 'undefined' || (typeof options?.min === 'number' && value >= options.min)) &&
			(typeof options?.max === 'undefined' || (typeof options?.max === 'number' && value <= options.max)),
		new Set(['Number']),
		value,
		options
	);
};

export const watchJsonString = (
	component: Generic.Element.Component,
	propName: string,
	value?: number,
	validator?: (value: unknown) => boolean,
	strict = true,
	options: WatchOptions = {}
): void => {
	let parsedValue: unknown = null;

	if (typeof value === 'string') {
		try {
			parsedValue = JSON.parse(value);
		} catch (error) {
			try {
				parsedValue = JSON.parse((value as string).replace(/'/g, '"'));
			} catch (error) {
				Log.debug(`Der Property-Wert für '${propName}' ist nicht valide. Es wird ein stringifiziertes JSON erwartet.`);
			}
		}
	}

	if (typeof validator !== 'function' || validator(parsedValue)) {
		setState(component, propName, parsedValue, options.hooks);
	} else if (strict === false) {
		setState(component, propName, undefined, options.hooks);
	} else {
		Log.debug(`Der Property-Wert für '${propName}' ist nicht valide. Es wird ein stringifiziertes JSON erwartet.`);
	}
};

export const watchJsonArrayString = <T>(
	component: Generic.Element.Component,
	propName: string,
	itemValidation: (item: T) => boolean,
	value?: T[] | string,
	arrayValidation: (items: T[]) => boolean = (items: T[]) => items === items, // nochmal hirnen
	options: WatchOptions = {}
): void => {
	emptyStringByArrayHandler(value, () => {
		objectObjectHandler(value, () => {
			if (typeof value === 'undefined') {
				value = [];
			}
			try {
				if (typeof value === 'string') {
					value = parseJson<T[]>(value);
				}
				if (Array.isArray(value)) {
					const invalid = value.find((item: T) => !itemValidation(item));
					if (invalid === undefined && arrayValidation(value)) {
						setState(component, propName, value, options.hooks);
					} else {
						objectObjectHandler(invalid, () => {
							console.log(invalid);
							throw new Error(`↑ Das Schema für das Property (_options) ist nicht valide. Der Wert wird nicht geändert.`);
						});
					}
				} else {
					objectObjectHandler(value, () => {
						// console.log(value);
						throw new Error(`↑ Das Schema für das Property (_options) ist nicht valide. Der Wert wird nicht geändert.`);
					});
				}
			} catch (error) {
				/**
				 * TODO: Wir haben einen Known-Bug beim Propergieren von Zeichenkettenliste (string[]).
				 */
				// console.warn(error);
				Log.debug(`Known bug: Zeichenkettenliste (string[])`);
			}
		});
	});
};

export const stringifyJson = (value: unknown): string => {
	try {
		return JSON.stringify(value).replace(/"/g, "'");
	} catch (error) {
		// console.log(value);
		throw new Error(`↑ Das JSON konnte nicht in einen String umgewandelt werden. Es wird ein stringifizierbares JSON erwartet.`);
	}
};

export const parseJson = <T>(value: string): T => {
	try {
		return JSON.parse(value);
	} catch (error) {
		try {
			return JSON.parse(value.replace(/'/g, '"'));
		} catch (error) {
			// console.log(value);
			throw new Error(`↑ Der JSON-String konnte nicht geparsed werden. Achten Sie darauf, dass einfache Anführungszeichen im Text maskiert werden (&#8216;).`);
		}
	}
};

export const mapBoolean2String = (value?: boolean): string | undefined => {
	return typeof value === 'boolean' ? (value === true ? 'true' : 'false') : undefined;
};

export const mapStringOrBoolean2String = (value?: string | boolean): string | undefined => {
	return typeof value === 'string' ? value : mapBoolean2String(value);
};

export const koliBriQuerySelector = <T extends Element>(selector: string, node?: Document | HTMLElement | ShadowRoot): T | null =>
	querySelector<T>(selector, node || getDocument());

export const koliBriQuerySelectorAll = <T extends Element>(selector: string, node?: Document | HTMLElement | ShadowRoot): T[] =>
	querySelectorAll<T>(selector, node || getDocument());

export const createWhitespace = (deep: number): string => {
	let whitespace = '';
	for (let i = 0; i < deep; i++) {
		whitespace += ' ';
	}
	return whitespace;
};
