// hand is a list of melds
//      each open meld will be grouped as 1 meld
//      all closed tiles will be grouped as 1 meld
// agari is the winning tile
export function calculate(hand, winningTile, dealer, ron, riichi, doubleRiichi, ippatsu, houteiRaoyue, houteiRaoyui, rinshanKaihou, chankan, tenhou, chiihou, dora, riichiSticks, honbaSticks) {
    let maxBasePoints = 0;
    // check if we have a non standard yaku. If so, then we can skip forming hands
    maxBasePoints += checkKokushiMusou(hand, winningTile);
    // checkChitoitsu will need to count hand and fu still
    // maxBasePoints += checkChitoitsu
    if (maxBasePoints == 0) {
        let possibleHands = formHands(hand);
        for (let hand of possibleHands) {
            maxBasePoints = Math.max(maxBasePoints, calculateBasePoints(hand, winningTile, ron));
            // already found the biggest hand
            if (maxBasePoints >= 8000)
                break;
        }
    }
    // these yakuman are compatible with all hands so we check these after getting the base points of other yaku
    // must be dealer for tenhou, must be non-dealer for chiihou
    if (tenhou || chiihou)
        maxBasePoints += 8000;
    return calculateFinalPoints(maxBasePoints, dealer, riichiSticks, honbaSticks);
}
;
function formHands(hand) {
    let possibleHands = [];
    // closedTiles is all the tiles that are not part of an open meld or closed kan
    // arbitrarily decide that the first meld will contain all the ungrouped tiles
    let closedTiles = hand[0][0];
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
    // console.log(closedTiles);
    // for each possible pair in hand
    for (let i = 0; i < closedTiles.length - 1; i++) {
        for (let j = i + 1; j < closedTiles.length; j++) {
            if (closedTiles[i][0] == closedTiles[j][0] &&
                closedTiles[i][1] == closedTiles[j][1]) {
                // filter the pair from the hand
                let pairMeld = [[closedTiles[i], closedTiles[j]], false, false];
                let count = 0;
                let closedTilesWithoutPair = closedTiles.filter((tile) => {
                    if (tile[0] == closedTiles[i][0] && tile[1] == closedTiles[i][1] && count < 2) {
                        count++;
                        return false;
                    }
                    return true;
                });
                // console.log(closedTilesWithoutPair);
                let possibleMelds = [];
                for (let k = 0; k < closedTilesWithoutPair.length - 2; k++) {
                    for (let l = k + 1; l < closedTilesWithoutPair.length - 1; l++) {
                        for (let m = l + 1; m < closedTilesWithoutPair.length; m++) {
                            if (closedTilesWithoutPair[k][1] == closedTilesWithoutPair[l][1] &&
                                closedTilesWithoutPair[k][1] == closedTilesWithoutPair[m][1]) {
                                if (closedTilesWithoutPair[k][0] == closedTilesWithoutPair[l][0] &&
                                    closedTilesWithoutPair[k][0] == closedTilesWithoutPair[m][0]) {
                                    // console.log("set found");
                                    possibleMelds.push([[closedTilesWithoutPair[k], closedTilesWithoutPair[l], closedTilesWithoutPair[m]], false, false]);
                                }
                                else if (
                                // compares NaN if passing in honor tiles, but this should behave ok still
                                parseInt(closedTilesWithoutPair[k][0]) + 1 == parseInt(closedTilesWithoutPair[l][0]) &&
                                    parseInt(closedTilesWithoutPair[l][0]) + 1 == parseInt(closedTilesWithoutPair[m][0])) {
                                    // console.log("sequence found");
                                    possibleMelds.push([[closedTilesWithoutPair[k], closedTilesWithoutPair[l], closedTilesWithoutPair[m]], false, false]);
                                }
                            }
                        }
                    }
                }
                // console.log(possibleMelds[0], possibleMelds[1]);
                // check all combinations of melds to see if they cover closedTilesWithoutPair
                // add back all the exposed melds
                for (let k = 1; k < hand.length; k++) {
                    // console.log(hand[k]);
                    possibleMelds.push(hand[k]);
                }
                // we create buckets to track how many of each tile we had in our hand
                let buckets = new Map();
                for (let meld of possibleMelds) {
                    for (let tile of meld[0]) {
                        let tileStr = tile[0] + tile[1];
                        if (buckets.has(tileStr)) {
                            const currentValue = buckets.get(tileStr);
                            buckets.set(tileStr, currentValue + 1);
                        }
                        else {
                            buckets.set(tileStr, 1);
                        }
                    }
                }
                // console.log(buckets);
                // console.dir(possibleMelds, {depth: 3});
                // next, check each combination of 4 melds
                // each meld we remove a tile from the buckets
                // as soon as we remove more tiles than we have, we throw away this possible combination
                // otherwise, that means we have a valid combination of melds
                for (let k = 0; k < possibleMelds.length - 3; k++) {
                    let kBucket = new Map(buckets);
                    for (let tile of possibleMelds[k][0]) {
                        let tileStr = tile[0] + tile[1];
                        if (kBucket.has(tileStr)) {
                            const currentValue = kBucket.get(tileStr);
                            if (currentValue == 0)
                                continue;
                            kBucket.set(tileStr, currentValue - 1);
                        }
                        else {
                            continue;
                        }
                    }
                    for (let l = k + 1; l < possibleMelds.length - 2; l++) {
                        let lBucket = new Map(kBucket);
                        for (let tile of possibleMelds[l][0]) {
                            let tileStr = tile[0] + tile[1];
                            if (lBucket.has(tileStr)) {
                                const currentValue = lBucket.get(tileStr);
                                if (currentValue == 0)
                                    continue;
                                lBucket.set(tileStr, currentValue - 1);
                            }
                            else {
                                continue;
                            }
                        }
                        for (let m = l + 1; m < possibleMelds.length - 1; m++) {
                            let mBucket = new Map(lBucket);
                            for (let tile of possibleMelds[m][0]) {
                                let tileStr = tile[0] + tile[1];
                                if (mBucket.has(tileStr)) {
                                    const currentValue = mBucket.get(tileStr);
                                    if (currentValue == 0)
                                        continue;
                                    mBucket.set(tileStr, currentValue - 1);
                                }
                                else {
                                    continue;
                                }
                            }
                            for (let n = m + 1; n < possibleMelds.length; n++) {
                                let nBucket = new Map(mBucket);
                                for (let tile of possibleMelds[m][0]) {
                                    let tileStr = tile[0] + tile[1];
                                    if (nBucket.has(tileStr)) {
                                        const currentValue = nBucket.get(tileStr);
                                        if (currentValue == 0)
                                            continue;
                                        nBucket.set(tileStr, currentValue - 1);
                                    }
                                    else {
                                        continue;
                                    }
                                }
                                // console.log("deep loop");
                                possibleHands.push([pairMeld, possibleMelds[k], possibleMelds[l], possibleMelds[m], possibleMelds[n]]);
                            }
                        }
                    }
                }
            }
        }
    }
    console.dir(possibleHands, { depth: 4 });
    return possibleHands;
}
function calculateBasePoints(hand, winningTile, ron) {
    let basePoints = 0;
    basePoints = checkYakuman(hand, winningTile, ron);
    // no need to calculate if we have yakuman or higher
    // if basePoints != 0
    //      han = countHan
    //      if han < 5 then fu = countFu
    //      basePoints = calculateFu(han, fu)
    return basePoints;
}
;
function calculateFinalPoints(basePoints, dealer, riichiSticks, honbaSticks) {
    if (dealer) {
        basePoints *= 6;
    }
    else {
        basePoints *= 4;
    }
    basePoints += riichiSticks * 1000;
    basePoints += honbaSticks * 300;
    return basePoints;
}
// return the number of han this hand is worth
function countHan() {
    // han = checkYaku
    // han += countDora
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
// checks for yakuman hand except the following:
// kazoe yakuman (counted yakuman)
// kokushi musou (13 orphans)
// tenhou (blessing of heaven)
// chiihou (blessing of earth)
function checkYakuman(hand, winningTile, ron) {
    let basePoints = 0;
    basePoints += checkSuuankou(hand, winningTile, ron);
    basePoints += checkDaisangen(hand);
    basePoints += checkShousuushii(hand);
    basePoints += checkDaisuushii(hand);
    basePoints += checkTsuuiisou(hand);
    basePoints += checkChinroutou(hand);
    basePoints += checkRyuuiisou(hand);
    // checkChuurenPoutou
    basePoints += checkSuukantsu(hand);
    return basePoints;
}
// checks for 13 orphans
// one of each terminal and honor tile plus 1 extra terminal or honor
// closed only
function checkKokushiMusou(hand, winningTile) {
    // all closed tiles are in the first meld
    let tiles = hand[0][0];
    let basePoints = 0;
    if (tiles.length == 14) {
        // check if each tile is valid
        // if we see the winning tile twice, then we know it is not a 13 tile wait -> not a double yakuman
        let valid = new Set(["1man", "9man", "1pin", "9pin", "1sou", "9sou", "ehon", "shon", "whon", "nhon", "ghon", "rhon", "whhon"]);
        for (let tile of tiles) {
            let str = tile[0] + tile[1];
            if (!valid.has(str))
                return 0;
            if (winningTile[0] + winningTile[1] == str)
                basePoints += 8000;
        }
    }
    return basePoints;
}
// checks for 4 concealed triplets
// closed only
// if shanpon, cannot win by ron (ie. winning tile must be from the pair if won by ron)
function checkSuuankou(hand, winningTile, ron) {
    for (let meld of hand) {
        if (!meld[1])
            return 0;
        if ((meld[0].length == 3) && (winningTile[0] + [1] == meld[0][0][0] + meld[0][0][1]) && ron)
            return 0;
        if (meld[0][0][0] != meld[0][1][0])
            return 0;
    }
    return 8000;
}
// checks for big 3 dragons
function checkDaisangen(hand) {
    let ghon = false;
    let rhon = false;
    let whhon = false;
    for (let meld of hand) {
        if (meld[0].length == 3) {
            ghon = ("ghon" == meld[0][0][0] + meld[0][0][1]) || ghon;
            rhon = ("rhon" == meld[0][0][0] + meld[0][0][1]) || rhon;
            whhon = ("whhon" == meld[0][0][0] + meld[0][0][1]) || whhon;
        }
    }
    return (ghon && rhon && whhon) ? 8000 : 0;
}
// checks for small winds
// 3 groups of wind tiles plus a pair of the 4th
// this should be called before big winds
function checkShousuushii(hand) {
    let ehon = false;
    let shon = false;
    let nhon = false;
    let whon = false;
    for (let meld of hand) {
        ehon = ("ehon" == meld[0][0][0] + meld[0][0][1]) || ehon;
        shon = ("shon" == meld[0][0][0] + meld[0][0][1]) || shon;
        whon = ("whon" == meld[0][0][0] + meld[0][0][1]) || whon;
        nhon = ("nhon" == meld[0][0][0] + meld[0][0][1]) || nhon;
    }
    return (ehon && shon && whon && nhon) ? 8000 : 0;
}
// checks for big winds
// 4 groups of wind tiles
// double yakuman
// this should only be called after checking small winds
function checkDaisuushii(hand) {
    let ehon = false;
    let shon = false;
    let nhon = false;
    let whon = false;
    for (let meld of hand) {
        if (meld[0].length == 3) {
            ehon = ("ehon" == meld[0][0][0] + meld[0][0][1]) || ehon;
            shon = ("shon" == meld[0][0][0] + meld[0][0][1]) || shon;
            whon = ("whon" == meld[0][0][0] + meld[0][0][1]) || whon;
            nhon = ("nhon" == meld[0][0][0] + meld[0][0][1]) || nhon;
        }
    }
    return (ehon && shon && whon && nhon) ? 8000 : 0;
}
// checks for all honors
function checkTsuuiisou(hand) {
    let honors = new Set(["ghon", "whhon", "rhon", "ehon", "shon", "nhon", "whon"]);
    for (let meld of hand) {
        let str = meld[0][0][0] + meld[0][0][1];
        if (!honors.has(str))
            return 0;
    }
    return 8000;
}
// checks for all terminals
function checkChinroutou(hand) {
    let terminals = new Set(["1man", "9man", "1pin", "9pin", "1sou", "9sou"]);
    for (let meld of hand) {
        let str = meld[0][0][0] + meld[0][0][1];
        if (!terminals.has(str))
            return 0;
        if (meld[0][0][0] != meld[0][1][0])
            return 0;
    }
    return 8000;
}
// checks for all green
// winning hand can only contain 2, 3, 4, 6, and 8 sou and/or green dragon
function checkRyuuiisou(hand) {
    let greens = new Set(["2sou", "3sou", "4sou", "6sou", "8sou", "ghon"]);
    for (let meld of hand) {
        for (let tile of meld[0]) {
            let str = tile[0] + tile[1];
            if (!greens.has(str))
                return 0;
        }
    }
    return 8000;
}
// checks for nine gates
// 1112345678999 in the same suit plus any 1 extra tile of the same suit
// cannot call kan on 1s or 9s
// closed only
function checkChuurenPoutou(hand) {
    // let honors: Set<string> = new Set(["ghon", "whhon", "rhon", "ehon", "shon", "nhon", "whon"]);
    // let suit: string = hand[0][0][0][1];
    // for (let meld of hand) {
    //     if (meld[0].length == 2) {
    //         if (meld[0][0][0] == "1" || meld[0][0][0] == "9") return 
    //     }
    //     if (meld[0][0][0] == "1" && meld[0][0])
    //     for (let tile of meld[0]) {
    //         let str = tile[0] + tile[1];
    //         if (honors.has(str)) return 0;
    //         if (suit != tile[1]) return 0;
    //     }
    // }
    return 8000;
}
// checks for 4 kans
function checkSuukantsu(hand) {
    for (let meld of hand) {
        if (meld[0].length == 3 && !meld[2])
            return 0;
    }
    return 8000;
}
//# sourceMappingURL=riichi.js.map