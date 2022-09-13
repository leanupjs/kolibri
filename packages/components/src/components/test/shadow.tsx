import { Component, h, JSX, Prop } from '@stencil/core';
import { Props } from './component';

@Component({
	tag: 'lean-test-closed',
	shadow: true,
})
export class LeanTestClosed implements Props {
	@Prop() public _name!: string;

	public render(): JSX.Element {
		return (
			<lean-test-open _name={this._name}>
				<slot />
			</lean-test-open>
		);
	}
}
