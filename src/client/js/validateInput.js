export const validateInput = (inputData) => {
    if(inputData.to === "" || inputData.from === "") {
        alert('Please provide a from and to city.');
        return false;
    }

    if (inputData.startDate === "" || inputData.endDate === "") {
        alert('Please provide a start and end date.');
        return false;
    }

    return true;
}
