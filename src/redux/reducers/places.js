import { GET_PLACES, CREATE_PLACE, UPDATE_PLACE } from "../actions/places"

const initialState = {
  list: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLACES: {
      return { ...state, list: action.places }
    }
    case CREATE_PLACE: {
      return { ...state, list: [...state.list, action.place] }
    }
    case UPDATE_PLACE: {
      return {
        ...state,
        list: state.list.map((it) => {
          return action.place.id === it.id ? action.place : it
        }),
      }
    }

    default:
      return state
  }
}

export function getPlaces() {
  return (dispatch) => {
    fetch("/api/v1/place")
      .then((r) => r.json())
      .then(({ data: places }) => {
        dispatch({ type: GET_PLACES, places })
      })
  }
}

export function createPlace(name) {
  return (dispatch) => {
    fetch("/api/v1/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((r) => r.json())
      .then(({ data: place }) => {
        dispatch({ type: CREATE_PLACE, place })
      })
  }
}

export function updatePlace(id, status) {
  return (dispatch) => {
    fetch(`/api/v1/place/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    })
      .then((r) => r.json())
      .then(({ data: place }) => {
        dispatch({ type: UPDATE_PLACE, place })
      })
  }
}
