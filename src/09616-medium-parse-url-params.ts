// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<ParseUrlParams<''>, never>>,
  Expect<Equal<ParseUrlParams<':id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user'>, 'id' | 'user'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user/like'>, 'id' | 'user'>>
];

// ============= Your Code Here =============
type ParseUrlParams<
  T,
  CurrentString extends string = '',
  IsKey = false,
  Result extends string[] = []
> = T extends `${infer First}${infer Rest extends string}`
  ? First extends '/'
    ? IsKey extends true
      ? ParseUrlParams<Rest, '', false, [...Result, CurrentString]>
      : ParseUrlParams<Rest, '', false, Result>
    : First extends ':'
    ? ParseUrlParams<Rest, '', true, Result>
    : ParseUrlParams<Rest, `${CurrentString}${First}`, IsKey, Result>
  : IsKey extends true
  ? [...Result, CurrentString][number]
  : Result[number];
