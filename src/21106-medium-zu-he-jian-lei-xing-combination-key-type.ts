// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type CaseTypeOne =
  | "cmd ctrl"
  | "cmd opt"
  | "cmd fn"
  | "ctrl opt"
  | "ctrl fn"
  | "opt fn";

type cases = [Expect<Equal<Combs, CaseTypeOne>>];

// ============= Your Code Here =============
type ModifierKeys = ["cmd", "ctrl", "opt", "fn"];

// 实现 Combs
type Combs<
  T extends string[] = ModifierKeys,
  Res extends string[] = []
> = Res["length"] extends 2
  ? `${Res[0]} ${Res[1]}`
  : T extends [infer Head extends string, ...infer Rest extends string[]]
  ? Combs<Rest, [...Res, Head]> | Combs<Rest, Res>
  : never;
