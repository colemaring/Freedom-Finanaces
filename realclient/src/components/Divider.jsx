import React from "react";
import Cards from "./Cards";
import Cards2 from "./Cards2";

function Divider() {
  return (
    <>
    <div class="container">
  <div class="row">
    <div class="col">
        <
    </div>
    <div class="col">
      2 of 2
    </div>
  </div>
      <div class="container">
        <div class="row">
          {/* <div class="col">1 of 2</div>
          <div class="col">2 of 2</div> */}
        </div>
        <div class="row">
          <div class="col">
            <Cards />
          </div>
          <div class="col">
            <Cards2 />
          </div>
          {/* <div class="col">3 of 3</div> */}
        </div>
      </div>
    </>
  );
}

export default Divider;
