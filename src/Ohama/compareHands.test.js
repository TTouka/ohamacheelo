import compareHands from "./compareHands";

const fumblePatterns = [
  [{ isFumble: true }, { isFumble: true }, -1],
  //
  [{ isFumble: true }, { power: 5 }, 5],
  [{ isFumble: true }, { power: 3 }, 3],
  [{ isFumble: true }, { power: 2 }, 2],
  [{ isFumble: true }, { power: 1 }, 1],
  [{ isFumble: true }, { power: 0 }, 1],
  [{ isFumble: true }, { power: -2 }, 1],
  [{ isFumble: true }, { power: -5 }, 1],
  //
  [{ power: 5 }, { isFumble: true }, -5],
  [{ power: 3 }, { isFumble: true }, -3],
  [{ power: 2 }, { isFumble: true }, -2],
  [{ power: 1 }, { isFumble: true }, -1],
  [{ power: 0 }, { isFumble: true }, -1],
  [{ power: -2 }, { isFumble: true }, -1],
  [{ power: -5 }, { isFumble: true }, -1],
];

describe("fumble contest", () => {
  fumblePatterns.forEach(([d, p, r]) => {
    test("hands contest", () => {
      expect(compareHands(d, p)).toBe(r);
    });
  });
});

const namedPatterns = [
  [{ power: 5 }, { power: 5 }, -5],
  [{ power: 5 }, { power: 3 }, -5],
  [{ power: 5 }, { power: 2 }, -5],
  [{ power: 5 }, { power: 1 }, -5],
  [{ power: 5 }, { power: 0 }, -5],
  [{ power: 5 }, { power: -2 }, -10],
  [{ power: 5 }, { power: -5 }, -25],
  //
  [{ power: 3 }, { power: 5 }, 5],
  [{ power: 3 }, { power: 3 }, -3],
  [{ power: 3 }, { power: 2 }, -3],
  [{ power: 3 }, { power: 1 }, -3],
  [{ power: 3 }, { power: 0 }, -3],
  [{ power: 3 }, { power: -2 }, -6],
  [{ power: 3 }, { power: -5 }, -15],
  //
  [{ power: 2 }, { power: 5 }, 5],
  [{ power: 2 }, { power: 3 }, 3],
  [{ power: 2 }, { power: 2 }, -2],
  [{ power: 2 }, { power: 1 }, -2],
  [{ power: 2 }, { power: 0 }, -2],
  [{ power: 2 }, { power: -2 }, -4],
  [{ power: 2 }, { power: -5 }, -10],
  //
  [{ power: 1 }, { power: 5 }, 5],
  [{ power: 1 }, { power: 3 }, 3],
  [{ power: 1 }, { power: 2 }, 2],
  //
  [{ power: 0 }, { power: 5 }, 5],
  [{ power: 0 }, { power: 3 }, 3],
  [{ power: 0 }, { power: 2 }, 2],
  //
  [{ power: -2 }, { power: 5 }, 10],
  [{ power: -2 }, { power: 3 }, 6],
  [{ power: -2 }, { power: 2 }, 4],
  //
  [{ power: -5 }, { power: 5 }, 25],
  [{ power: -5 }, { power: 3 }, 15],
  [{ power: -5 }, { power: 2 }, 10],
];

describe("named contest", () => {
  namedPatterns.forEach(([d, p, r]) => {
    test("hands contest", () => {
      expect(compareHands(d, p)).toBe(r);
    });
  });
});

const numberPatterns = [
  [{ power: 1, name: "6" }, { power: 1, name: "6" }, -1],
  [{ power: 1, name: "6" }, { power: 1, name: "1" }, -1],
  //
  [{ power: 1, name: "1" }, { power: 1, name: "6" }, 1],
  [{ power: 1, name: "1" }, { power: 1, name: "1" }, -1],
];

describe("nummber contest", () => {
  numberPatterns.forEach(([d, p, r]) => {
    test("hands contest", () => {
      expect(compareHands(d, p)).toBe(r);
    });
  });
});

const negativePatterns = [
  [{ power: 1, name: "6" }, { power: 0 }, -1],
  [{ power: 1, name: "6" }, { power: -2 }, -2],
  [{ power: 1, name: "6" }, { power: -5 }, -5],
  //
  [{ power: 0 }, { power: 1, name: "6" }, 1],
  [{ power: 0 }, { power: 0 }, -1],
  [{ power: 0 }, { power: -2 }, -2],
  [{ power: 0 }, { power: -5 }, -5],
  //
  [{ power: -2 }, { power: 1, name: "6" }, 2],
  [{ power: -2 }, { power: 0 }, 2],
  [{ power: -2 }, { power: -2 }, -2],
  [{ power: -2 }, { power: -5 }, -5],
  //
  [{ power: -5 }, { power: 1, name: "6" }, 5],
  [{ power: -5 }, { power: 0 }, 5],
  [{ power: -5 }, { power: -2 }, 5],
  [{ power: -5 }, { power: -5 }, -5],
];

describe("negative contest", () => {
  negativePatterns.forEach(([d, p, r]) => {
    test("hands contest", () => {
      expect(compareHands(d, p)).toBe(r);
    });
  });
});
