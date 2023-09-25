// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  Expect<Equal<CheckRepeatedChars<"abc">, false>>,
  Expect<Equal<CheckRepeatedChars<"abb">, true>>,
  Expect<Equal<CheckRepeatedChars<"cbc">, true>>,
  Expect<Equal<CheckRepeatedChars<"">, false>>
];

// ============= Your Code Here =============
type CheckRepeatedChars<
  S extends string,
  Used = never
> = S extends `${infer C}${infer Rest}`
  ? C extends Used
    ? true
    : CheckRepeatedChars<Rest, Used | C>
  : false;
