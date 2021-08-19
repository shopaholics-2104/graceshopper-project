import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { connect } from "react-redux";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleAddressChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    console.log(address);
    this.setState({ address });
  };

  render() {
    const { address } = this.state;
    const { handleSelect, handleAddressChange } = this;

    return (
      <PlacesAutocomplete
        value={address}
        onChange={handleAddressChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div style={{ margin: "0rem" }}>
            <input
              {...getInputProps({
                placeholder: "Search Places...",
                name: "address",
              })}
            />
            <div style={{ margin: "0rem" }}>
              {suggestions.map((suggestion) => {
                return (
                  <div {...getSuggestionItemProps(suggestion, {})}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
});

export default connect(mapStateToProps, null)(LocationSearchInput);
