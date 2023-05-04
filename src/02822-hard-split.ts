// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Split<'Hi! How are you?', 'z'>, ['Hi! How are you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ' '>, ['Hi!', 'How', 'are', 'you?']>>,
  Expect<
    Equal<
      Split<'Hi! How are you?', ''>,
      [
        'H',
        'i',
        '!',
        ' ',
        'H',
        'o',
        'w',
        ' ',
        'a',
        'r',
        'e',
        ' ',
        'y',
        'o',
        'u',
        '?'
      ]
    >
  >,
  Expect<Equal<Split<'', ''>, []>>,
  Expect<Equal<Split<'', 'z'>, ['']>>,
  Expect<Equal<Split<string, 'whatever'>, string[]>>
];

// ============= Your Code Here =============
type Split<
  S extends string,
  SEP extends string,
  Res extends string[] = []
> = S extends SEP
  ? []
  : string extends S
  ? string[]
  : S extends `${infer Head}${SEP}${infer Tail}`
  ? Tail extends ''
    ? [...Res, Head]
    : Split<Tail, SEP, [...Res, Head]>
  : [...Res, S];

type A = Split<'', ''>;

type B = '' extends `${infer Head}${''}${infer Tail}` ? true : false;
