// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

// ============= Your Code Here =============

type ToCharArray<
  T extends string,
  Result extends string[] = []
> = T extends `${infer Char}${infer Tail}`
  ? ToCharArray<Tail, [...Result, Char]>
  : Result;

type CharArrayToString<T extends string[]> = T extends [
  ...infer Head extends string[],
  infer Tail extends string
]
  ? `${CharArrayToString<Head>}${Tail}`
  : '';

type CharArrayToNumber<T extends string[]> = CharArrayToString<
  RemoveLeadingZero<T>
> extends `${infer N extends number}`
  ? N
  : never;

type RemoveLeadingZero<T extends string[]> = T extends ['0', ...infer Rest]
  ? Rest
  : T;

type MinusOne<N extends number> = N extends 0
  ? -1
  : N extends 1
  ? 0
  : CharArrayToNumber<MinusOne2<ToCharArray<`${N}`>>>;

type MinusTable = {
  '0': never;
  '1': '0';
  '2': '1';
  '3': '2';
  '4': '3';
  '5': '4';
  '6': '5';
  '7': '6';
  '8': '7';
  '9': '8';
};

type MinusOne2<T extends string[]> = T extends [
  ...infer Head extends string[],
  infer Last extends keyof MinusTable
]
  ? Last extends '0'
    ? [...MinusOne2<Head>, '9']
    : [...Head, MinusTable[Last]]
  : [];
