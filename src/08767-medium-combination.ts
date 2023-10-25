// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<
      Combination<["foo", "bar", "baz"]>,
      | "foo"
      | "bar"
      | "baz"
      | "foo bar"
      | "foo bar baz"
      | "foo baz"
      | "foo baz bar"
      | "bar foo"
      | "bar foo baz"
      | "bar baz"
      | "bar baz foo"
      | "baz foo"
      | "baz foo bar"
      | "baz bar"
      | "baz bar foo"
    >
  >
];

// ============= Your Code Here =============

type Combination<T extends string[]> = Combination2<T[number]>;
type Combination2<S extends string, U extends string = S> = [S] extends [never]
  ? never
  : U extends U
  ?
      | `${U}${[Exclude<S, U>] extends [never]
          ? ""
          : ` ${Combination2<Exclude<S, U>>}`}`
      | `${Combination2<Exclude<S, U>>}`
  : never;

type A = Combination<["foo", "bar", "baz"]>;
