// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Triangular<0>, 0>>,
  Expect<Equal<Triangular<1>, 1>>,
  Expect<Equal<Triangular<3>, 6>>,
  Expect<Equal<Triangular<10>, 55>>,
  Expect<Equal<Triangular<20>, 210>>,
  Expect<Equal<Triangular<55>, 1540>>,
  Expect<Equal<Triangular<100>, 5050>>
];

// ============= Your Code Here =============
type A = Triangular<1>;

type Triangular<
  N extends number,
  Count extends number[] = [],
  Sum extends number[] = []
> = Count['length'] extends N
  ? [...Sum, ...Count]['length']
  : Triangular<N, [...Count, 1], [...Sum, ...Count]>;
