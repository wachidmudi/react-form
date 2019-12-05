import React, { useState, useEffect } from 'react';
import produce from 'immer';
import { set, has } from 'lodash';
import './App.css';

const enhancedReducer = (state, updateArg) => {
  // check if the type of update argument is a callback function
  if (updateArg.constructor === Function) {
    return { ...state, ...updateArg(state) };
  }

  // if the type of update argument is an object
  if (updateArg.constructor === Object) {
    // does the update object have _path and _value as it's keys
    // if yes then use them to update deep object values
    if (has(updateArg, '_path') && has(updateArg, '_value')) {
      const { _path, _value } = updateArg;

      return produce(state, draft => {
        set(draft, _path, _value);
      });
    } else {
      return { ...state, ...updateArg };
    }
  }
};

const initialState = {
  title: '',
  firstName: '',
  lastName: '',
  position: '',
  company: '',
  adresses: '',
  zipCode: '',
  place: '',
  country: '',
  code: '',
  phone: '',
  email: '',
  isAccept: false
};

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data };
};

const App = () => {
  const [state, updateState] = React.useReducer(enhancedReducer, initialState);

  const updateForm = React.useCallback(({ target: { value, name, type } }) => {
    const updatePath = name.split('.');

    // if the input is a checkbox then use callback function to update
    // the toggle state based on previous state
    if (type === 'checkbox') {
      updateState(prevState => ({
        [name]: !prevState[name]
      }));

      return;
    }

    // if we have to update the root level nodes in the form
    if (updatePath.length === 1) {
      const [key] = updatePath;

      updateState({
        [key]: value
      });
    }

    // if we have to update nested nodes in the form object
    // use _path and _value to update them.
    if (updatePath.length === 2) {
      updateState({
        _path: updatePath,
        _value: value
      });
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);
  };

  const country = useFetch('https://restcountries.eu/rest/v2/all');
  const title = ['Businessman', 'Secretary', 'Reporter'];
  const position = ['Director', 'Employee', 'Manager'];
  console.log(country);
  return (
    <React.Fragment>
      <div className="container">
        <div className="row no-gutter">
          <div className="col my-5">
            <form onSubmit={handleSubmit}>
              <div className="row no-gutter">
                <div className="form-group col col-md-6 col-12 bg-light p-4 form-rounded-1">
                  <h2 className="mb-4 text-primary">General Information</h2>

                  <div className="form-group">
                    <select
                      className="custom-select"
                      onChange={updateForm}
                      value={state.title}
                      name="title"
                    >
                      <option value="" disabled>
                        Title
                      </option>
                      {title.map((item, key) => (
                        <option key={key} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <input
                        className="form-control"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={updateForm}
                        value={state.firstName}
                      />
                    </div>
                    <div className="form-group col">
                      <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={updateForm}
                        value={state.lastName}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <select
                      className="custom-select"
                      onChange={updateForm}
                      value={state.position}
                      name="position"
                    >
                      <option value="" disabled>
                        Position
                      </option>
                      {position.map((item, key) => (
                        <option key={key} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="company"
                      placeholder="Company"
                      onChange={updateForm}
                      value={state.company}
                    />
                  </div>
                </div>

                <div className="form-group col col-md-6 col-12 bg-warning p-4 form-rounded-2">
                  <h2 className="mb-4 text-white">Contact Details</h2>

                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="adresses"
                      placeholder="Adresses"
                      onChange={updateForm}
                      value={state.address}
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <input
                        className="form-control"
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        onChange={updateForm}
                        value={state.zipCode}
                      />
                    </div>
                    <div className="form-group col">
                      <input
                        className="form-control"
                        type="text"
                        name="place"
                        placeholder="Place"
                        onChange={updateForm}
                        value={state.place}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <select
                      className="custom-select"
                      value={state.country}
                      onChange={updateForm}
                      name="country"
                    >
                      <option value="" disabled>
                        Country
                      </option>
                      {country.loading ? (
                        <option value="">Loading... </option>
                      ) : (
                        country.data.map((item, key) => (
                          <option key={key} value={item.name}>
                            {item.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <input
                        className="form-control"
                        type="text"
                        name="code"
                        placeholder="Code *"
                        onChange={updateForm}
                        value={state.code}
                      />
                    </div>
                    <div className="form-group col">
                      <input
                        className="form-control"
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={updateForm}
                        value={state.phone}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      placeholder="Your Email"
                      onChange={updateForm}
                      value={state.email}
                    />
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                        name="isAccept"
                        onChange={updateForm}
                        defaultChecked={state.isAccept}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        <small>
                          I do accept the{' '}
                          <b>
                            <i>Term and Conditions</i>
                          </b>{' '}
                          of your site
                        </small>
                      </label>
                    </div>
                  </div>
                  <input
                    className="btn btn-light rounded"
                    type="submit"
                    value="Submit"
                    data-toggle="modal"
                    data-target="#confirmModal"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div id="confirmModal" className="modal" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Register Confirmation</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <h6>Title: {state.title}</h6>
              <h6>First Name: {state.firstName}</h6>
              <h6>Last Name: {state.lastName}</h6>
              <h6>Position: {state.position}</h6>
              <h6>Company: {state.company}</h6>
              <h6>Place: {state.place}</h6>
              <h6>Country: {state.country}</h6>
              <h6>E-mail: {state.email}</h6>
              <h6>Accept: {state.isAccept ? 'Accepted' : 'Declined'}</h6>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
