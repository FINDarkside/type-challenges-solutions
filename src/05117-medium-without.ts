// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];

// ============= Your Code Here =============

type Without<
  T extends number[],
  U extends number[] | number,
  ToRemove extends any[] = U extends any[] ? U : [U]
> = T extends [infer Head, ...infer Rest extends number[]]
  ? Head extends ToRemove[number]
    ? Without<Rest, ToRemove>
    : [Head, ...Without<Rest, U>]
  : T;
