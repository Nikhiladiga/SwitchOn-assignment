import React, { Component } from "react";

class Number extends Component {

  render() {
    const { numbers } = this.props;
    const numbersList = numbers.length ? (
      numbers.map(number => {
				// in seconds
				let [time, unit] = [
					(Date.now() - new Date(number.timestamp).getTime())/(1000),
					"seconds"
				];
				if(time >= 60) {
					time /= 60;
					unit = "minutes";
				}
				else if(time >= 60) {
					time /= 60;
					unit = "hours";
				}
				else if(time >= 24) {
					time /= 24;
					unit = "days";
				}
				time = Math.floor(time);
        return (
          <div className="col s6" key={number._id}>
              <div className="card">
                <div className="card-content  grey-text text-darken-3">
                  <span className="card-title">{number.number}</span>
                  <p className="grey-text">{time} {unit} ago</p>
                </div>
              </div>
              </div>
        );
      })
    ) : (
      <div className="card card-content grey-text text-darken-3">
        <div className="center">No Numbers Inserted</div>
      </div>
    );
    return <div className="container">
            <div className="row">
            {numbersList}
          </div>
          </div>
  }
}

export default Number;
