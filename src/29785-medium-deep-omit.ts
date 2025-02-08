// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type obj = {
  person: {
    name: string;
    age: {
      value: number;
    };
  };
};

type cases = [
  Expect<Equal<DeepOmit<obj, 'person'>, {}>>,
  Expect<
    Equal<DeepOmit<obj, 'person.name'>, { person: { age: { value: number } } }>
  >,
  Expect<Equal<DeepOmit<obj, 'name'>, obj>>,
  Expect<
    Equal<
      DeepOmit<obj, 'person.age.value'>,
      { person: { name: string; age: {} } }
    >
  >
];

// ============= Your Code Here =============
type Split<
  S extends string,
  Acc extends string[] = []
> = S extends `${infer Head}.${infer Tail}`
  ? Split<Tail, [...Acc, Head]>
  : [...Acc, S];

type DeepOmit<
  T,
  Path extends string,
  PathParts extends string[] = Split<Path>,
  KeyToOmit = PathParts extends [infer Head, ...any] ? Head : never,
  NextKeys extends string[] = PathParts extends [any, ...infer Tail] ? Tail : []
> = {
  [K in keyof T as PathParts['length'] extends 1
    ? K extends KeyToOmit
      ? never
      : K
    : K]: K extends KeyToOmit
    ? PathParts['length'] extends 1
      ? never
      : DeepOmit<T[K], Path, NextKeys>
    : T[K];
};
