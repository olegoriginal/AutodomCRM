import React from "react"
import { useDispatch } from "react-redux"
import PlaceCreate from "../components/tasks/place.create"
import { createPlace } from "../redux/reducers/places"

const PlaceNew = () => {
  const dispatch = useDispatch()
  const create = (name) => {
    dispatch(createPlace(name))
  }

  return (
    <div className="flex font-medium flex-col w-full">
      <PlaceCreate create={create} />
    </div>
  )
}

export default PlaceNew
