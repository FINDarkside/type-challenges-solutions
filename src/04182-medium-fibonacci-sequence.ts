// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
];

// ============= Your Code Here =============
type Fibonacci<
  T extends number,
  Prev extends { a: any[]; b: any[] } = { a: [1]; b: [1] },
  Counter extends any[] = [1, 1, 1],
  LastTwoSum extends any[] = [...Prev["a"], ...Prev["b"]]
> = T extends 1
  ? 1
  : T extends 2
  ? 1
  : T extends Counter["length"]
  ? [...Prev["a"], ...Prev["b"]]["length"]
  : Fibonacci<T, { a: Prev["b"]; b: LastTwoSum }, [...Counter, 1]>;
