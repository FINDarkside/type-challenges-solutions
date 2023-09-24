// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
];

// ============= Your Code Here =============
type FlattenDepth<
  T,
  Depth extends number = 1,
  Count extends any[] = []
> = Count["length"] extends Depth
  ? T
  : T extends [infer Head, ...infer Rest]
  ? Head extends any[]
    ? [
        ...FlattenDepth<Head, Depth, [...Count, true]>,
        ...FlattenDepth<Rest, Depth, Count>
      ]
    : [Head, ...FlattenDepth<Rest, Depth, Count>]
  : T;
