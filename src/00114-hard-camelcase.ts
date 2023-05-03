// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo__bar'>, 'foo_Bar'>>,
  Expect<Equal<CamelCase<'foo_$bar'>, 'foo_$bar'>>,
  Expect<Equal<CamelCase<'foo_bar_'>, 'fooBar_'>>,
  Expect<Equal<CamelCase<'foo_bar__'>, 'fooBar__'>>,
  Expect<Equal<CamelCase<'foo_bar_$'>, 'fooBar_$'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>
];

// ============= Your Code Here =============
type IsNormalChar<C extends string> = Uppercase<C> extends Lowercase<C>
  ? false
  : true;

type CamelCase<S extends string> = RealCamelCase<Lowercase<S>>;
type RealCamelCase<S extends string> =
  S extends `${infer Word}_${infer NextWordFirstChar}${infer NextWordRest}`
    ? IsNormalChar<NextWordFirstChar> extends true
      ? `${Word}${RealCamelCase<`${Uppercase<NextWordFirstChar>}${NextWordRest}`>}`
      : `${Word}_${RealCamelCase<`${NextWordFirstChar}${NextWordRest}`>}`
    : S;
