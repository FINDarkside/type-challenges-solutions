// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<
    Equal<
      CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>,
      'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'
    >
  >,
  Expect<Equal<CapitalizeWords<''>, ''>>
];

// ============= Your Code Here =============
type CapitalizeWords<
  S extends string,
  // Acculumate current word here
  Acc extends string = ''
> = S extends `${infer Char}${infer Tail}`
  ? // If character is same in upper and lowercase it's not part of a word
    Uppercase<Char> extends Lowercase<Char>
    ? `${Capitalize<`${Acc}`>}${Char}${CapitalizeWords<Tail>}`
    : CapitalizeWords<Tail, `${Acc}${Char}`>
  : // S was empty string
    Capitalize<Acc>;
