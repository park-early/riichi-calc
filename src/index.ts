import { calculate } from "./riichi.js";

function main(): void {
    console.log("TEST");
    console.log(calculate(
        [
            [
                [["1", "pin"], ["2", "pin"], ["5", "man"], ["3", "man"], ["w", "hon"], ["7", "pin"], ["1", "pin"], ["4", "man"]], 
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
        ], 
        null, false, false, false, false, false, false, false, false, []))
}

main();