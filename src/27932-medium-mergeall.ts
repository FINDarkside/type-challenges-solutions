// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<MergeAll<[]>, {}>>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<MergeAll<[{ a: string }, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{}, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{ a: 1 }, { c: 2 }]>, { a: 1; c: 2 }>>,
  Expect<
    Equal<
      MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>,
      { a: 1 | 2; b: 2; c: 3 }
    >
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>
];

// ============= Your Code Here =============
type DistributedKeys<T> = T extends any ? keyof T : never;
type FieldType<T, K extends string> = T extends Record<K, infer U> ? U : never;
type MergeAll<XS extends Record<string, any>[]> = {
  [K in DistributedKeys<XS[number]>]: FieldType<XS[number], K>;
};
