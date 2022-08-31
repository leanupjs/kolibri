import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { watchString } from '../../utils/prop.validators';

/**
 * API
 */
type RequiredProps = {
	name: string;
};
type OptionalProps = unknown;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	name: string;
};
type OptionalStates = unknown;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'lean-test-open',
	shadow: false,
})
export class LeanTestOpen implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	private hostElement: HTMLElement | null = null;

	@Prop() public _name!: string;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_name: '',
	};

	@Watch('_name')
	public validateName(value?: string): void {
		watchString(this, '_name', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateName(this._name);
	}

	private catchHostElement = (el: HTMLElement | null): void => {
		this.hostElement = el;
		console.log(this.hostElement);
	};

	public render(): JSX.Element {
		return (
			<Host ref={this.catchHostElement}>
				<span>
					<strong>Name:</strong> {this.state._name}
				</span>
				<slot />
			</Host>
		);
	}
}
