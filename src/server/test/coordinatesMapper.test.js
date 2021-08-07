import {map} from '../coordinatesMapper';
import {describe, expect} from "@jest/globals";

describe("The coordinates mapper should work correctly",  () => {

    test('coordinates should be converted into lat/long object', async () => {
        const dataToMap = {
            geonames: [{
                lat: 1,
                lng: 2
            }]
        }

        const mappedData = await map(dataToMap);
        expect(mappedData).toEqual({
            lat: 1,
            long: 2
        });
    });
});
