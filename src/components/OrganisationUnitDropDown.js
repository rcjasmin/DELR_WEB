/* eslint-disable react/jsx-max-props-per-line */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import conf from "../configurations/app.conf";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";

const OrganisationUnitsDropDown = ({ optionSelected, onChangeOrgUnit, MappingElementId }) => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(optionSelected);
  const isExecuted = useRef(true);

  useEffect(() => {
    if (isExecuted.current) {
      isExecuted.current = false;
      try {
        const url = conf.SERVERS.API_SERVER + conf.RESOURCES.ORGANISATION_UNITS;
        axios.get(url).then((response) => {
          const options = response.data.map((unit) => {
            const val = {
              value: unit.Id,
              label: unit.Nom,
            };
            return val;
          });
          setData(options);
          //setData(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <Select
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
      defaultValue={selectedOption}
      onChange={(value) => {
        setSelectedOption(value);
        onChangeOrgUnit(MappingElementId, value);
        //alert(JSON.stringify(value));
      }}
      options={data}
      isSearchable={true}
      placeholder="Selectionner Organisation Unit"
    />
  );
};

export default OrganisationUnitsDropDown;
