import { Theme } from 'adopted-style-sheets';

enum TagEnum {
	'input-adapter',
}

enum KeyEnum {}

export const LeanUp = new Theme<'lean', keyof typeof KeyEnum, keyof typeof TagEnum>('lean', KeyEnum, TagEnum);
