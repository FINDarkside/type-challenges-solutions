// ============= Test Cases =============
import type { Equal, Expect, NotEqual } from "./test-utils";

type cases = [
  Expect<Equal<{ a: "pi" }, Flip<{ pi: "a" }>>>,
  Expect<NotEqual<{ b: "pi" }, Flip<{ pi: "a" }>>>,
  Expect<Equal<{ 3.14: "pi"; true: "bool" }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<
    Equal<{ val2: "prop2"; val: "prop" }, Flip<{ prop: "val"; prop2: "val2" }>>
  >
];

// ============= Your Code Here =============
type Key = string | number | symbol;
type Flip<T extends Record<Key, Key | boolean>> = {
  [K in keyof T as T[K] extends true
    ? "true"
    : T[K] extends false
    ? "false"
    : T[K] extends Key
    ? T[K]
    : never]: K;
};
