import { calculate } from "./riichi.js";
function main() {
    console.log("GENERIC TEST");
    console.log(calculate([
        [
            [["1", "pin"], ["7", "sou"], ["5", "man"], ["3", "man"], ["8", "sou"], ["9", "sou"], ["1", "pin"], ["4", "man"]],
            false,
            false
        ],
        [
            [["1", "pin"], ["2", "pin"], ["3", "pin"]],
            true,
            false
        ],
        [
            [["1", "sou"], ["1", "sou"], ["1", "sou"]],
            true,
            false
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
            false,
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
    console.log("TEST BIG 3 DRAGONS");
    console.log(calculate([
        [
            [["1", "pin"], ["5", "man"], ["3", "man"], ["1", "pin"], ["4", "man"]],
            false,
            false
        ],
        [
            [["g", "hon"], ["g", "hon"], ["g", "hon"]],
            true,
            false
        ],
        [
            [["r", "hon"], ["r", "hon"], ["r", "hon"]],
            true,
            false
        ],
        [
            [["wh", "hon"], ["wh", "hon"], ["wh", "hon"]],
            false,
            true
        ],
    ], ["g", "hon"], // winning tile
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