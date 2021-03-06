import R from 'ramda';
import {
	alwaysNull,
	alwaysEmptyString,
	alwaysEmptyObject,
	alwaysEmptyArray,
	toUpperFirst,
	toLowerFirst,
	toCamelCase,
	toPascalCase,
	toSnakeCase,
	toKebabCase,
	toDotCase,
	toScreamingSnakeCase,
	startsWithPrefix,
	endsWithSuffix,
	dispatch,
	noop,
	isNumeric,
	unfoldObjectDots,
	reduceCallable,
	constructRegExp,
	listToString,
	splitByNonAlphaNumeric,
	argumentsToList,
	splitByDot,
	containsAll,
	containsAny,
	dissocDotPath,
	overHead,
	dotPath,
	assocDotPath,
	mergeWithDotPath,
	mapKeys,
} from '../';

describe('noop', () => {
	it('returns null', () => {
		expect(noop()).toBe(null);
	});
});

describe('alwaysNull', () => {
	it('returns null', () => {
		expect(alwaysNull()).toBe(null);
	});
});
describe('alwaysEmptyString', () => {
	it('returns \'\'', () => {
		expect(alwaysEmptyString()).toBe('');
	});
});
describe('alwaysEmptyObject', () => {
	it('returns {}', () => {
		expect(alwaysEmptyObject()).toEqual({});
	});
});
describe('alwaysEmptyArray', () => {
	it('returns []', () => {
		expect(alwaysEmptyArray()).toEqual([]);
	});
});

describe('isNumeric', () => {
	it('returns true for finite numbers', () => {
		expect(R.any(R.equals(true), [isNumeric(-1), isNumeric(0), isNumeric(1), isNumeric(1.1)])).toBe(true);
	});

	it('returns false for infinite numbers and non-number types', () => {
		expect(
			R.any(R.equals(true), [
				isNumeric(Infinity),
				isNumeric(NaN),
				isNumeric(''),
				isNumeric(() => { }),
				isNumeric(false),
				isNumeric(null),
				isNumeric(undefined),
				isNumeric({}),
				isNumeric([]),
			])
		).toBe(false);
	});
});

describe('unfoldObjectDots', () => {
	it('should unfold object', () => {
		expect(unfoldObjectDots({ 'a.b.c': 1, 'd.e.f': 2, g: 3 })).toEqual({
			a: { b: { c: 1 } },
			d: { e: { f: 2 } },
			g: 3,
		});
	});
});

describe('dispatch', () => {
	it('should return first not nil result ', () => {
		expect(dispatch([R.always(null), R.identity, R.always(null)], 3)).toBe(3);
	});
	it('should return undefined', () => {
		expect(dispatch([R.always(null), R.identity, R.always(null)], null)).toBe(undefined);
	});
});

describe('reduceCallable', () => {
	it('should return result after appling arguments ', () => {
		expect(reduceCallable((a) => (b) => a + b, [1, 2])).toBe(3);
	});
});

describe('startsWithPrefix', () => {
	const startsWithPrefixUtil = (prefix, str, result) =>
		it(`should return ${result} if '${str}' starts with '${prefix}'`, () => {
			expect(startsWithPrefix(prefix, str)).toBe(result);
		});

	startsWithPrefixUtil('', 'hello', true);
	startsWithPrefixUtil('h', 'hello', true);
	startsWithPrefixUtil('he', 'hello', true);
	startsWithPrefixUtil('h', 'good bye', false);
});
describe('endsWithSuffix', () => {
	const endsWithSuffixUtil = (suffix, str, result) =>
		it(`should return ${result} if '${str}' to ends with '${suffix}'`, () => {
			expect(endsWithSuffix(suffix, str)).toBe(result);
		});

	endsWithSuffixUtil('', 'hello', true);
	endsWithSuffixUtil('o', 'hello', true);
	endsWithSuffixUtil('lo', 'hello', true);
	endsWithSuffixUtil('d', 'good bye', false);
});

describe('constructRegExp', () => {
	it('should return RegExp ', () => {
		expect(constructRegExp('end$', 'gi') instanceof RegExp).toBe(true);
	});

	it('should return proper RegExp ', () => {
		expect(R.test(constructRegExp('end$', 'gi'), 'in the end')).toBe(true);
	});
});

