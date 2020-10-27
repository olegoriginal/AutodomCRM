const placeList = () =>
  fetch("/api/v1/place")
    .then((response) => response.json())
    .then((data) => JSON.stringify(data.data))
    .then((array) => array)
export default placeList
