// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ["1", "2"]>, [[1, "1"], [2, "2"]]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>
];

// ============= Your Code Here =============
type Zip<T, U> = T extends [infer Head1, ...infer Rest1]
  ? U extends [infer Head2, ...infer Rest2]
    ? [[Head1, Head2], ...Zip<Rest1, Rest2>]
    : []
  : [];
