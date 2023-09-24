// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];

// ============= Your Code Here =============
type ToCharArray<
  T extends string,
  Result extends string[] = []
> = T extends `${infer Char}${infer Tail}`
  ? ToCharArray<Tail, [...Result, Char]>
  : Result;

// Helper function to implement GreaterThan for small numbers
type CompareNumbers<
  T extends number,
  U extends number,
  Count extends any[] = []
> = Count["length"] extends T
  ? Count["length"] extends U
    ? 0
    : -1
  : Count["length"] extends U
  ? 1
  : CompareNumbers<T, U, [...Count, true]>;

type ToNumber<S extends string> = S extends `${infer Num extends number}`
  ? Num
  : never;

type GreaterThan<T extends number, U extends number> = GreaterThan2<
  ToCharArray<`${T}`>,
  ToCharArray<`${U}`>
>;

type GreaterThan2<TS extends string[], US extends string[]> = CompareNumbers<
  TS["length"],
  US["length"]
> extends 1
  ? true
  : CompareNumbers<TS["length"], US["length"]> extends -1
  ? false
  : TS extends [infer Head extends string, ...infer Rest extends string[]]
  ? US extends [infer Head2 extends string, ...infer Rest2 extends string[]]
    ? CompareNumbers<ToNumber<Head>, ToNumber<Head2>> extends 1
      ? true
      : CompareNumbers<ToNumber<Head>, ToNumber<Head2>> extends -1
      ? false
      : GreaterThan2<Rest, Rest2>
    : never
  : false;
