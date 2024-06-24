// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';
type cases = [
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5]>,
      {
        1: 1;
        2: 1;
        3: 1;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>,
      {
        1: 2;
        2: 2;
        3: 2;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>,
      {
        1: 3;
        2: 3;
        3: 2;
        4: 3;
        5: 1;
      }
    >
  >,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<
    Equal<
      CountElementNumberToObject<['1', '2', '0']>,
      {
        0: 1;
        1: 1;
        2: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<['a', 'b', ['c', ['d']]]>,
      {
        a: 1;
        b: 1;
        c: 1;
        d: 1;
      }
    >
  >
];

// ============= Your Code Here =============
type FieldKey = string | symbol | number;
type Flatten<T> = T extends [infer Head, ...infer Rest]
  ? [Head] extends [never]
    ? Flatten<Rest>
    : Head extends any[]
    ? Flatten<[...Head, ...Rest]>
    : [Head, ...Flatten<Rest>]
  : [];

type Count<T, Res extends Record<FieldKey, number[]> = {}> = T extends [
  infer Head,
  ...infer Rest
]
  ? Count<
      Rest,
      {
        [K in Exclude<keyof Res, Head>]: Res[K];
      } & {
        [K in Head extends FieldKey ? Head : never]: Head extends keyof Res
          ? [...Res[K], 1]
          : [1];
      }
    >
  : {
      [K in keyof Res]: Res[K]['length'];
    };

type CountElementNumberToObject<T> = Count<Flatten<T>>;
