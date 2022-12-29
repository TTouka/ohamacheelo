/**
 * @param {Object} dealer
 * @param {Object} player
 * @returns  {Number} 子が受け取る倍率: 負の場合は支払い
 */
function compareHands(dealer, player) {
  // ションベン
  if (dealer.isFumble && player.isFumble) {
    return -1;
  }
  if (dealer.isFumble) {
    // 親がションベン
    if (player.power <= 0) {
      // 子が目なし以下: 等倍の勝ち
      return 1;
    }
    // 子の倍率の勝ち
    return player.power;
  }
  if (player.isFumble) {
    // 子がションベン
    if (dealer.power <= 0) {
      // 親が目なし以下: 等倍の負け
      return -1;
    }
    // 親の倍率の負け
    return dealer.power * -1;
  }

  // 勝ち役
  if (dealer.power >= 2 && dealer.power >= player.power) {
    // 親が役ありの勝ち
    if (player.power < 0) {
      // 子が負け役
      return dealer.power * player.power;
    }
    return dealer.power * -1;
  }
  if (player.power >= 2 && player.power > dealer.power) {
    // 子が役ありの勝ち
    if (dealer.power < 0) {
      // 親が負け役
      return dealer.power * player.power * -1;
    }
    return player.power;
  }

  // 目
  if (player.power === 1 && dealer.power === 1) {
    // 親子ともに目
    if (Number(dealer.name) >= Number(player.name)) {
      // 親の勝ち
      return -1;
    }
    return 1;
  }

  // 親子どちらかが負け役
  if (dealer.power >= player.power) {
    return player.power === 0 ? -1 : player.power; //　負け倍率の負け
  }

  return dealer.power === 0 ? 1 : dealer.power * -1; // 親の負け倍率の勝ち
}

export default compareHands;
