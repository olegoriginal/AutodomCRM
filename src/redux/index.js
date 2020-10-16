import { createStore , applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import rootReducer from './reducers'

export const history = createBrowserHistory()
const composeFunc =
  process.env.NODE_ENV === "development" ? composeWithDevTools : compose
const enhancers = []
const middleware = [thunk]

const initialState = {}

const composedEnhancers = composeFunc(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(rootReducer(history), initialState, composedEnhancers)


export default store
