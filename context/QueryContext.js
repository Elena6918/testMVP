import createDataContext from "./createDataContext"
import serverApi from "../api/server"
import { AsyncStorage } from "react-native"
import { navigate } from "../navigationRef"

const queryReducer = (state, action) => {
  switch (action.type) {
    case "send":
      return { errorMessage: "", status: action.payload }
    case "add_error":
      return { ...state, errorMessage: action.payload }
    case "clear_error_message":
      return { ...state, errorMessage: "", status: "" }
    default:
      return state
  }
}

const sendQuery = dispatch => async({userId, username, category, message}) => {
    try{
        console.log(userId)
        console.log("username "+username)
        const response = await serverApi.post("/query/send", {
            userId, 
            username, 
            category,
            message
        })
        dispatch({type: "send", payload: response.data})
    }catch (err) {
        if (err.response) {
          dispatch({
            type: "add_error",
            payload: err.response.data.error
          })
        //   setTimeout(() => {
        //     dispatch({ type: 'clear_error_message' })
        //   }, 3000)
        }
    }
}

const sendResponse = dispatch => async({userId, recipientId, username, message}) => {
    try{
        const response = await serverApi.put("/response/send", {
            userId,
            recipientId,
            username,
            message
        })
        dispatch({type: "send", payload: response.data})
    } catch (err) {
        if (err.response) {
          dispatch({
            type: "add_error",
            payload: err.response.data.error
          })
          setTimeout(() => {
            dispatch({ type: 'clear_error_message' })
          }, 3000)
        }
    }
}

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" })
}

export const { Provider, Context } = createDataContext(
  queryReducer,
  { sendQuery, sendResponse, clearErrorMessage },
  { errorMessage: "", status: "" }
)
