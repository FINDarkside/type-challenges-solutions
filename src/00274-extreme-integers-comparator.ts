// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<
    Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>
  >,
  Expect<
    Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>
  >,
  Expect<
    Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>
  >,
  Expect<
    Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>
  >,
  Expect<
    Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>
  >,
  Expect<
    Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>
  >
];

// ============= Your Code Here =============
enum Comparison {
  Greater,
  Equal,
  Lower,
}

type ToCharArray<
  T extends string,
  Result extends string[] = []
> = T extends `${infer Char}${infer Tail}`
  ? ToCharArray<Tail, [...Result, Char]>
  : Result;

// Helper function to for smaller numbers. Return 1 if first argument is greater
// 0 if numbers are equal and -1 if first argument is smaller
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

type Comparator<
  Num1 extends number,
  Num2 extends number
> = `${Num1}` extends `-${infer Num1Abs}`
  ? `${Num2}` extends `-${infer Num2Abs}`
    ? // Both are negative, lets just flip the arguments
      Comparator2<ToCharArray<Num2Abs>, ToCharArray<Num1Abs>>
    : Comparison.Lower
  : `${Num2}` extends `-${infer PS}`
  ? Comparison.Greater
  : Comparator2<ToCharArray<`${Num1}`>, ToCharArray<`${Num2}`>>;

type Comparator2<Num1 extends string[], Num2 extends string[]> = CompareNumbers<
  Num1["length"],
  Num2["length"]
> extends 1
  ? Comparison.Greater
  : CompareNumbers<Num1["length"], Num2["length"]> extends -1
  ? Comparison.Lower
  : Num1 extends [infer Head extends string, ...infer Rest extends string[]]
  ? Num2 extends [infer Head2 extends string, ...infer Rest2 extends string[]]
    ? CompareNumbers<ToNumber<Head>, ToNumber<Head2>> extends 1
      ? Comparison.Greater
      : CompareNumbers<ToNumber<Head>, ToNumber<Head2>> extends -1
      ? Comparison.Lower
      : Comparator2<Rest, Rest2>
    : never
  : Comparison.Equal;
