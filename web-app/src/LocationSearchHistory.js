import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LocationSearchHistory.css';

class LocationSearchHistory extends Component {
  constructor(props) {
    super(props);

    const { postalCodeSearchValue, locations } = props;

    this.state = {
      locations,
      postalCodeSearchValue,
      searchHistory: [],
    };
  }

  componentDidMount() {
    const { postalCodeSearchValue, locations } = this.state;

    const searchValue =
      postalCodeSearchValue === '' ? 'all' : postalCodeSearchValue;

    localStorage.setItem(searchValue, locations.length);
    const updatedSearchHistory = [];

    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      const value = localStorage.getItem(key);
      updatedSearchHistory.unshift({ key, value });
    }

    this.setState({
      searchHistory: updatedSearchHistory,
    });
  }

  handleContainerClick = (index, it) => {
    console.info(
      `You click on search number ${index + 1} having "${it.key}" as key and "${
        it.value
      }" as value`
    );
  };

  render() {
    const { searchHistory } = this.state;

    const recentSearches = searchHistory.map((it, index) => (
      <div
        className="LocationSearchHistory__searchContainer"
        role="button"
        onClick={() => this.handleContainerClick(index, it)}
      >
        <div className="LocationSearchHistory__searchValue">{it.key}</div>
        <div className="LocationSearchHistory__countValue">{it.value}</div>
      </div>
    ));

    return (
      <div className="LocationSearchHistory">
        <div className="LocationSearchHistory__mainContainer">
          {recentSearches}
        </div>
      </div>
    );
  }
}

LocationSearchHistory.propTypes = {
  postalCodeSearchValue: PropTypes.string,
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
      city: PropTypes.string,
      postalCode: PropTypes.string,
      countryCode: PropTypes.string,
    })
  ),
};

LocationSearchHistory.defaultProps = {
  postalCodeSearchValue: null,
  locations: null,
};

export default LocationSearchHistory;
