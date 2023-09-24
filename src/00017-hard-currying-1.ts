// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const curried1 = Currying((a: string, b: number, c: boolean) => true);
const curried2 = Currying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean
  ) => true
);
const curried3 = Currying(() => true);

type cases = [
  Expect<
    Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>
  >,
  Expect<
    Equal<
      typeof curried2,
      (
        a: string
      ) => (
        b: number
      ) => (
        c: boolean
      ) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >
  >,
  Expect<Equal<typeof curried3, () => true>>
];

// ============= Your Code Here =============
type NonShittyReturnType<T> = T extends (...args: any) => infer R ? R : never;
type NonShittyArguments<T> = T extends (...args: infer A) => any ? A : never;
declare function Currying<T extends Function>(
  fn: T
): NonShittyArguments<T> extends []
  ? () => NonShittyReturnType<T>
  : Curried<NonShittyArguments<T>, NonShittyReturnType<T>>;

type Curried<Args, Res> = Args extends [infer Head, ...infer Tail]
  ? (val: Head) => Curried<Tail, Res>
  : Res;
