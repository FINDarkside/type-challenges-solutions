// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
];

// ============= Your Code Here =============
type Chunk<
  T extends any[],
  Size extends number,
  Acc extends any[] = []
> = Acc["length"] extends Size
  ? [Acc, ...Chunk<T, Size>]
  : T extends [infer Head, ...infer Rest]
  ? Chunk<Rest, Size, [...Acc, Head]>
  : Acc["length"] extends 0
  ? []
  : [Acc];
