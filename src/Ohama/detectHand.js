const HANDS = [
  { dice: "111", name: "ピンゾロ", power: 5 },
  //
  { dice: "222", name: "アラシ", power: 3 },
  { dice: "333", name: "アラシ", power: 3 },
  { dice: "444", name: "アラシ", power: 3 },
  { dice: "555", name: "アラシ", power: 3 },
  { dice: "666", name: "アラシ", power: 3 },
  //
  { dice: "456", name: "シゴロ", power: 2 },
  //
  { dice: "123", name: "ヒフミ", power: -2 },
  //
  { dice: "334", name: "33-4", power: -5 },
];

function detectHand(dice) {
  const nums = dice.split("");
  nums.sort();
  let diceSorted = nums.join("");

  const hand = HANDS.find(({ dice }) => dice === diceSorted);
  if (hand) {
    return { ...hand, dice };
  }

  const numSorted = nums.reduce((acc, num) => {
    acc[num] = acc[num] ?? 0;
    acc[num]++;

    return acc;
  }, {});

  const hasDouble = Object.values(numSorted).find((cnt) => cnt === 2);
  if (hasDouble) {
    return {
      dice,
      name: Object.entries(numSorted).find((dice) => dice[1] === 1)[0],
      power: 1,
    };
  }

  return { name: "役なし", power: 0, dice };
}

export default detectHand;
