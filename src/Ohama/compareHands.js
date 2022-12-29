/**
 * @param {Object} dealer
 * @param {Object} player
 * @returns  {Number} 子が受け取る倍率: 負の場合は支払い
 */
function compareHands(dealer, player) {
  // ションベン
  if (dealer.isFumble) {
    // 親がションベン
    if (player.isFumble) {
      // 子もションベン: 等倍払い
      return -1;
    }
    if (player.power <= 0) {
      // 子が役なしかマイナス: 等倍の勝ち
      return 1;
    }
    // 子の通常の勝ち
    return player.power;
  }
  if (player.isFumble) {
    // 子がションベン
    if (dealer.power > 0) {
      // 親の倍率で支払い
      return dealer.power * -1;
    }

    // 子の等倍の負け
    return -1;
  }

  // 勝ち役
  if (dealer.power >= 2 && dealer.power >= player.power) {
    // 親が役あり・勝ち
    return Math.min(
      dealer.power * -1,
      player.power // 子の負け役の方が強い場合
    );
  }
  if (player.power >= 2 && player.power > dealer.power) {
    // 子が役あり・勝ち
    // 親の負け役は効力なし
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
    return player.power === 0 ? -1 : player.power; //　子はその負け倍率の負け
  }
  if (dealer.power < player.power && player.power < 1) {
    // 親が負け役、子が負け役か役なしで、子が勝った
    return dealer.power * -1; // 子は親の負け倍率の勝ち
  }

  // 子は目、親は負け役
  return player.power; // === 1
}

export default compareHands;
