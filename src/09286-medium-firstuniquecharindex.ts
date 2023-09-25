// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
  Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
  Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"aaa">, -1>>
];

// ============= Your Code Here =============
type ToCharArray<
  T extends string,
  Result extends string[] = []
> = T extends `${infer Char}${infer Tail}`
  ? ToCharArray<Tail, [...Result, Char]>
  : Result;

type FirstUniqueCharIndex<
  S extends string,
  Used = never,
  Index extends any[] = []
> = S extends `${infer C}${infer Rest}`
  ? C extends Used
    ? FirstUniqueCharIndex<Rest, Used, [...Index, 1]>
    : C extends ToCharArray<Rest>[number]
    ? FirstUniqueCharIndex<Rest, Used | C, [...Index, 1]>
    : Index["length"]
  : -1;
