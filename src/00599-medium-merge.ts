// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
  c: boolean;
};

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number;
        b: number;
        c: boolean;
      }
    >
  >
];

// ============= Your Code Here =============
type Simplify<T> = { [P in keyof T]: T[P] };
type Merge<F, S> = Simplify<Omit<F, keyof S> & S>;

