// value, suit
// 123456789, n, e, s, w, g, r, wh
// man, pin, sou, hon
type Tile = [string, string];

// tiles, open
type Meld = [Tile[], boolean];

// hand is a list of melds
//      each open meld will be grouped as 1 meld
//      all closed tiles will be grouped as 1 meld
// agari is the winning tile
export function calculate(
    hand: Meld[], 
    winningTile: Tile,
    dealer: boolean,
    ron: boolean,
    riichi: boolean,
    ippatsu: boolean,
    houteiRaoyue: boolean,
    houteiRaoyui: boolean,
    rinshanKaihou: boolean,
    chankan: boolean,
    doubleRiichi: boolean,
    dora: Tile[],
    riichiSticks: number,
    honbaSticks: number
): number {
    let possibleHands: Meld[][] = formHands(hand);
    let maxBasePoints: number = 0;

    for (let hand of possibleHands) {
        maxBasePoints = Math.max(maxBasePoints, calculateBasePoints(hand));
        // already found the biggest hand
        if (maxBasePoints >= 8000) break;
    }

    return calculateFinalPoints(maxBasePoints, dealer, riichiSticks, honbaSticks);
};

function formHands(hand: Meld[]): Meld[][] {
    let possibleHands: Meld[][] = []
    // closedTiles is all the tiles that are not part of an open meld or closed kan
    // arbitrarily decide that the first meld will contain all the ungrouped tiles
    let closedTiles: Tile[] = hand[0][0];
    // order tiles by suit then value
    closedTiles.sort((a, b) => {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
        if (a[0] < b[0]) return -1;
        return 1;
    });
    console.log(closedTiles);

    // for each possible pair in hand
    for (let i = 0; i < closedTiles.length - 1; i++) {
        for (let j = i + 1; j < closedTiles.length; j++) {
            if (
                closedTiles[i][0] == closedTiles[j][0] &&
                closedTiles[i][1] == closedTiles[j][1]
            ) {
                // filter the pair from the hand
                let pairMeld: Meld = [[closedTiles[i], closedTiles[j]], false];
                let count: number = 0;
                let closedTilesWithoutPair: Tile[] = closedTiles.filter((tile) => {
                    if (tile[0] == closedTiles[i][0] && tile[1] == closedTiles[i][1] && count < 2) {
                        count++;
                        return false;
                    }
                    return true;
                });

                console.log(closedTilesWithoutPair);

                let possibleMelds: Meld[] = [];
                for (let k = 0; k < closedTilesWithoutPair.length - 2; k++) {
                    for (let l = k + 1; l < closedTilesWithoutPair.length - 1; l++) {
                        for (let m = l + 1; m < closedTilesWithoutPair.length; m++) {
                            if (
                                closedTilesWithoutPair[k][1] == closedTilesWithoutPair[l][1] &&
                                closedTilesWithoutPair[k][1] == closedTilesWithoutPair[m][1]
                            ) {
                                if (
                                    closedTilesWithoutPair[k][0] == closedTilesWithoutPair[l][0] &&
                                    closedTilesWithoutPair[k][0] == closedTilesWithoutPair[m][0]
                                ) {
                                    console.log("set found");
                                    possibleMelds.push([[closedTilesWithoutPair[k], closedTilesWithoutPair[l], closedTilesWithoutPair[m]], false]);
                                } else if (
                                    // compares NaN if passing in honor tiles, but this should behave ok still
                                    parseInt(closedTilesWithoutPair[k][0]) + 1 == parseInt(closedTilesWithoutPair[l][0]) &&
                                    parseInt(closedTilesWithoutPair[l][0]) + 1 == parseInt(closedTilesWithoutPair[m][0])
                                ) {
                                    console.log("sequence found");
                                    possibleMelds.push([[closedTilesWithoutPair[k], closedTilesWithoutPair[l], closedTilesWithoutPair[m]], false]);
                                }
                            }
                        }
                    }
                }

                console.log(possibleMelds[0], possibleMelds[1]);

                // check all combinations of melds to see if they cover closedTilesWithoutPair
                // first we create buckets to track how many of each tile we had in our hand
                for (let k = 1; k < hand.length; k++) {
                    console.log(hand[k]);
                    possibleMelds.push(hand[k]);
                }
                let buckets: Map<string, number> = new Map();
                for (let meld of possibleMelds) {
                    for (let tile of meld[0]) {
                        let tileStr:string = tile[0] + tile[1];
                        if (buckets.has(tileStr)) {
                            const currentValue = buckets.get(tileStr);
                            buckets.set(tileStr, currentValue + 1);
                        } else {
                            buckets.set(tileStr, 1);
                        }
                    }
                }

                console.log(buckets);
                console.dir(possibleMelds, {depth: 3});

                // next, check each combination of 4 melds
                // each meld we remove a tile from the buckets
                // as soon as we remove more tiles than we have, we throw away this possible combination
                // otherwise, that means we have a valid combination of melds
                for (let k = 0; k < possibleMelds.length - 3; k++) {
                    let kBucket = new Map(buckets);
                    for (let tile of possibleMelds[k][0]) {
                        let tileStr:string = tile[0] + tile[1];
                        if (kBucket.has(tileStr)) {
                            const currentValue = kBucket.get(tileStr);
                            if (currentValue == 0) continue;
                            kBucket.set(tileStr, currentValue - 1);
                        } else {
                            continue;
                        }
                    }

                    for (let l = k + 1; l < possibleMelds.length - 2; l++) {
                        let lBucket = new Map(kBucket);
                        for (let tile of possibleMelds[l][0]) {
                            let tileStr:string = tile[0] + tile[1];
                            if (lBucket.has(tileStr)) {
                                const currentValue = lBucket.get(tileStr);
                                if (currentValue == 0) continue;
                                lBucket.set(tileStr, currentValue - 1);
                            } else {
                                continue;
                            }
                        }

                        for (let m = l + 1; m < possibleMelds.length - 1; m++) {
                            let mBucket = new Map(lBucket);
                            for (let tile of possibleMelds[m][0]) {
                                let tileStr:string = tile[0] + tile[1];
                                if (mBucket.has(tileStr)) {
                                    const currentValue = mBucket.get(tileStr);
                                    if (currentValue == 0) continue;
                                    mBucket.set(tileStr, currentValue - 1);
                                } else {
                                    continue;
                                }
                            }

                            for (let n = m + 1; n < possibleMelds.length; n++) {
                                let nBucket = new Map(mBucket);
                                for (let tile of possibleMelds[m][0]) {
                                    let tileStr:string = tile[0] + tile[1];
                                    if (nBucket.has(tileStr)) {
                                        const currentValue = nBucket.get(tileStr);
                                        if (currentValue == 0) continue;
                                        nBucket.set(tileStr, currentValue - 1);
                                    } else {
                                        continue;
                                    }
                                }

                                console.log("deep loop");

                                possibleHands.push([pairMeld, possibleMelds[k], possibleMelds[l], possibleMelds[m], possibleMelds[n]]);
                            }
                        }
                    }
                }
            }
        }
    }

    console.dir(possibleHands, {depth: 4});
    return possibleHands
}

function calculateBasePoints(
    hand: Meld[], 
    // winningTile: Tile,
    // ron: boolean,
    // riichi: boolean,
    // ippatsu: boolean,
    // houteiRaoyue: boolean,
    // houteiRaoyui: boolean,
    // rinshanKaihou: boolean,
    // chankan: boolean,
    // doubleRiichi: boolean,
    // dora: Tile[]
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
    if (dealer) {
        basePoints *= 6;
    } else {
        basePoints *= 4;
    }
    basePoints += riichiSticks * 1000;
    basePoints += honbaSticks * 300;
    return basePoints;
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