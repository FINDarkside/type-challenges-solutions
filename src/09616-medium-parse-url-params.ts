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
type ParseUrlParams<T extends string> = T extends `${infer Head}/${infer Tail}`
  ? ParseUrlParams<Head> | ParseUrlParams<Tail>
  : T extends `:${infer Rest}`
  ? Rest
  : never;
