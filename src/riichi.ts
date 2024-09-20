console.log("TEST");

// value, suit, open
// 123456789, n, e, s, w, g, r, wh
// man, pin, sou
type Tile = [string, string, boolean];


function calculate(
    hand: Tile[][], 
    agari: Tile,
    ron: boolean,
    riichi: boolean,
    ippatsu: boolean,
    houteiRaoyue: boolean,
    houteiRaoyui: boolean,
    rinshanKaihou: boolean,
    chankan: boolean,
    doubleRiichi: boolean,
    dora: number[]
): number {
    // possibleHands = formHands
    // maxBasePoints = 0
    // for each hand in possibleHands
    //      maxBasePoints = max (maxBasePoints, calculateBasePoints)
    //      if maxBasePoints >= 8000 break (yakuman achieved)
    // 
    // return calculateFinalPoints
    return -1;
};


function formHands(
    hand: Tile[][], 
    agari: Tile,
    openMelds: Tile[][]
): Tile[][][] {
    // possibleHands = empty
    // remove openMelds from hand
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
    return null;
}

function calculateBasePoints(
    hand: Tile[][], 
    agari: Tile,
    ron: boolean,
    riichi: boolean,
    ippatsu: boolean,
    houteiRaoyue: boolean,
    houteiRaoyui: boolean,
    rinshanKaihou: boolean,
    chankan: boolean,
    doubleRiichi: boolean,
    dora: number[]
): number {
    let basePoints: number = 0;
    // han = checkYakuman
    // if han = -1
    //      han = countHan
    //      if han < 5 then fu = countFu
    //      basePoints = calcBasePoints(han, fu)
    return basePoints;
};

function calculateFinalPoints(
    basePoints: number, 
    dealer: boolean,
    riichiSticks: number,
    honbaSticks: number
): number {
    // if dealer multiply basePoints
    // basePoints += addRiichiStick(riichiSticks)
    // basePoints += addHonbaStick(honbaSticks)
    return -1;
}

// return the number of han this hand is worth
function countHan(): number {
    // checkChitoitsu
    // if han = -1 
    //      han = checkYaku
    // countDora
    return -1;
}

// return the number of fu this hand is worth
function countFu(): number {
    let fu: number = 20;
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
function checkYakuman(hand: Tile[]): number {
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
function checkKokushiMusou(hand: Tile[]): number {
    return -1;
}

// checks for 4 concealed triplets
// closed only
// if shanpon, cannot win by ron
function checkSuuankou(hand: Tile[]): number {
    return -1;
}

// checks for big 3 dragons
function checkDaisangen(hand: Tile[]): number {
    return -1;
}

// checks for small winds
// 3 groups of wind tiles plus a pair of the 4th
function checkShousuushii(hand: Tile[]): number {
    return -1;
}

// checks for big winds
// 4 groups of wind tiles
// double yakuman
function checkDaisuushii(hand: Tile[]): number {
    return -1;
}

// checks for all honors
function checkTsuuiisou(hand: Tile[]): number {
    return -1;
}

// checks for all terminals
function checkChinroutou(hand: Tile[]): number {
    return -1;
}

// checks for all green
// winning hand cannot contain 2, 3, 4, 6, and 8 sou and/or green dragon
function checkRyuuiisou(hand: Tile[]): number {
    return -1;
}

// checks for nine gates
// 1112345678999 in the same suit plus any 1 extra tile of the same suit
// closed only
function checkChuurenPoutou(hand: Tile[]): number {
    return -1;
}

// checks for 4 kans
function checkSuukantsu(hand: Tile[]): number {
    return -1;
}