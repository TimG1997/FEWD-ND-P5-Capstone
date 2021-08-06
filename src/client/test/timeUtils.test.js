import {convertToDays} from "../js/timeUtils";
import {describe, expect} from "@jest/globals";

describe("The conversion functionality should work correctly", () => {
    test('that ms should be converted into days', () => {
        const days = convertToDays(86400000);
        expect(days).toBe(1);
    });
});
