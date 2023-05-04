// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';
import { ExpectFalse, NotEqual } from './test-utils';

type cases = [
  Expect<Equal<SnakeCase<'hello'>, 'hello'>>,
  Expect<Equal<SnakeCase<'userName'>, 'user_name'>>,
  Expect<Equal<SnakeCase<'getElementById'>, 'get_element_by_id'>>,
  Expect<
    Equal<
      SnakeCase<'getElementById' | 'getElementByClassNames'>,
      'get_element_by_id' | 'get_element_by_class_names'
    >
  >
];

type IsUpperCase<C extends string> = C extends Uppercase<C>
  ? Lowercase<C> extends Uppercase<C>
    ? false
    : true
  : false;

// ============= Your Code Here =============
type SnakeCase<T, Res extends string = ''> = T extends `${infer C}${infer Tail}`
  ? IsUpperCase<C> extends true
    ? `${Res}_${SnakeCase<`${Lowercase<C>}${Tail}`>}`
    : SnakeCase<Tail, `${Res}${C}`>
  : Res;
