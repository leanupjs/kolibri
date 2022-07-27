import React from 'react';
import { createRoot, Root } from 'react-dom/client';

const ROOTS = new WeakMap<Element | DocumentFragment | Root>();

export const getRoot = (el: Element | DocumentFragment): Root => {
	if (ROOTS.has(el) === false) {
		ROOTS.set(el, createRoot(el));
	}
	return ROOTS.get(el);
};

export const render = (el: Element | DocumentFragment, children: React.ReactNode) => getRoot(el).render(children);
