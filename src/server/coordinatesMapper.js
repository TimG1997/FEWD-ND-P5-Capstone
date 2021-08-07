module.exports = {
    map: async (data) => {
        return {
            lat: data.geonames[0].lat,
            long: data.geonames[0].lng
        }
    }
}
