// hand is a list of melds
//      each open meld will be grouped as 1 meld
//      all closed tiles will be grouped as 1 meld
// agari is the winning tile
export function calculate(hand, agari, ron, riichi, ippatsu, houteiRaoyue, houteiRaoyui, rinshanKaihou, chankan, doubleRiichi, dora) {
    let possibleHands = formHands(hand);
    let maxBasePoints = 0;
    for (let hand of possibleHands) {
        maxBasePoints = Math.max(maxBasePoints, calculateBasePoints());
        // already found the biggest hand
        if (maxBasePoints >= 8000)
            break;
    }
    return calculateFinalPoints();
}
;
function formHands(hand) {
    let possibleHands = [];
    // remove all open melds from the hand
    // closedTiles is all the tiles that are not part of an open meld
    let closedTiles = hand.filter((meld) => meld[1] == false)[0][0];
    // order tiles by suit then value
    closedTiles.sort((a, b) => {
        if (a[1] < b[1])
            return -1;
        if (a[1] > b[1])
            return 1;
        if (a[0] < b[0])
            return -1;
        return 1;
    });
    console.log(closedTiles);
    for (let i = 0; i < closedTiles.length - 1; i++) {
        for (let j = i + 1; j < closedTiles.length; j++) {
            if (closedTiles[i][0] == closedTiles[j][0] &&
                closedTiles[i][1] == closedTiles[j][1]) {
                let count = 0;
                let closedTilesWithoutPair = closedTiles.filter((tile) => {
                    if (tile[0] == closedTiles[i][0] && tile[1] == closedTiles[i][1] && count < 2) {
                        count++;
                        return false;
                    }
                    return true;
                });
                console.log(closedTilesWithoutPair);
            }
        }
    }
    // for each pair
    //      remove pair from hand
    //      possibleMelds = melds from openMelds
    //      for each triplet
    //          if triplet is valid
    //              add triplet to possibleMelds
    //
    //      for each set of 4 melds in possibleMelds
    //          if all 12 tiles are unique
    //              add 4 melds and pair to possibleHands
    //
    // return possibleHands
    return [];
}
function calculateBasePoints(
// hand: Tile[][], 
// agari: Tile,
// ron: boolean,
// riichi: boolean,
// ippatsu: boolean,
// houteiRaoyue: boolean,
// houteiRaoyui: boolean,
// rinshanKaihou: boolean,
// chankan: boolean,
// doubleRiichi: boolean,
// dora: number[]
) {
    let basePoints = 0;
    // han = checkYakuman
    // if han = -1
    //      han = countHan
    //      if han < 5 then fu = countFu
    //      basePoints = calcBasePoints(han, fu)
    return basePoints;
}
;
function calculateFinalPoints(
// basePoints: number, 
// dealer: boolean,
// riichiSticks: number,
// honbaSticks: number
) {
    // if dealer multiply basePoints
    // basePoints += addRiichiStick(riichiSticks)
    // basePoints += addHonbaStick(honbaSticks)
    return -1;
}
// return the number of han this hand is worth
function countHan() {
    // checkChitoitsu
    // if han = -1 
    //      han = checkYaku
    // countDora
    return -1;
}
// return the number of fu this hand is worth
function countFu() {
    let fu = 20;
    // if tsumo, +10 (menzen-kafu)
    // addMeldsFu
    // addPairFu
    // addWaitsFu
    // addTsumoFu
    // if chitoitsu, 25 fu awarded
    // if ron but no additional fu, 30 fu awarded
    return -1;
}
// checks for yakuman hand except kazoe yakuman (counted yakuman)
function checkYakuman(hand) {
    checkKokushiMusou(hand);
    // checkSuuankou
    // checkDaisangen
    // checkShousuushii
    // checkDaisuushii
    // checkTsuuiisou
    // checkChinroutou
    // checkRyuuiisou
    // checkChuurenPoutou
    // checkSuukantsu
    return -1;
}
// checks for 13 orphans
// one of each terminal and honor tile plus 1 extra terminal or honor
// closed only
function checkKokushiMusou(hand) {
    return -1;
}
// checks for 4 concealed triplets
// closed only
// if shanpon, cannot win by ron
function checkSuuankou(hand) {
    return -1;
}
// checks for big 3 dragons
function checkDaisangen(hand) {
    return -1;
}
// checks for small winds
// 3 groups of wind tiles plus a pair of the 4th
function checkShousuushii(hand) {
    return -1;
}
// checks for big winds
// 4 groups of wind tiles
// double yakuman
function checkDaisuushii(hand) {
    return -1;
}
// checks for all honors
function checkTsuuiisou(hand) {
    return -1;
}
// checks for all terminals
function checkChinroutou(hand) {
    return -1;
}
// checks for all green
// winning hand cannot contain 2, 3, 4, 6, and 8 sou and/or green dragon
function checkRyuuiisou(hand) {
    return -1;
}
// checks for nine gates
// 1112345678999 in the same suit plus any 1 extra tile of the same suit
// closed only
function checkChuurenPoutou(hand) {
    return -1;
}
// checks for 4 kans
function checkSuukantsu(hand) {
    return -1;
}
//# sourceMappingURL=riichi.js.map