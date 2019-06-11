import thunkMiddleware from 'redux-thunk'
import 'babel-polyfill'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import fetch from 'cross-fetch'
import { merge } from 'lodash'

const loggerMiddleware = createLogger({
  collapsed: true
})

const initialState = {
    isFetching: false,
    isLoaded: false,
    isSaving: false,
    isCouponsLoaded: false,
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

  GET_COUPONS: 'GET_COUPONS',
  REQUEST_COUPONS: 'REQUEST_COUPONS',
  RECEIVE_COUPONS: 'RECEIVE_COUPONS',
  SAVE_COUPONS: 'SAVE_COUPONS',
  TRY_SAVING_COUPONS: 'TRY_SAVING_COUPONS',
  SUCCESS_SAVING_COUPONS: 'SUCCESS_SAVING_COUPONS',
  DELETE_COUPONS: 'DELETE_COUPONS',
  GET_PRICE_RULE: 'GET_PRICE_RULE',

  SAVE_QUESTION: 'SAVE_QUESTION',
  TRY_SAVING_QUESTION: 'TRY_SAVING_QUESTION',
  SUCCESS_SAVING_QUESTION: 'SUCCESS_SAVING_QUESTION',
  DELETE_QUESTION: 'DELETE_QUESTION',
  TRY_DELETING_QUESTION: 'TRY_DELETING_QUESTION',
  SUCCESS_DELETING_QUESTION: 'SUCCESS_DELETING_QUESTION',

  SAVE_OPTION: 'SAVE_OPTION',
  TRY_SAVING_OPTION: 'TRY_SAVING_OPTION',
  SUCCESS_SAVING_OPTION: 'SUCCESS_SAVING_OPTION',
  SAVE_ANSWER: 'SAVE_ANSWER',
  HIGHER_QUESTION: 'HIGHER_QUESTION',
  LOWER_QUESTION: 'LOWER_QUESTION'
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
      
      case actionTypes.GET_COUPONS:
        newState.shop = action.shop
        return newState

      case actionTypes.REQUEST_COUPONS:
        newState.isFetching = true
        return newState

      case actionTypes.RECEIVE_COUPONS:
        newState.isFetching = false
        newState.isCouponsLoaded = true
        newState.coupons = action.coupons
        return newState
      
      case actionTypes.DELETE_COUPONS:
        newState.coupons._id = ''
        newState.coupons.discountCodes = []
        newState.coupons.discountCodesSent = []
        return newState
      
      case actionTypes.TRY_SAVING_COUPONS:
        newState.isSaving = action.isSaving
        return newState
      
      case actionTypes.SUCCESS_SAVING_COUPONS:
        newState.isSaving = action.isSaving
        newState.coupons = action.coupons
        return newState
      
      case actionTypes.GET_PRICE_RULE:
        newState.coupons.priceRule = action.priceRule
        return newState

      case actionTypes.SUCCESS_SAVING_QUESTION:
        newState.settings = action.settings
        return newState
    
      case actionTypes.TRY_DELETING_QUESTION:
        newState.isDeleting = action.isDeleting
        return newState
      
      case actionTypes.SUCCESS_DELETING_QUESTION:
        newState.settings = action.settings
        newState.isDeleting = action.isDeleting
        return newState

      case actionTypes.SUCCESS_SAVING_OPTION:
          newState.settings = action.settings
          return newState

      case actionTypes.SAVE_ANSWER:
          newState.answers = action.answers
          return newState

      case actionTypes.LOWER_QUESTION:
          newState.settings = action.settings
          return newState
      
      case actionTypes.HIGHER_QUESTION:
          newState.settings = action.settings
          return newState

        default:
        return state
  }
}

