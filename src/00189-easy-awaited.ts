// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error
type error = MyAwaited<number>;

// ============= Your Code Here =============
type MyPromiseLike = { then: (arg: any) => any };
type MyAwaited<T extends MyPromiseLike> = T extends MyPromiseLike
  ? Parameters<Parameters<T['then']>[0]>[0] extends MyPromiseLike
    ? MyAwaited<Parameters<Parameters<T['then']>[0]>[0]>
    : Parameters<Parameters<T['then']>[0]>[0]
  : T;

type MyAwaited2<T extends MyPromiseLike> = T extends PromiseLike<infer U>
  ? U extends PromiseLike<any>
    ? MyAwaited2<U>
    : U
  : never;

type ASD = MyAwaited<Z>;
