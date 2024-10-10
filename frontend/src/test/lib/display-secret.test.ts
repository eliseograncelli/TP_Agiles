import { render } from '@testing-library/svelte';
import DisplaySecret from '$lib/display-secret.svelte';
import { describe, expect, test } from 'vitest';

describe('DisplaySecret', () => {
	test('should render', () => {
		const results = render(DisplaySecret, { props: { encoded: 'secret' } });
		expect(() => results.getByTestId('container')).not.toThrow();
	});

	test('render all letters', () => {
		const encoded = 'secret';
		const results = render(DisplaySecret, { props: { encoded } });
		const { length } = results.container.querySelectorAll('span');
		expect(length).toBe(encoded.length);
	});

	test('render all letters with _', () => {
		const encoded = '####';
		const results = render(DisplaySecret, { props: { encoded } });
		const spans = results.container.querySelectorAll('span');
		spans.forEach((span) => {
			expect(span.textContent).toBe('_');
		});
	});

	test('render all letters with _ except one (first)', () => {
		const encoded = 'H###';
		const results = render(DisplaySecret, { props: { encoded } });
		const spans = results.container.querySelectorAll('span');
		expect(spans[0].textContent).toBe('H');
		expect(spans[1].textContent).toBe('_');
		expect(spans[2].textContent).toBe('_');
		expect(spans[3].textContent).toBe('_');
	});

	test('render all letters with _ except one (third)', () => {
		const encoded = '##L#';
		const results = render(DisplaySecret, { props: { encoded } });
		const spans = results.container.querySelectorAll('span');
		expect(spans[0].textContent).toBe('_');
		expect(spans[1].textContent).toBe('_');
		expect(spans[2].textContent).toBe('L');
		expect(spans[3].textContent).toBe('_');
	});

	test('render all letters with _ except two (second and fourth)', () => {
		const encoded = '#O#A';
		const results = render(DisplaySecret, { props: { encoded } });
		const spans = results.container.querySelectorAll('span');
		expect(spans[0].textContent).toBe('_');
		expect(spans[1].textContent).toBe('O');
		expect(spans[2].textContent).toBe('_');
		expect(spans[3].textContent).toBe('A');
	});

	test('is case insensitive', () => {
		const encoded = 'h###';
		const results = render(DisplaySecret, { props: { encoded } });
		const spans = results.container.querySelectorAll('span');
		expect(spans[0].textContent).toBe('H');
		expect(spans[1].textContent).toBe('_');
		expect(spans[2].textContent).toBe('_');
		expect(spans[3].textContent).toBe('_');
	});
});
