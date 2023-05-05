// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>
];

// ============= Your Code Here =============
type ToCharArray<
  S extends string,
  Res extends string[] = []
> = S extends `${infer C}${infer Tail}` ? ToCharArray<Tail, [...Res, C]> : Res;
type IsPalindrome<
  T extends string | number,
  A extends string[] = ToCharArray<`${T}`>
> = A extends []
  ? true
  : A extends [string]
  ? true
  : A extends [infer Head, ...infer Rest extends string[], infer Tail]
  ? Head extends Tail
    ? IsPalindrome<'', Rest>
    : false
  : false;
