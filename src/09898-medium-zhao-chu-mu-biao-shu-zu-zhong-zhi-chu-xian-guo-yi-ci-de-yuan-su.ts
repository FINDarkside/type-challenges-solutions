// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>
];

// ============= Your Code Here =============
type FindEles<T extends any[], U = never> = T extends [
  infer Head,
  ...infer Rest
]
  ? Head extends U
    ? FindEles<Rest, U>
    : Head extends Rest[number]
    ? FindEles<Rest, U | Head>
    : [Head, ...FindEles<Rest, U | Head>]
  : [];
