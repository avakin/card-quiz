declare module "pokersolver" {
  export class Hand {
    static solve(cards: string[]): Hand;
    descr: string;
    name: string;
  }
}
