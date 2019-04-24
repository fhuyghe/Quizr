import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import fetch from 'cross-fetch'
import { merge } from 'lodash'

const loggerMiddleware = createLogger()

const initialState = {
    isFetching: false,
    isLoaded: false,
    isSaving: false,
    settings: {
        collectEmailChecked: true,
        resultsTitle: 'A Redux Title',
        resultsParagraph: '',
        resultsTextAfter: '',
        introTitle: '',
        introParagraph: '',
    }
}

export const actionTypes = {
  GET_SETTINGS: 'GET_SETTINGS',
  REQUEST_SETTINGS: 'REQUEST_SETTINGS',
  RECEIVE_SETTINGS: 'RECEIVE_SETTINGS',
  SAVE_SETTINGS: 'SAVE_SETTINGS',
  TRY_SAVING_SETTINGS: 'TRY_SAVING_SETTINGS',
  SUCCESS_SAVING_SETTINGS: 'SUCCESS_SAVING_SETTINGS',
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
            newState.isFetching= false
            newState.isLoaded= true
            newState.settings= action.settings
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
  
      return fetch(`https://daaaea7b.ngrok.io/api/settings/${shop}`)
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
    return (dispatch, getState) => {
  
      dispatch(trySavingSettings(shop))

      let dataToSave = data
      dataToSave.shop = dataToSave.shop ? dataToSave.shop : shop
      dataToSave._id = dataToSave._id ? dataToSave._id : null
  
      return fetch(`https://daaaea7b.ngrok.io/api/settings`,
            {
                method: 'POST',
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