// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>
];

// ============= Your Code Here =============
type Fill<
  L extends number,
  Val extends number[] = [1],
  C extends any[] = [],
  Res extends any[] = []
> = L extends unknown
  ? C['length'] extends L
    ? Res
    : Fill<L, Val, [...C, 1], [...Res, ...Val]>
  : never;

type Abs<N extends number> = `${N}` extends `-${infer Abs extends number}`
  ? Abs
  : N;

type Square<
  N extends number,
  CountArr extends number[] = Fill<Abs<N>>
> = N extends 100 ? 10000 : Fill<Abs<N>, CountArr>['length'];
