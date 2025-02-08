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
type DeepOmit<
  T,
  Path extends string
> = Path extends `${infer KeyToOmit}.${infer Rest}`
  ? {
      [K in keyof T]: K extends KeyToOmit ? DeepOmit<T[K], Rest> : T[K];
    }
  : { [K in keyof T as K extends Path ? never : K]: T[K] };
