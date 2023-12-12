/* eslint-disable react/jsx-max-props-per-line */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import conf from "../configurations/app.conf";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";

const TestDDL = ({ optionSelected, onChangeOrgUnit }) => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(optionSelected);
  const isExecuted = useRef(true);

  useEffect(() => {
    // if (isExecuted.current) {
    // isExecuted.current = false;
    try {
      const url = conf.SERVERS.API_SERVER + conf.RESOURCES.ORGANISATION_UNITS;
      axios.get(url).then((response) => {
        setData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  return (
    <select
      id={uuidv4()}
      style={{
        paddingLeft: "10px",
        paddingRight: "30px",
        width: "100%",
        height: "40px",
        border: "solid 1px #A9A9A9",
        borderRadius: "5px",
        fontWeight: "bolder",
        color: "#000",
        fontSize: "13px",
      }}
      value={selectedOption}
      onChange={(event) => {
        setSelectedOption(event.target.value);
        onChangeOrgUnit(event.target.value);
        //alert(JSON.stringify(value));
      }}
    >
      <option value={0}></option>
      {data.map((element, index) => {
        return (
          <option key={`unit-index-${index}`} value={element.Id}>
            {element.Nom}
          </option>
        );
      })}
    </select>
  );
};

export default TestDDL;
