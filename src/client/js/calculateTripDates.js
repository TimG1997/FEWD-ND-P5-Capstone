const IS_SOON_BOUNDARY = 16;

export const calculateTripDates = (departureDateInput, returnDateInput) => {
    const today = new Date().getTime();
    const depart = new Date(departureDateInput).getTime();
    const returnDate = new Date(returnDateInput).getTime();

    const daysToDeparture = Math.round(Client.convertToDays((depart - today))) + 1;
    const tripDuration = Math.ceil(Client.convertToDays((returnDate - depart)));

    let isSoon = daysToDeparture < IS_SOON_BOUNDARY;

    return {
        depart: departureDateInput,
        duration: tripDuration,
        daysToDeparture: daysToDeparture,
        isSoon: isSoon
    };
}
