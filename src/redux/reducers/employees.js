import {
  GET_EMPLOYEES,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from "../actions/employees"

const initialState = {
  list: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES: {
      return { ...state, list: action.employees }
    }
    case CREATE_EMPLOYEE: {
      return { ...state, list: [...state.list, action.employee] }
    }
    case UPDATE_EMPLOYEE: {
      return {
        ...state,
        list: state.list.map((it) => {
          return action.employee.id === it.id ? action.employee : it
        }),
      }
    }
    case DELETE_EMPLOYEE: {
      return {
        list: state.list.filter((it) => {
          return action.id !== it.id
        }),
      }
    }
    default:
      return state
  }
}

export function getEmployees() {
  return (dispatch) => {
    fetch("/api/v1/employee")
      .then((r) => r.json())
      .then(({ data: employees }) => {
        dispatch({ type: GET_EMPLOYEES, employees })
      })
  }
}

export function createEmployee(name) {
  return (dispatch) => {
    fetch("/api/v1/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name),
    })
      .then((r) => r.json())
      .then(({ data: employee }) => {
        dispatch({ type: CREATE_EMPLOYEE, employee })
      })
  }
}

export function updateEmployee(id, name) {
  return (dispatch) => {
    fetch(`/api/v1/employee/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name),
    })
      .then((r) => r.json())
      .then(({ data: employee }) => {
        dispatch({ type: UPDATE_EMPLOYEE, employee })
      })
  }
}

export function deleteEmployee(id) {
  return (dispatch) => {
    fetch(`/api/v1/employee/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(({ data: employee }) => {
        dispatch({ type: DELETE_EMPLOYEE, id })
      })
  }
}
