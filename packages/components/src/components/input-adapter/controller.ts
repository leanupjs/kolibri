import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';
import { Props, Watches } from './types';

export class ControlledInputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;
	protected readonly name: string;

	public constructor(component: Generic.Element.Component & Props, name: string) {
		this.component = component;
		this.name = name;
	}

	public validateAlert(value?: boolean): void {
		watchBoolean(this.component, '_alert', value);
	}

	public validateTouched(value?: boolean): void {
		watchBoolean(this.component, '_touched', value);
	}

	public componentWillLoad(): void {
		this.validateAlert(this.component._alert);
		this.validateTouched(this.component._touched);
	}
}