describe('toUpperFirst', () => {
	it('capitalize first letter', () => {
		expect(toUpperFirst('hello')).toBe('Hello');
	});
});

describe('toLowerFirst', () => {
	it('decapitalize first letter', () => {
		expect(toLowerFirst('HELLO')).toBe('hELLO');
	});
});

describe('splitByNonAlphaNumeric', () => {
	describe('should split string by non-alphanumeric characters', () => {
		const splitByNonAlphaNumericUtil = (str, result) =>
			it(`${str} to be ${result}`, () => expect(splitByNonAlphaNumeric(str)).toEqual(result));

		splitByNonAlphaNumericUtil('h  e.l//l o wo.../r8****ld', ['h', 'e', 'l', 'l', 'o', 'wo', 'r8', 'ld']);
	});
});

describe('listToString', () => {
	it('converts list to string', () => {
		expect(listToString(['h', 'e', 'l', 'l', 'o'])).toBe('hello');
	});
});

describe('toPascalCase', () => {
	describe('should convert string to PascalCase', () => {
		const toPascalCaseUtil = (str, result) =>
			it(`${str} to be ${result}`, () => expect(toPascalCase(str)).toBe(result));

		toPascalCaseUtil('hello', 'Hello');
		toPascalCaseUtil('hello-', 'Hello');
		toPascalCaseUtil('   hello  ', 'Hello');
		toPascalCaseUtil('hello world', 'HelloWorld');
		toPascalCaseUtil('hello world AND univerSe', 'HelloWorldANDUniverSe');
	});
});

describe('toCamelCase', () => {
	describe('should convert string to cascalCase', () => {
		const toCamelCaseUtil = (str, result) =>
			it(`${str} to be ${result}`, () => expect(toCamelCase(str)).toBe(result));

		toCamelCaseUtil('hello', 'hello');
		toCamelCaseUtil('hello-', 'hello');
		toCamelCaseUtil('   hello  ', 'hello');
		toCamelCaseUtil('hello world', 'helloWorld');
		toCamelCaseUtil('hello world AND univerSe', 'helloWorldANDUniverSe');
	});
});

describe('toCamelCase', () => {
	describe('should convert string to cascalCase', () => {
		const toCamelCaseUtil = (str, result) =>
			it(`${str} to be ${result}`, () => expect(toCamelCase(str)).toBe(result));

		toCamelCaseUtil('hello', 'hello');
		toCamelCaseUtil('hello-', 'hello');
		toCamelCaseUtil('   hello  ', 'hello');
		toCamelCaseUtil('hello world', 'helloWorld');
		toCamelCaseUtil('hello world AND univerSe', 'helloWorldANDUniverSe');
	});
});


describe('toScreamingSnakeCase', () => {
	describe('should convert string to SCREAMING_SNAKE_CASE', () => {
		const toScreamingSnakeCaseUtil = (str, result) =>
			it(`${str} to be ${result}`, () => expect(toScreamingSnakeCase(str)).toBe(result));

		toScreamingSnakeCaseUtil('hello', 'HELLO');
		toScreamingSnakeCaseUtil('hello-', 'HELLO');
		toScreamingSnakeCaseUtil('   hello  ', 'HELLO');
		toScreamingSnakeCaseUtil('hello world', 'HELLO_WORLD');
		toScreamingSnakeCaseUtil('hello world AND univerSe', 'HELLO_WORLD_AND_UNIVERSE');
	});
});

describe('toSnakeCase', () => {
	describe('should convert string to snake_case', () => {
		const toSnakeCaseUtil = (str, result) =>
			it(`${str} to be ${result}`, () => expect(toSnakeCase(str)).toBe(result));

		toSnakeCaseUtil('hello', 'hello');
		toSnakeCaseUtil('hello-', 'hello');
		toSnakeCaseUtil('   hello  ', 'hello');
		toSnakeCaseUtil('hello world', 'hello_world');
		toSnakeCaseUtil('hello world AND univerSe', 'hello_world_and_universe');
	});
});


