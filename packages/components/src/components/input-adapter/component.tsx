import { InputControl } from '@leanup/form';
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { setState, watchNumber } from '../../utils/prop.validators';
import { InputTypeOnDefault, InputTypeOnOff } from '@kolibri/lib/dist/types/types/input/types';

const DEFAULT_INPUT_CONTROL: InputControl = new InputControl('unknown', {
	label: '',
});

type AssignedNode = {
	_checked: boolean;
	_disabled: boolean;
	_error: string;
	_id: string;
	_name: string;
	_value: string;
	_on: unknown;
	_required: boolean;
} & Node;

const KOL_TAG_NAMES = [
	'KOL-INPUT-CHECKBOX',
	'KOL-INPUT-COLOR',
	'KOL-INPUT-EMAIL',
	'KOL-INPUT-FILE',
	'KOL-INPUT-NUMBER',
	'KOL-INPUT-PASSWORD',
	'KOL-INPUT-RANGE',
	'KOL-INPUT-RADIO',
	'KOL-INPUT-TEXT',
	'KOL-SELECT',
	'KOL-TEXTAREA',
];

/**
 * API
 */
type RequiredProps = {
	control: InputControl;
};
type OptionalProps = {
	debounce: number;
	on: InputTypeOnDefault;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	control: InputControl;
	debounce: number;
	on: InputTypeOnDefault;
};
type OptionalStates = unknown;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'lean-input-adapter',
	shadow: false,
})
export class LeanInputAdapter implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	private hostElement?: HTMLElement;

	/**
	 * Gibt das Input-Control des Eingabefeldes an.
	 */
	@Prop() public _control!: InputControl;

	/**
	 * Gibt an wie viele Millisekunden das Rerendering beim Änderungen des Wertes verzögert werden soll.
	 */
	@Prop() public _debounce?: number = 250;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault = {};

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_control: DEFAULT_INPUT_CONTROL,
		_debounce: 250,
		_on: {},
	};

	@Watch('_control')
	public validateControl(newControl?: InputControl, oldControl?: InputControl): void {
		if (
			typeof newControl === 'object' &&
			typeof newControl.changeListeners === 'object' &&
			typeof newControl.changeListeners.has === 'function' &&
			typeof newControl.changeListeners.add === 'function'
		) {
			if (
				typeof oldControl === 'object' &&
				typeof oldControl.changeListeners === 'object' &&
				typeof oldControl.changeListeners.has === 'function' &&
				typeof oldControl.changeListeners.delete === 'function'
			) {
				if (oldControl.changeListeners.has(this.changeListener) === true) {
					oldControl.changeListeners.delete(this.changeListener);
				}
			}
			if (newControl.changeListeners.has(this.changeListener) === false) {
				newControl.changeListeners.add(this.changeListener);
			}
			setState(this, '_control', newControl);
			this.syncControl();
		}
	}

	@Watch('_debounce')
	public validateDebounce(value?: number): void {
		watchNumber(this, '_debounce', value);
	}

	@Watch('_on')
	public validateOn(value?: InputTypeOnDefault): void {
		if (typeof value === 'object' && value !== null) {
			setState(this, '_on', value);
		}
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateControl(this._control);
		this.validateDebounce(this._debounce);
		this.validateOn(this._on);
	}

	public disconnectedCallback(): void {
		if (
			typeof this.state._control === 'object' &&
			typeof this.state._control.changeListeners === 'object' &&
			typeof this.state._control.changeListeners.delete === 'function'
		) {
			this.state._control.changeListeners.delete(this.changeListener);
		}
	}

	private changeListener = (): void => {
		this.syncControl();
	};

	private onChange = (_event: Event, value: unknown): void => {
		if (typeof this.state._control === 'object') {
			this.state._control.viewValue = value;
		}
		if (typeof this.state._on === 'object' && this.state._on !== null && typeof this.state._on.onChange === 'function') {
			this.state._on.onChange(_event, value);
		}
	};

	private syncControl = (): void => {
		if (this.hostElement instanceof HTMLElement) {
			const inputs = this.hostElement.childNodes as unknown as AssignedNode[] | null;
			if (inputs) {
				inputs.forEach((input) => {
					if (input instanceof HTMLElement && KOL_TAG_NAMES.includes(input.tagName)) {
						input._checked = this.state._control.value === true;
						input._disabled = this.state._control.disabled === true;
						input._error = typeof this.state._control.error === 'string' && this.state._control.error.length > 0 ? this.state._control.error : '';
						input._id = this.state._control.id;
						input._name = this.state._control.name;
						input._value = this.state._control.viewValue as InputTypeOnOff;
						input._on = {
							...this.state._on,
							onChange: this.onChange,
						};
						input._required = this.state._control.mandatory === true;
						if (typeof this.state._control.label === 'string' && this.state._control.label.length > 0) {
							input.innerText = this.state._control.label;
						}
					}
				});
			}
		}
	};

	private catchHostElement = (el?: HTMLElement | null): void => {
		if (el instanceof HTMLElement) {
			this.hostElement = el;
			this.syncControl();
		}
	};

	public render(): JSX.Element {
		return (
			<Host ref={this.catchHostElement}>
				<slot />
			</Host>
		);
	}
}
