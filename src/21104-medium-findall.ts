// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<
    Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>
  >,
  Expect<
    Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>
  >,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>
];

// ============= Your Code Here =============
type RemoveFirst<T extends string> = T extends `${string}${infer Rest}`
  ? Rest
  : T;

type FindAll<
  T extends string,
  P extends string,
  Count extends number[] = [],
  Res extends number[] = []
> = P extends ''
  ? []
  : T extends ''
  ? Res
  : T extends `${P}${string}`
  ? FindAll<`${RemoveFirst<T>}`, P, [...Count, 1], [...Res, Count['length']]>
  : FindAll<`${RemoveFirst<T>}`, P, [...Count, 1], Res>;
