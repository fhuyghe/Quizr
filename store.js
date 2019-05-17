import thunkMiddleware from 'redux-thunk'
import 'babel-polyfill'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import fetch from 'cross-fetch'
import { merge } from 'lodash'

const loggerMiddleware = createLogger({
  collapsed: true
})

const serverUrl = 'https://728582e1.ngrok.io'

const initialState = {
    isFetching: false,
    isLoaded: false,
    isSaving: false,
    settings: {
        collectEmailChecked: true,
        resultsTitle: '',
        resultsParagraph: '',
        resultsTextAfter: '',
        introTitle: '',
        introParagraph: '',
        questions: [],
        resultOptions: []
    },
    answers: []
}

export const actionTypes = {
  GET_SETTINGS: 'GET_SETTINGS',
  REQUEST_SETTINGS: 'REQUEST_SETTINGS',
  RECEIVE_SETTINGS: 'RECEIVE_SETTINGS',
  SAVE_SETTINGS: 'SAVE_SETTINGS',
  TRY_SAVING_SETTINGS: 'TRY_SAVING_SETTINGS',
  SUCCESS_SAVING_SETTINGS: 'SUCCESS_SAVING_SETTINGS',
  SAVE_QUESTION: 'SAVE_QUESTION',
  TRY_SAVING_QUESTION: 'TRY_SAVING_QUESTION',
  SUCCESS_SAVING_QUESTION: 'SUCCESS_SAVING_QUESTION',
  SAVE_ANSWER: 'SAVE_ANSWER'
}

// REDUCERS
export const reducer = (state = initialState, action) => {
    let newState = merge({}, state);
    switch (action.type) {

        case actionTypes.GET_SETTINGS:
            newState.shop = action.shop
            return newState

        case actionTypes.REQUEST_SETTINGS:
            newState.isFetching = true
            return newState

        case actionTypes.RECEIVE_SETTINGS:
            newState.isFetching = false
            newState.isLoaded = true
            newState.settings = action.settings
            return newState

        case actionTypes.SAVE_ANSWER:
            newState.answers = action.answers
            return newState

        default:
        return state
  }
}

// ACTIONS
export const requestSettings = (shop) => {
  return { 
        type: actionTypes.GET_SETTINGS,
        shop
    }
}
export const receiveSettings = (shop, settings) => {
    return { 
        type: actionTypes.RECEIVE_SETTINGS,
        shop, 
        settings
    }
}

export function getSettings(shop) {
    return function(dispatch, getState) {

        const state = getState()
        if (state.isLoaded) return
  
      dispatch(requestSettings(shop))
  
      return fetch( serverUrl + `/api/settings/${shop}`)
        .then(
          response => response.json(),
          // Do not use catch
          error => console.log('An error occurred.', error)
        )
        .then(json => dispatch(receiveSettings(shop, json))
        )
    }
  }

  export const trySavingSettings = (shop) => {
    return { 
          type: actionTypes.TRY_SAVING_SETTINGS,
          shop,
          isSaving: true
      }
  }

  export const successSavingSettings = (settings) => {
      return { 
          type: actionTypes.SUCCESS_SAVING_SETTINGS,
          settings,
          isSaving: false
      }
  }

  export function saveSettings(shop, data) {
    return (dispatch) => {
  
      dispatch(trySavingSettings(shop))

      let dataToSave = data
      dataToSave.shop = dataToSave.shop ? dataToSave.shop : shop
      dataToSave._id = dataToSave._id ? dataToSave._id : null
  
      return fetch( serverUrl + `/api/settings`,
            {
                method: 'PUT',
                body: JSON.stringify(dataToSave),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        .then(
          response => response.json(),
          // Do not use catch
          error => console.log('An error occurred.', error)
        )
        .then(json => dispatch(successSavingSettings(shop, json))
        )
    }
  }

  export const trySavingQuestion = () => {
    return { 
          type: actionTypes.TRY_SAVING_QUESTION,
          isSaving: true
      }
  }

  export const successSavingQuestion = (data) => {
    // Save the new question in current settings
    let newSettings = data.settings
    let foundIndex = newSettings.questions.findIndex(x => x._id == data.question._id);
    newSettings.questions[foundIndex] = data.question;

    return { 
        type: actionTypes.SUCCESS_SAVING_QUESTION,
        settings: newSettings,
        isSaving: false
    }
  }

  export function saveQuestion(data) {
    return (dispatch) => {
  
      dispatch(trySavingQuestion())

      let dataToSave = data
      dataToSave.question.slug = slugify(dataToSave.question.question)
  
      return fetch( serverUrl + `/api/settings/savequestion`,
            {
              method: 'PUT',
              body: JSON.stringify(dataToSave),
              headers: {
                  'Content-Type': 'application/json'
              }
            })
        .then(
          response => response.json(),
          // Do not use catch
          error => console.log('An error occurred.', error)
        )
        .then(json => dispatch(successSavingQuestion(dataToSave))
        )
    }
  }

  export function saveAnswer(answer, questionNum) {
    return (dispatch, getState) => {
      const { answers } = getState();
      let newAnswers = answers
      newAnswers[questionNum] = answer

      dispatch({ 
        type: actionTypes.SAVE_ANSWER,
        answers: newAnswers
    })
    }
  }


//SLUGIFY
function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}



// INITIALIZE
export function initializeStore () {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
  )
}