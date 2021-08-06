import "../server.js";
import {describe, expect} from "@jest/globals";
const rewire = require('rewire');

describe("The coordinates mapper should work correctly", () => {
    const server = rewire('../server.js');
    const coordinatesMapper = server.__get__('coordinatesMapper');

    test('coordinates should be converted into lat/long object', () => {
        const dataToMap = {
            geonames: [{
                lat: 1,
                lng: 2
            }]
        }

        coordinatesMapper(dataToMap).then(mappedData => {
            expect(mappedData).toEqual({
                lat: 1,
                long: 2
            });
        })
    });
});
