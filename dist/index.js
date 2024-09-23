import { calculate } from "./riichi.js";
function main() {
    console.log("GENERIC TEST");
    console.log(calculate([
        [
            [["1", "pin"], ["7", "sou"], ["5", "man"], ["3", "man"], ["8", "sou"], ["9", "sou"], ["1", "pin"], ["4", "man"]],
            false
        ],
        [
            [["1", "pin"], ["2", "pin"], ["3", "pin"]],
            true
        ],
        [
            [["1", "sou"], ["1", "sou"], ["1", "sou"]],
            true
        ],
    ], null, // winning tile
    false, // dealer
    false, // ron
    false, // riichi
    false, // double riichi
    false, // ippatsu
    false, // houtei raoyue
    false, // houtei rayui
    false, // rinshan kaihou
    false, // chankan
    false, // tenhou
    false, // chiihou
    [], // dora
    0, // riichi sticks
    0 // honba sticks
    ));
    console.log("TEST 13 ORPHANS");
    console.log(calculate([
        [
            [["1", "pin"], ["1", "pin"], ["9", "pin"], ["1", "man"], ["9", "man"], ["1", "sou"], ["9", "sou"], ["e", "hon"], ["s", "hon"], ["w", "hon"], ["n", "hon"], ["g", "hon"], ["r", "hon"], ["wh", "hon"]],
            false
        ],
    ], ["1", "pin"], // winning tile
    false, // dealer
    false, // ron
    false, // riichi
    false, // double riichi
    false, // ippatsu
    false, // houtei raoyue
    false, // houtei rayui
    false, // rinshan kaihou
    false, // chankan
    false, // tenhou
    false, // chiihou
    [], // dora
    1, // riichi sticks
    2 // honba sticks
    ));
}
main();
//# sourceMappingURL=index.js.map