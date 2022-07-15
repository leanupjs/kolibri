import { Theme } from '@a11y-ui/core';

enum TagEnum {
	'input-adapter',
}

enum KeyEnum {}

export const KoliBri = new Theme<'lean', keyof typeof KeyEnum, keyof typeof TagEnum>('lean', KeyEnum, TagEnum);
