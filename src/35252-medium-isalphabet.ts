// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<IsAlphabet<'A'>, true>>,
  Expect<Equal<IsAlphabet<'z'>, true>>,
  Expect<Equal<IsAlphabet<'9'>, false>>,
  Expect<Equal<IsAlphabet<'!'>, false>>,
  Expect<Equal<IsAlphabet<'😂'>, false>>,
  Expect<Equal<IsAlphabet<''>, false>>,
];

// ============= Your Code Here =============
type Chars = 'qwertyuiopåasdfghjklöäzxcvbnm';
type GetAlphabets<
  S extends string,
  Acc extends string[] = [],
> = S extends `${infer Head extends string}${infer Tail}`
  ? GetAlphabets<Tail, [...Acc, Head, Capitalize<Head>]>
  : Acc;
type Alphabets = GetAlphabets<Chars>;
type IsAlphabet<S extends string> = S extends Alphabets[number] ? true : false;
