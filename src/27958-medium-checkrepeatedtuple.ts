// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';
import { ExpectFalse, NotEqual } from './test-utils';

type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>
];

// ============= Your Code Here =============

type Contains<Arr extends any[], V extends any> = V extends Arr[number]
  ? true
  : false;
type CheckRepeatedTuple<T extends unknown[]> = T extends [
  infer H,
  ...infer Tail
]
  ? Contains<Tail, H> extends true
    ? true
    : CheckRepeatedTuple<Tail>
  : false;
