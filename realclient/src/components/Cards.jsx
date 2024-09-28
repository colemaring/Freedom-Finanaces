import React from "react";
// index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";

function Cards() {
  return (
    <>
      <div class="card">
        <h5 class="card-header">Featured</h5>
        <div class="card-body">
          <h5 class="card-title">Debt Manage</h5>
          <p class="card-text">
            Enter:
          </p>
          <a href="#" class="btn btn-primary">
            Import Invoice
          </a>
        </div>
      </div>
    </>
  );
}

export default Cards;
