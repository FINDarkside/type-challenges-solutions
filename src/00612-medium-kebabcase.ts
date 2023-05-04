// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>
];

// ============= Your Code Here =============
type IsUpperCase<C extends string> = C extends Uppercase<C>
  ? Lowercase<C> extends Uppercase<C>
    ? false
    : true
  : false;

type KebabCase<
  S extends string,
  Word extends string = ''
> = S extends `${infer C}${infer Tail}`
  ? IsUpperCase<C> extends true
    ? Word extends ''
      ? `${KebabCase<Tail, `${Word}${Lowercase<C>}`>}`
      : `${Word}-${KebabCase<`${Lowercase<C>}${Tail}`>}`
    : KebabCase<Tail, `${Word}${C}`>
  : Word;
