import React, { Component } from "react";

class Home extends Component {
  state = {
    input: "",
    filter: "",
    ul: "",
    li: "",
    a: "",
    i: "",
    txtValue: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  myFuncion() {
    const { input, filter, ul, li, a, i, txtValue } = this.state;
    input = this.state.search;
    console.log(input);
    console.log(this.state.search);

    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
  render() {
    return (
      <div>
        <section className="content-1">
          <div className="container">
            <div className="row" />
            <h1>
              HOME MAINTENANCE.
              <br />
              WITHOUT THE HASSLE.
            </h1>
            <input
              className="input_home"
              type="text"
              name="search"
              id="myInput"
              onChange="{this.onChange} myFunction()"
              placeholder="What can we do for you?"
            />
            <ul id="myUL">
              <li>
                <a href="#">Adele</a>
              </li>
              <li>
                <a href="#">Agnes</a>
              </li>
              <li>
                <a href="#">Billy</a>
              </li>
              <li>
                <a href="#">Bob</a>
              </li>
              <li>
                <a href="#">Calvin</a>
              </li>
              <li>
                <a href="#">Christina</a>
              </li>
              <li>
                <a href="#">Cindy</a>
              </li>
            </ul>
          </div>
        </section>
        {/* Content 2 */}
        <section className="content-2">
          <div className="container">
            <div className="row">
              <div className="slider-text-animation">
                <h2>Services</h2>
              </div>
            </div>
          </div>
        </section>
        {/* Promos */}
        <div className="container-fluid">
          <div className="row promo">
            <a href="#">
              <div className="col-md-3 promo-item1 item-1">
                <h3>Plumbing</h3>
              </div>
            </a>
            <a href="#">
              <div className="col-md-3 promo-item2 item-2">
                <h3>Electrician</h3>
              </div>
            </a>
            <a href="#">
              <div className="col-md-3 promo-item3 item-3">
                <h3>Flooring</h3>
              </div>
            </a>
            <a href="#">
              <div className="col-md-3 promo-item4 item-4">
                <h3>Handyman Services</h3>
              </div>
            </a>
            <a href="#">
              <div className="col-md-3 promo-item5 item-5">
                <h3>Lawn Maintenance</h3>
              </div>
            </a>
            <a href="#">
              <div className="col-md-3 promo-item6 item-6">
                <h3>Painting</h3>
              </div>
            </a>
            <a href="#">
              <div className="col-md-3 promo-item7 item-7">
                <h3>Snow Removal</h3>
              </div>
            </a>
            <a href="#">
              <div className="col-md-3 promo-item8 item-8">
                <h3>Duct Cleaning</h3>
              </div>
            </a>
            <a href="#">
              <div className="col-md-3 promo-item9 item-9">
                <h3>Roofing</h3>
              </div>
            </a>
            <a href="#">
              <div className="col-md-3 promo-item10 item-10">
                <h3>Cleaning Services</h3>
              </div>
            </a>
            <a href="#">
              <div className="col-md-3 promo-item11 item-11">
                <h3>Surveying</h3>
              </div>
            </a>
            <a href="#">
              <div className="col-md-3 promo-item12 item-12">
                <h3>Window Cleaning</h3>
              </div>
            </a>
          </div>
        </div>
        {/* /.container-fluid */}
        {/* Content 3 */}
        <section className="content-3">
          <div className="container" />
        </section>
     
      </div>
    );
  }
}

export default Home;
