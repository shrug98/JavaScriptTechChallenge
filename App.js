import React, { useState, useCallback } from "react";
import "./styles.css";

export default function App() {
  const [fields, setFields] = React.useState([{ value: null }]);
  const [order, setOrder] = useState("");
  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }
  const handleOptionChange = useCallback((event) => {
    setOrder(event.target.value);
    //setOrder(event.target.value);
  }, []);

  const handleAverage = useCallback((event) => {
    //event.preventDefault(); // prevents form submit action
    const values = [...fields];
    var i;
    if (event.target.value === "withoutdouble") {
      var duplicates = [];
      for (i = 0; i < values.length; i++) {
        if (duplicates.includes(values[i].value)) {
          values.splice(i, 1);
        } else {
          duplicates.push(values[i].value);
        }
      }
    }
    var sum = 0;
    var mean;
    var median;
    var max = 0;
    var j;
    if (order === "option1") {
      for (i = 0; i < values.length; i++) {
        sum = sum + parseInt(values[i].value);
      }
      mean = sum / values.length;
      document.getElementById("Result").innerHTML = mean;
    } else if (order === "option2") {
      var sortedValues = [];
      for (i = 0; i < values.length; i++) {
        sortedValues.push(values[i].value);
      }
      sortedValues.sort(function (a, b) {
        return a - b;
      });
      if (sortedValues.length % 2 === 1) {
        median = sortedValues[(sortedValues.length + 1) / 2 - 1];
      } else {
        median =
          (parseInt(sortedValues[sortedValues.length / 2 - 1]) +
            parseInt(sortedValues[sortedValues.length / 2])) /
          2;
      }
      document.getElementById("Result").innerHTML = median;
    } else if (order === "option3") {
      var modes = [];
      for (i = 0; i < values.length; i++) {
        var count = 0;
        for (j = 0; j < values.length; j++) {
          if (values[i].value === values[j].value) {
            count++;
          }
        }
        if (count > max) {
          modes = [];
          max = count;
          modes.push(values[i].value);
        } else if (count === max) {
          if (modes.includes(values[i].value)) {
            continue;
          }
          modes.push(values[i].value);
        }
      }
      document.getElementById("Result").innerHTML = modes.join("<br />");
    }
  });
  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }
  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  const handleSD = useCallback((event) => {
    event.preventDefault();
    const values = [...fields];
    var i;
    var sum = 0;
    var mean;
    var sd = 0;
    for (i = 0; i < values.length; i++) {
      sum = sum + parseInt(values[i].value);
    }
    mean = sum / values.length;
    for (i = 0; i < values.length; i++) {
      sd = sd + Math.pow(parseInt(values[i].value - mean), 2);
    }
    document.getElementById("Result").innerHTML = Math.sqrt(sd / values.length);
  });
  return (
    <div className="App">
      <h1>Shruti Gupta Tech Challenge </h1>
      <br></br>
      <p>
        Enter unlimited Integers. Click the "Add Integer" button to add an
        integer or 'X' button next to the Integer you want to remove.
      </p>
      <h3>Enter Integers: </h3>

      <br></br>
      {fields.map((field, index) => {
        return (
          <div key={`${field}-${index}`}>
            <input
              type="number"
              placeholder="Enter Integer"
              value={field.value || ""}
              onChange={(event) => handleChange(index, event)}
            />
            <button type="button" onClick={() => handleRemove(index)}>
              X
            </button>
          </div>
        );
      })}
      <br></br>
      <button type="button" onClick={() => handleAdd()}>
        Add Integer
      </button>
      <br></br>
      <br></br>
      <h3>Choose Option: </h3>
      <p>
        Choose which average you would like to find. To include duplicate values
        click on "Find Average". To eliminate duplicate values click on "Find
        Average without Duplicates".{" "}
      </p>
      <label>
        <input
          type="radio"
          name="react-tips"
          value="option1"
          onChange={handleOptionChange}
        />
        Mean
      </label>
      <br></br>
      <label>
        <input
          type="radio"
          name="react-tips"
          value="option2"
          onChange={handleOptionChange}
        />
        Median
      </label>
      <br></br>
      <label>
        <input
          type="radio"
          name="react-tips"
          value="option3"
          onChange={handleOptionChange}
        />
        Mode
      </label>
      <br></br>
      <br></br>
      <button
        id="withdouble"
        type="submit"
        name="operation1"
        value="double"
        onClick={handleAverage}
      >
        Find Average
      </button>
      <br></br>
      <button
        id="withoutdouble"
        type="submit"
        name="operation"
        value="withoutdouble"
        onClick={handleAverage}
      >
        Find Average without Duplicates
      </button>
      <br></br>
      <h2>Result:</h2>
      <p id="Result"></p>
      <br></br>
      <p> Calculate Standard Deviation:</p>
      <button
        type="submit"
        value="standardDeviation"
        //disabled={disableOperations}
        onClick={handleSD}
      >
        Calculate Standard Deviation
      </button>
    </div>
  );
}
