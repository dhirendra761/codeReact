import React from "react";
import PropTypes from "prop-types";

const Featured = ({ featured, toggleFeatured, gameId }) => (
  <span>
    {featured ? (
      <a
        onClick={() => toggleFeatured(gameId)}
        className="ui right yellow corner label"
      >
        <i className="icon star"></i>
      </a>
    ) : (
      <a
        onClick={() => toggleFeatured(gameId)}
        className="ui right corner label"
      >
        <i className="icon empty star"></i>
      </a>
    )}
  </span>
);

Featured.propTypes = {
  featured: PropTypes.bool.isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  gameId: PropTypes.number.isRequired
};
export default Featured;