// ACTIONS

  //#################
  // GET SETTINGS
  //#################
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
      //dispatch(getThemes(shop, token))
  
      return fetch( APP_URL + `/api/settings/${shop}`)
        .then(
          response => response.json(),
          // Do not use catch
          error => console.log('An error occurred.', error)
        )
        .then(json => dispatch(receiveSettings(shop, json))
        )
    }
  }

  //#################
  // SAVE SETTINGS
  //#################

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
  
      return fetch( APP_URL + `/api/settings`,
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

  //#################
  // SAVE QUESTION
  //#################

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
  
      return fetch( APP_URL + `/api/settings/savequestion`,
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

  // DELETE QUESTION

  export const tryDeletingQuestion = () => {
    return { 
          type: actionTypes.TRY_DELETING_QUESTION,
          isDeleting: true
      }
  }

  export const successDeletingQuestion = (data) => {
    return function(dispatch, getState) {

      // Save the new question in current settings
      let {settings} = Object.assign({}, getState());
      let foundIndex = settings.questions.findIndex(x => x._id == data._id);
      settings.questions.splice(foundIndex, 1);

      dispatch({ 
        type: actionTypes.SUCCESS_DELETING_QUESTION,
        settings,
        isDeleting: false
      })
    }
  }

  export function deleteQuestion(data) {
    return (dispatch) => {
  
      dispatch(tryDeletingQuestion())
  
      return fetch( APP_URL + `/api/settings/deletequestion`,
            {
              method: 'PUT',
              body: JSON.stringify(data),
              headers: {
                  'Content-Type': 'application/json'
              }
            })
        .then(
          response => response.json(),
          // Do not use catch
          error => console.log('An error occurred.', error)
        )
        .then(json => dispatch(successDeletingQuestion(data))
        )
    }
  }

  //##################
  // MOVE QUESTIONS
  //##################

  export const lowerQuestion = (index) => {
    return function(dispatch, getState) {
      const {settings} = getState()

      const question1 = settings.questions[index]
      const question2 = settings.questions[index + 1]
      let newSettings = Object.assign({}, settings);

      newSettings.questions[index + 1] = question1
      newSettings.questions[index] = question2

      dispatch(saveSettings(newSettings.shop, newSettings))

      dispatch({ 
        type: actionTypes.LOWER_QUESTION,
        settings: newSettings
      })
    }
  }

  export const higherQuestion = (index) => {
    return function(dispatch, getState) {
      const {settings} = getState()

      const question1 = settings.questions[index]
      const question2 = settings.questions[index - 1]
      let newSettings = Object.assign({}, settings);

      newSettings.questions[index - 1] = question1
      newSettings.questions[index] = question2

      dispatch(saveSettings(newSettings.shop, newSettings))

      dispatch({ 
        type: actionTypes.HIGHER_QUESTION,
        settings: newSettings
      })
    }
  }

  //#################
  // SAVE RESULT OPTIONS
  //#################

  export const trySavingOption = () => {
    return { 
          type: actionTypes.TRY_SAVING_OPTION,
          isSaving: true
      }
  }

  export const successSavingOption = (data) => {
    // Save the new option in current settings
    let newSettings = data.settings
    let foundIndex = newSettings.resultOptions.findIndex(x => x._id == data.option._id);
    newSettings.resultOptions[foundIndex] = data.option;

    return { 
        type: actionTypes.SUCCESS_SAVING_OPTION,
        settings: newSettings,
        isSaving: false
    }
  }

  export function saveOption(data) {
    return (dispatch) => {
  
      dispatch(trySavingOption())

      let dataToSave = data
      dataToSave.option.slug = slugify(dataToSave.option.title)
  
      return fetch( APP_URL + `/api/settings/saveoption`,
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
        .then(json => dispatch(successSavingOption(dataToSave))
        )
    }
  }

  //#################
  // SAVE ANSWERS WHEN PEOPLE TAKE THE QUIZ
  //#################

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


  //#################
  // GET COUPOMS
  //#################
export const requestCoupons = (shop) => {
  return { 
        type: actionTypes.GET_COUPONS,
        shop
    }
}
export const receiveCoupons = (shop, coupons) => {
    return { 
        type: actionTypes.RECEIVE_COUPONS,
        shop, 
        coupons
    }
}

export function getCoupons(shop) {
    return function(dispatch, getState) {

        const state = getState()
        if (state.isCouponsLoaded) return
  
      dispatch(requestCoupons(shop))
      //dispatch(getThemes(shop, token))
  
      return fetch( APP_URL + `/api/coupons/${shop}`)
        .then(
          response => response.json(),
          // Do not use catch
          error => console.log('An error occurred.', error)
        )
        .then(json => dispatch(receiveCoupons(shop, json))
        )
    }
  }

  //#################
  // SAVE COUPONS
  //#################

  export const trySavingCoupons = (shop) => {
    return { 
          type: actionTypes.TRY_SAVING_COUPONS,
          isSaving: true
      }
  }

  export const successSavingCoupons = (coupons) => {
      return { 
          type: actionTypes.SUCCESS_SAVING_COUPONS,
          coupons,
          isSaving: false
      }
  }

export const getPriceRule = (data) => {
  return function (dispatch, getState) {
    const { settings } = getState()
    
    console.log('Get Price Rule')
    
    let priceRule = {
      "price_rule": {
        "title": data.discountAmount + "OFF-QUIZR",
        "target_type": "line_item",
        "target_selection": "all",
        "allocation_method": "across",
        "usage_limit": 1,
        "value_type": data.discountType == 'dollars' ? "fixed_amount" : "percentage",
        "value": "-" + data.discountAmount,
        "customer_selection": "all",
        "starts_at": new Date()
      }
    }

    var dataToSend = {
      body: priceRule,
      accessToken: settings.accessToken,
      route: "price_rules.json"
    }

    return fetch( APP_URL + `/api/shopify`,
      {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        response => response.json(),
        // Do not use catch
        error => console.log('An error occurred.', error)
      )
      .then(json => dispatch(createDiscountCodes(data, json.data.price_rule, data.discountEndQty)))
  }
}
  
export const createDiscountCodes = (couponsData, priceRule, qty) => {
  return function (dispatch, getState) {
    const { settings } = getState()
    
    console.log('Create Discount Codes')
    
    let discountQty = qty > 100 ? 100 : qty
    let data = {
      "discount_codes": makeDiscountCodes(discountQty, 'QUIZ')
    }

    console.log('Creating ' + data["discount_codes"].length + 'discount codes')
    var dataToSend = {
      body: data,
      accessToken: settings.accessToken,
      route: "price_rules/" + priceRule.id + "/batch.json"
    }

    return fetch( APP_URL + `/api/shopify`,
      {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        response => response.json(),
        // Do not use catch
        error => console.log('An error occurred.', error)
      )
      .then(json => { 
        const newCodes = data["discount_codes"].map(item => item.code)
        const udpatedCoupons = {
          ...couponsData,
          discountCodes: couponsData.discountCodes
            ? couponsData.discountCodes.concat(newCodes)
            : newCodes
        }
        //If all codes have been created
        if (qty > 100) {
          //Look for it one more time
          const newQty = qty - 100
          dispatch(createDiscountCodes(udpatedCoupons, priceRule, newQty))
        } else { 
          //Save the new codes
          var dataToSave = {
            ...udpatedCoupons,
            priceRule: priceRule.id
          }
          dispatch(saveCoupons(dataToSave))
        }
      }
        )
    }
}

  export function saveCouponsProcess(shop, data) {
    return (dispatch) => {
  
      dispatch(trySavingCoupons(shop))

      let dataToSave = data
      dataToSave.shop = dataToSave.shop ? dataToSave.shop : shop
      dataToSave._id = dataToSave._id ? dataToSave._id : null

      dispatch(getPriceRule(dataToSave))
    }
  }

  export function saveCoupons(dataToSave) {
    return (dispatch) => {

      console.log('Saving', dataToSave)

      return fetch( APP_URL + `/api/coupons`,
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
        .then(json => dispatch(successSavingCoupons(json))
        )
    }
  }

  export function deleteCoupons(data) {
    return (dispatch, getState) => {

      const {settings} = getState()
      const couponsID = { _id: data._id }
      
      var dataToSend = {
        accessToken: settings.accessToken,
        route: "price_rules/" + data.priceRule + ".json",
        method: "DELETE"
      }
  
      return fetch( APP_URL + `/api/shopify`,
            {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        .then(
          response => response.json(),
          // Do not use catch
          error => console.log('An error occurred.', error)
        )
        .then(json => {
            console.log('Deleted in Shopify', json)
            return fetch( APP_URL + `/api/coupons/delete`,
              {
                  method: 'PUT',
                  body: JSON.stringify(couponsID),
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
          .then(
            response => response.json(),
            // Do not use catch
            error => console.log('An error occurred.', error)
          )
          .then(json => dispatch({ 
            type: actionTypes.DELETE_COUPONS
            })
          )
         }
        )
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

//Coupon Generator
function makeDiscountCode (length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function makeDiscountCodes(length, string) {
  var codesArray = []
  for ( var i = 0; i < length; i++ ) {
    codesArray.push({ "code": makeDiscountCode(7) + string })
  }
  return codesArray;
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