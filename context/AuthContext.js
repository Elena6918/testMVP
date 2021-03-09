import createDataContext from "./createDataContext"
import serverApi from "../api/server"
import { AsyncStorage } from "react-native"
import { navigate } from "../navigationRef"


const authReducer = (state, action) => {
  switch (action.type) {
    case "send":
      return { errorMessage: "", status: action.payload }
    case "signin":
      return { errorMessage: "", token: action.payload }
    case "add_error":
      return { ...state, errorMessage: action.payload }
    case "clear_error_message":
      return { ...state, errorMessage: "", status: "" }
    case "edit":
      return { errorMessage: "", status: action.payload }
    default:
      return state
  }
}

const signup = dispatch => async ({ username, password, confirmation, identity }) => {
  try {
    const response = await serverApi.post("/signup", {
      username,
      password,
      confirmation,
      identity
    })
    await AsyncStorage.setItem("token", response.data.token)
    await AsyncStorage.setItem("identity", identity)
    const videoState = {
      video1: false,
      video2a: false,
      video2b: false,
      video3: false,
      video4: false,
      video5: false
    }
    const quizState = {
      quiz1: false,
      quiz2a: false,
      quiz2b: false,
      quiz3: false,
      quiz4: false,
      quiz5: false
    }
    await AsyncStorage.setItem("quizState", JSON.stringify(quizState))
    await AsyncStorage.setItem("videoState", JSON.stringify(videoState))
    await AsyncStorage.setItem("CertState", "0")
    if(identity=="trainer"){
      navigate("TQuestion")
    }
    if(identity=="patient"){
      navigate("UQuestion")
    }
    setTimeout(() => {
      dispatch({ type: 'clear_error_message' })
    }, 3000)
  } catch (err) {
    if (err.response) {
      dispatch({
        type: "add_error",
        payload: err.response.data.error
      })
    }
  }
}

const signin = dispatch => async ({ username, password }) => {
  try {
    const response = await serverApi.post("/signin", { username, password })
    const identity = response.data.identity
    await AsyncStorage.setItem("token", response.data.token)
    await AsyncStorage.setItem("identity", identity)
    dispatch({ type: "signin", payload: response.data.token })
    if(identity=="trainer"){
      navigate("trainer")
    }
    if(identity=="patient"){
      navigate("patient")
    }
    dispatch({ type: "signin", payload: response.data.token })
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

const changeUsername = dispatch => async ({userId, newUsername}) =>{
  try{
    const response = await serverApi.put("/edit/username",{userId, newUsername})
    dispatch({type: "edit", payload: response.data.status})
  } catch(err){
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

const changePassword = dispatch => async ({userId, oldPassword, newPassword, confirmation}) =>{
  try{
    const response = await serverApi.put("/edit/password",{userId, oldPassword, newPassword, confirmation})
    dispatch({type: "edit", payload: response.data.status})
    setTimeout(() => {
      dispatch({ type: 'clear_error_message' })
    }, 3000)
  } catch(err){
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

const sendQuery = dispatch => async({userId, category, message}) => {
  try{
      const response = await serverApi.post("/query/send", {
          userId, 
          category,
          message
      })
      dispatch({type: "send", payload: response.data.success})
  }catch (err) {
      if (err.response) {
        dispatch({
          type: "add_error",
          payload: err.response.data.error
        })
        setTimeout(() => {
          dispatch({ type: 'clear_error_message' })
        }, 5000)
      }
  }
}

const sendResponse = dispatch => async({userId, recipientId, patientName, message}) => {
  try{
      const response = await serverApi.put("/response/send", {
          userId,
          recipientId,
          patientName,
          message
      })
      dispatch({type: "send", payload: response.data.success})
  } catch (err) {
      if (err.response) {
        dispatch({
          type: "add_error",
          payload: err.response.data.error
        })
        setTimeout(() => {
          dispatch({ type: 'clear_error_message' })
        }, 5000)
      }
  }
}

const queryValidation = dispatch => async({recipientId}) => {
  try{
      const response = await serverApi.post("/query/validate", {recipientId})
      dispatch({type: "send", payload: response.data.query})
  } catch (err) {
      if (err.response) {
        dispatch({
          type: "add_error",
          payload: err.response.data.error
        })
        setTimeout(() => {
          dispatch({ type: 'clear_error_message' })
        }, 5000)
      }
  }
}

const acceptResponse = dispatch => async({userId, ticketName}) => {
  try{
    const response = await serverApi.post("/query/accept",{userId, ticketName})
    dispatch({type: "send", payload: response.data.success})
  } catch(err){
    if(err.response){
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

const denyResponse = dispatch => async({patientId}) => {
  try{
    const response = await serverApi.put("/query/deny",{patientId})
    dispatch({type: "send", payload: response.data.success})
  } catch(err){
    if(err.response){
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

const saveConversation = dispatch => async({pairId}) => {
  try{
    const response = await serverApi.post("/done/send",{pairId})
    dispatch({type: "send", payload: response.data.success})
  } catch(err){
    if(err.response){
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

const trainerFeedback = dispatch => async({userId, feedback}) => {
  try{
    const timestamp = new Date().toLocaleDateString("en-US")
    const response = await serverApi.post("/feedback/trainer",{userId, timestamp, feedback})
    dispatch({type: "send", payload: response.data.success})
  } catch(err){
    if(err.response){
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

const patientFeedback = dispatch => async({userId, feedback}) => {
  try{
    const timestamp = new Date().toLocaleDateString("en-US")
    const response = await serverApi.post("/feedback/patient",{userId, timestamp, feedback})
    dispatch({type: "send", payload: response.data.success})
  } catch(err){
    if(err.response){
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
  authReducer,
  { 
    signup, signin, changeUsername, changePassword, clearErrorMessage, sendQuery, sendResponse,
    acceptResponse, denyResponse, saveConversation, trainerFeedback, patientFeedback, queryValidation,
  },
  { token: null, errorMessage: "", status: "" }
)
