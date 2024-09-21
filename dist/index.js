import { calculate } from "./riichi.js";
function main() {
    console.log("TEST");
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
    ], null, false, false, false, false, false, false, false, false, []));
}
main();
//# sourceMappingURL=index.js.map