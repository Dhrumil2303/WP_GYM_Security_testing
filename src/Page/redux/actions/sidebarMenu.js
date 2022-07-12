import {
    accessRightsAction,
} from '../../../util/action.js';
import { AlertHelper } from '../../App/AlertHelper';
import { t } from '../../../../locals';

import { SET_ACCESSRIGHT, LOADING_START_SIDEMENU, LOADING_END_SIDEMENU } from '../constant/types';

const setAccessright = data => ({
    type: SET_ACCESSRIGHT,
    data,
});

const startLoading = () => ({
    type: LOADING_START_SIDEMENU
});

const endLoading = () => ({
    type: LOADING_END_SIDEMENU,
  });

export const fetchAccessright = (data) => dispatch => {
    
    accessRightsAction(data).then(responseJson => {
        if (responseJson.status == 1) {
            dispatch(setAccessright(responseJson));
        } else {
            dispatch(endLoading());
            AlertHelper.show('warn', t('Warning'), responseJson.error);
        }
    });
}

export const loadingStart = () => dispatch => {
        dispatch(startLoading());
}