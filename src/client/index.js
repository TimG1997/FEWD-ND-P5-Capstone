import {handleSubmit} from './js/handleSubmit';
import {calculateTripDates} from './js/calculateTripDates';
import {fetchData} from './js/fetchData';
import {updateUI} from './js/updateUI';
import {validateInput} from './js/validateInput';
import {convertToDays} from "./js/timeUtils";

import './styles/style.scss';
import './styles/layout.scss';

export {
    fetchData,
    validateInput,
    handleSubmit,
    convertToDays,
    calculateTripDates,
    updateUI
};
