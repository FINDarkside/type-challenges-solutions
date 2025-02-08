// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';
import { ExpectFalse, NotEqual } from './test-utils';

type cases = [
  Expect<Equal<Transpose<[]>, []>>,
  Expect<Equal<Transpose<[[1]]>, [[1]]>>,
  Expect<Equal<Transpose<[[1, 2]]>, [[1], [2]]>>,
  Expect<Equal<Transpose<[[1, 2], [3, 4]]>, [[1, 3], [2, 4]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6]]>, [[1, 4], [2, 5], [3, 6]]>>,
  Expect<Equal<Transpose<[[1, 4], [2, 5], [3, 6]]>, [[1, 2, 3], [4, 5, 6]]>>,
  Expect<
    Equal<
      Transpose<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
    >
  >
];

// ============= Your Code Here =============

type PickAt<
  Arrays extends number[][],
  Index extends number,
  Res extends number[] = []
> = Arrays extends [
  infer Head extends number[],
  ...infer Rest extends number[][]
]
  ? PickAt<Rest, Index, [...Res, Head[Index]]>
  : Res;

type Transpose<
  M extends number[][],
  Count extends any[] = [],
  Res extends number[][] = []
> = Count['length'] extends M[0]['length']
  ? Res
  : Transpose<M, [...Count, 1], [...Res, PickAt<M, Count['length']>]>;