describe('toKebabCase', () => {
	describe('should convert string to kebab-case', () => {
		const toKebabCaseUtil = (str, result) =>
			it(`${str} to be ${result}`, () => expect(toKebabCase(str)).toBe(result));

		toKebabCaseUtil('hello', 'hello');
		toKebabCaseUtil('hello-', 'hello');
		toKebabCaseUtil('   hello  ', 'hello');
		toKebabCaseUtil('hello world', 'hello-world');
		toKebabCaseUtil('hello world AND univerSe', 'hello-world-and-universe');
	});
});


describe('toDotCase', () => {
	describe('should convert string to dot.case', () => {
		const toDotCaseUtil = (str, result) =>
			it(`${str} to be ${result}`, () => expect(toDotCase(str)).toBe(result));

		toDotCaseUtil('hello', 'hello');
		toDotCaseUtil('hello-', 'hello');
		toDotCaseUtil('   hello  ', 'hello');
		toDotCaseUtil('hello world', 'hello.world');
		toDotCaseUtil('hello world AND univerSe', 'hello.world.and.universe');
	});
});

describe('argumentsToList', () => {
	it('converts variadic arguments into list', () => {
		expect(argumentsToList(1, 3, 4, 3)).toEqual([1, 3, 4, 3]);
	});
});

describe('splitByDot', () => {
	it('splits string by dot', () => {
		expect(splitByDot('a.b.c')).toEqual(['a', 'b', 'c']);
	});
});

describe('containsAll', () => {
	it('resolves to true if all elements in first list are found within the second list', () => {
		expect(containsAll(['a', 'b'], ['a', 'b', 'c'])).toBe(true);
	});
	it('resolves to false if any element in first list is not found within the second list', () => {
		expect(containsAll(['a', 'b', 'd'], ['a', 'b', 'c'])).toBe(false);
	});
});


describe('containsAny', () => {
	it('resolves to true if at least one element from first list is found within the second list', () => {
		expect(containsAny(['a', 'e'], ['a', 'b', 'c'])).toBe(true);
	});
	it('resolves to false if non element from first list is not found within the second list', () => {
		expect(containsAny(['e', 'f'], ['a', 'b', 'c'])).toBe(false);
	});
});

describe('overHead', () => {
	it('should remap first index of array', () => {
		expect(overHead(R.toUpper, ['foo', 'bar', 'baz'])).toEqual(['FOO', 'bar', 'baz']);
	});
});

describe('dissocDotPath', () => {
	it('should return object without attribute defined in given path', () => {
		const result = dissocDotPath('k1.k2', { k1: { k2: { a: '', b: 2, c: [] }, k3: {} }} );
		expect(result.k1).toBeDefined();
		expect(result.k1.k3).toBeDefined();
		expect(result.k1.k2).toBeUndefined();
	});
	it('should return whole object when nothing find on path', () => {
		const result = dissocDotPath('key1.key4', { k1: { k2: { a: '', b: 2, c: [] }, k3: {} } });
		expect(result).toEqual({ k1: { k2: { a: '', b: 2, c: [] }, k3: {} } });
	});
});

describe('dotPath', () => {
	it('should get property on the given dot path', () => {
		expect(dotPath('a.b', { a: { b: 2 } })).toEqual(2);
	});
	it('should return undefined when nothing found on the path', () => {
		expect(dotPath('b.c', { a: { b: 2 } })).toBeUndefined();
	});
});

describe('assocDotPath', () => {
	it('should set property on the given dot path', () => {
		expect(assocDotPath('a.b', 2, { a: undefined })).toEqual({ a: { b: 2 } });
	});
});

describe('mergeWithDotPath', () => {
	it('should merge the data in resulting object', () => {
		expect(mergeWithDotPath('a.b', R.merge, { d: 30 }, { a: { b: { c: 20 } } }))
			.toEqual({ a: { b: { c: 20, d: 30 } } });
	});
});
describe('mapKeys', () => {
	it('should map keys of the object', () => {
		expect(mapKeys(toUpperFirst, { x: 1, y: 2, z: 3 })).toEqual({ X: 1, Y: 2, Z: 3 });
	});
});
