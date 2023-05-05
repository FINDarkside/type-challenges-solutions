// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>;
type Result1 = (a: number, b: string, x: boolean) => number;

type Case2 = AppendArgument<() => void, undefined>;
type Result2 = (x: undefined) => void;

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>
];

// ============= Your Code Here =============
type Function = (...args: any) => any;
type ArgumentTypes<T> = T extends (...args: infer Args) => unknown
  ? Args
  : never;
type AppendArgument<Fn extends Function, A> = (
  ...args: [...ArgumentTypes<Fn>, A]
) => ReturnType<Fn>;
