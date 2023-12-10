import { getThemeDetails, setThemeStyle } from 'adopted-style-sheets';
import { setMode } from '@stencil/core';

export default (): void => {
	setMode((elm) => {
		if (elm.shadowRoot instanceof ShadowRoot) {
			setThemeStyle(elm, getThemeDetails(elm));
		}
		return 'default';
	});
};
