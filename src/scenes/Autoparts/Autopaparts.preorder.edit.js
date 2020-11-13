import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import AutopartUpdate from "../../components/autoparts/autopaparts.preorder.edit"
import Navbar from "../../components/Navbar"
import { updateAutopart } from "../../redux/reducers/autoparts"

const AutopartEditSimple = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const list = useSelector((s) => s.autoparts.list).filter((it) => it.id === id)
  const updateAutopartLocal = (id, name) => {
    dispatch(updateAutopart(id, name))
  }
  return (
    <div>
      <Navbar />
      <div className="mx-auto px-4 mt-3">
        {list.map((it, id) => (
          <AutopartUpdate
            key={id}
            {...it}
            updateAutopart={updateAutopartLocal}
          />
        ))}
      </div>
    </div>
  )
}

export default AutopartEditSimple
