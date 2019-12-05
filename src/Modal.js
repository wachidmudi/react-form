import React from 'react';

const Modal = props => {
  return (
    <React.Fragment>
      <div id="confirmDialog" className="modal" tabIndex={-1} role="dialog">
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
              <h6>Title: {props.state.title}</h6>
              <h6>First Name: {props.state.firstName}</h6>
              <h6>Last Name: {props.state.lastName}</h6>
              <h6>Position: {props.state.position}</h6>
              <h6>Company: {props.state.company}</h6>
              <h6>Place: {props.state.place}</h6>
              <h6>Country: {props.state.country}</h6>
              <h6>E-mail: {props.state.email}</h6>
              <h6>Accept: {props.state.isAccept ? 'Accepted' : 'Declined'}</h6>
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

export default Modal;
