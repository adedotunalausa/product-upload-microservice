import api from "./api";

export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL"
}

export const fetchAll = () => dispatch => {
  api.products().fetchAll()
    .then(res => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: res.data
      })

    })
    .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
  api.products().create(data)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data
      })
      onSuccess()
    })
    .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
  api.products().update(id, data)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: res.data
      })
      onSuccess()
    })
    .catch(err => console.log(err))
}

export const remove = (id, data, onSuccess) => dispatch => {
  api.products().delete(id, data)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id
      })
      onSuccess()
    })
    .catch(err => console.log(err))
}