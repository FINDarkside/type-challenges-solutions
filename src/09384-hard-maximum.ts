// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>
];

// ============= Your Code Here =============
type GreaterThan<
  T extends number,
  U extends number,
  Count extends any[] = []
> = Count["length"] extends T
  ? false
  : Count["length"] extends U
  ? true
  : GreaterThan<T, U, [...Count, true]>;

type Maximum<
  T extends number[],
  Largest extends never | number = never
> = T extends [infer Head extends number, ...infer Rest extends number[]]
  ? [Largest] extends [never]
    ? Maximum<Rest, Head>
    : GreaterThan<Head, Largest> extends true
    ? Maximum<Rest, Head>
    : Maximum<Rest, Largest>
  : Largest;
