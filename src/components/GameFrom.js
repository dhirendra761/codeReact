import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactImageFallback from "react-image-fallback";
import FormInlineMessage from "./FormInlineMessage";
import { Link } from "react-router-dom";
// const tags = [
//   { _id: 1, name: "dice" },
//   { _id: 2, name: "economic" },
//   { _id: 3, name: "family" },
// ];
// const genre = [
//   { _id: 1, name: "abstract" },
//   { _id: 2, name: "euro" },
//   { _id: 3, name: "ameritrash" },
// ];
const initialData = {
  name: "",
  description: "",
  price: 0,
  duration: 0,
  players: "",
  featured: true,
  // tags: [],
  // genre: 1,
  publisher: 0,
  thumbnail: "",
};
export default class GameFrom extends Component {
  state = {
    data: initialData,
    errors: {},
    loading: false,
    redirect: false,
  };
  componentDidMount() {
    if (this.props.game._id) {
      this.setState({ data: this.props.game });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.game._id && nextProps.game._id !== this.state.data._id) {
      this.setState({ data: nextProps.game });
    }
    if (!nextProps.game._id) {
      this.setState({ data: initialData });
    }
  }
  validate(data) {
    const errors = {};
    if (!data.name) errors.name = "This field can't be blank";
    if (!data.description) errors.description = "This field can't be blank";
    if (!data.players) errors.players = "This field can't be blank";
    if (!data.publisher) errors.publisher = "This field can't be blank";
    if (!data.thumbnail) errors.thumbnail = "This field can't be blank";
    if (data.price <= 0) errors.price = "Too cheap, don't you think?";
    if (data.duration <= 0) errors.duration = "Too short, isn't it?";

    return errors;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // CLIENT SIDE VALIDATION
    //  const errors = this.validate(this.state.data);
    // const errors = {};
    // this.setState({ errors });

    // if (Object.keys(errors).length === 0) {
    //   this.props.submit(this.state.data);
    // }

    // SERVERSIDE VALIDATION

    const errors = {};
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });

      this.props
        .submit(this.state.data)
        .then(() => this.setState({ redirect: true }))
        .catch((err) =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };
  handleStringChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  handleNumberChange = (e) =>
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: parseInt(e.target.value, 10),
      },
    });
  handleCheckboxChange = (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.checked },
    });
  };
  // toggleTag = (tag) => {
  //   this.state.tags.includes(tag._id)
  //     ? this.setState({ tags: this.state.tags.filter((id) => id !== tag._id) })
  //     : this.setState({ tags: [...this.state.tags, tag._id] });
  // };
  // handleGenreChange = (genre) => {
  //   this.setState({ genre: genre._id });
  //   console.log(this.state.genre === genre._id);
  // };
  render() {
    const { data, errors, loading } = this.state;
    const formClassNames = loading ? "ui form loading" : "ui form";
    return (
      <form className={formClassNames} onSubmit={this.handleSubmit}>
        {/* This is another way to route after create game* {this.state.redirect && <Redirect to="/games" />} */}
        <div className="ui grid">
          <div className="twelve wide column">
            <div className={errors.name ? "field error" : "field"}>
              <label htmlFor="name">Game Title</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full game title"
                value={data.name}
                onChange={this.handleStringChange}
              />
              <FormInlineMessage content={errors.name} type="error" />
            </div>
            <div className={errors.description ? "field error" : "field"}>
              <label htmlFor="description">Game Description</label>
              <textarea
                type="text"
                id="description"
                name="description"
                placeholder="Full game title"
                value={data.description}
                onChange={this.handleStringChange}
              />
              <FormInlineMessage content={errors.description} type="error" />
            </div>
          </div>
          <div className="four wide column">
            <ReactImageFallback
              src={data.thumbnail}
              fallbackImage="http://via.placeholder.com/250x250"
              alt="Thumbnail"
              className="ui image"
            />
          </div>
        </div>

        <div className={errors.thumbnail ? "field error" : "field"}>
          <label htmlFor="thumbnail">Thumbnails</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            placeholder="Image URL"
            value={data.thumbnail}
            onChange={this.handleStringChange}
          />
          <FormInlineMessage content={errors.thumbnail} type="error" />
        </div>

        <div className="three fields">
          <div className={errors.price ? "field error" : "field"}>
            <label htmlFor="price">Price (in cents)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={data.price}
              onChange={this.handleNumberChange}
            />
            <FormInlineMessage content={errors.price} type="error" />
          </div>
          <div className={errors.duration ? "field error" : "field"}>
            <label htmlFor="duration">Duration (in min)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={data.duration}
              onChange={this.handleNumberChange}
            />
            <FormInlineMessage content={errors.duration} type="error" />
          </div>
          <div className={errors.players ? "field error" : "field"}>
            <label htmlFor="players">Players</label>
            <input
              type="text"
              id="players"
              name="players"
              value={data.players}
              onChange={this.handleStringChange}
            />
            <FormInlineMessage content={errors.players} type="error" />
          </div>
        </div>
        <div className="inline field">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={data.featured}
            onChange={this.handleCheckboxChange}
          />
          <label htmlFor="featured">Featured?</label>
        </div>

        <div className={errors.publisher ? "field error" : "field"}>
          <label>Publishers</label>
          <select
            name="publisher"
            value={this.state.publisher}
            onChange={this.handleNumberChange}
          >
            <option value="0">Choose Publisher</option>
            {this.props.publishers.map((publisher) => (
              <option key={publisher._id} value={publisher._id}>
                {publisher.name}
              </option>
            ))}
          </select>
          <FormInlineMessage content={errors.publisher} type="error" />
        </div>
        <div className="ui fluid buttons">
          <button className="ui primary button" type="submit">
            Create
          </button>
          <div className="or"></div>
          <Link to="/games" className="ui button">
            Cancel
          </Link>
        </div>
      </form>
    );
  }
}

GameFrom.propTypes = {
  publishers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRquired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  submit: PropTypes.func.isRequired,
  game: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    thumbnail: PropTypes.string,
    players: PropTypes.string,
    price: PropTypes.number,
    duration: PropTypes.number,
    featured: PropTypes.bool,
  }).isRequired,
};

GameFrom.defaultProps = {
  publishers: [],
};
