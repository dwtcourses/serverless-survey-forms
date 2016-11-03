/**
 * Index reducer to combine all the reducers
 **/

/** Please update below state tree if new state is added
 {
    loading: true/false,
    token: "xxxxxxxxxx",
    account: {
		  "accountid": "facebook-10206181895733803",
		  "username": "jonas cheng",
		  "email": "jonas_cheng@trend.com.tw",
		  "role": "User"
		},
    surveyID: '',
    subject: '',
    questions: [{},{},...],
    dropQuestion: { page: 1, index: 0 },
    editSubject: true/false,
    editQuestion: {},
    editPage: {page:(the first is 1), description:''},
    orderPage: [],
    surveys: [{},{},...],
    selectedSurveys: '',
    surveyEditable: true,
    surveyPolicy: {
        description: "Thanks for ...",
        privacy: {
            label: "If Trend Micro ...",
            terms: "Yes, ... ",
            input: "Please enter your email address."
        }
    },
    preview: 'embedded/previewPhone/previewPad/previewDesktop',
    previewID: '',
    users: [],
    selectedUser: {}
    webpage: 'index',
    popup: ''
 }
**/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loading from './loading';
import token from './token';
import account from './account';
import surveyID from './surveyID';
import subject from './subject';
import questions from './questions';
import dropQuestion from './dropQuestion';
import editSubject from './editSubject';
import editQuestion from './editQuestion';
import editPage from './editPage';
import orderPage from './orderPage';
import surveys from './surveys';
import selectedSurveys from './selectedSurveys';
import surveyEditable from './surveyEditable';
import surveyPolicy from './surveyPolicy';
import preview from './preview';
import previewID from './previewID';
import users from './users';
import selectedUser from './selectedUser';
import webpage from './webpage';
import popup from './popup';

const rootReducer = combineReducers({
    loading,
    token,
    account,
    surveyID,
    subject,
    questions,
    dropQuestion,
    editSubject,
    editQuestion,
    editPage,
    orderPage,
    surveys,
    selectedSurveys,
    surveyEditable,
    surveyPolicy,
    preview,
    previewID,
    users,
    selectedUser,
    webpage,
    popup,
    routing: routerReducer
});

export default rootReducer;
