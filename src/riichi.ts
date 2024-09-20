console.log("TEST");

type Tile = [number, string, boolean];

function calculatePoints(
    hand: Tile[], 
    dealer: boolean,
    dora: number[],
    riichiSticks: number,
    honbaSticks: number
): number {
    let points: number = 0;
    // countHan
    // countFu
    // adjustForDealer
    // addRiichiStick
    // addHonbaStick
    return -1;
};

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