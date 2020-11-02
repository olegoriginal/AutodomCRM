const selectStyle = {
  control: (styles) => ({
    ...styles,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    maxHeight: 24,
    minHeight: 20,
  }),
  valueContainer: (styles) => ({ ...styles, padding: 0, paddingLeft: 14 }),
  input: (styles) => ({
    ...styles,
    padding: 0,
    margin: 0,
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    marginBottom: 0,
    marginTop: 0,
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    maxHeight: 24,
  }),
}
