// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>
];

// ============= Your Code Here =============
type NumberToTuple<
  N extends number,
  C extends any[] = []
> = C["length"] extends N ? C : NumberToTuple<N, [...C, 1]>;
type TwoSum<
  T extends number[],
  U extends number,
  UsedNumbers extends any[] = [],
  Sum extends any[] = [],
  IsMatch = UsedNumbers["length"] extends 2
    ? Sum["length"] extends U
      ? true
      : false
    : false
> = UsedNumbers["length"] extends 2
  ? IsMatch
  : T extends [infer N extends number, ...infer Rest extends number[]]
  ? TwoSum<
      Rest,
      U,
      [...UsedNumbers, 1],
      [...Sum, ...NumberToTuple<N>]
    > extends true
    ? true
    : TwoSum<Rest, U, UsedNumbers, Sum>
  : IsMatch;
