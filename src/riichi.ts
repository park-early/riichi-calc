console.log("TEST");

type Tile = [number, string, boolean];

function calculatePoints(
    hand: Tile[], 
    agari: Tile,
    houteiRaoyue: boolean,
    houteiRaoyui: boolean,
    rinshanKaihou: boolean,
    chankan: boolean,
    doubleRiichi: boolean,
    dealer: boolean,
    dora: number[],
    riichiSticks: number,
    honbaSticks: number
): number {
    let basePoints: number = 0;
    // han = countHan
    // if han < 5 then fu = countFu
    // basePoints = calcBasePoints(han, fu)
    // adjustForDealer(basePoints)
    // basePoints += addRiichiStick(riichiSticks)
    // basePoints += addHonbaStick(honbaSticks)
    return basePoints;
};

// return the number of han this hand is worth
function countHan(): number {
    // yakuman are 13 han
    // checkYakuman
    // checkYaku
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