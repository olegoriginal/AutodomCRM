import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import AutopartsEdit from "../../components/autoparts/autoparts.order.edit"
import Navbar from "../../components/Navbar"
import { updateAutopart } from "../../redux/reducers/autoparts"

const AutopartEditFull = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const list = useSelector((s) => s.autoparts.list).filter(
    (it) => JSON.stringify(it.id_autoparts) === id
  )
  const updateAutopartLocal = (id, name) => {
    dispatch(updateAutopart(id, name))
  }
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-3">
        {list.map((it, id) => (
          <AutopartsEdit
            key={id}
            {...it}
            updateAutopart={updateAutopartLocal}
          />
        ))}
      </div>
    </div>
  )
}

export default AutopartEditFull
