/* eslint-disable react/jsx-max-props-per-line */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import conf from "../configurations/app.conf";

const DepartementDropDown = ({ register,selectedDepartement }) => {
  const [departements, setDepartements] = useState([]);
  const isExecuted = useRef(true);
  useEffect(() => {
    if (isExecuted.current) {
      isExecuted.current = false;
      try {
        const url = conf.SERVERS.API_SERVER + conf.RESOURCES.DEPARTEMENTS;
        axios.get(url).then((response) => {
          setDepartements(response.data);
        });
       
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <select
      id="departement"
      {...register("departement", {
        required: { value: true, message: "Le departement est obligatoire" },
      })}
      style={{
        paddingLeft: "10px",
        paddingRight: "30px",
        width: "100%",
        height: "40px",
        border: "solid 2px #A9A9A9",
        borderRadius: "5px",
        fontWeight: "bolder",
        color: "#000",
        fontSize: "13px",
      }}
    >
      <option value="">Selectionner Departement</option>
      {departements.map((departement) => {
        let selected =  false;
        if((departement.Id ==selectedDepartement)){
          selected =  true;
        }
        return (
          <option key={departement.Id} value={departement.Id} selected={selected}>
            {departement.NomDepartement}
          </option>
        );
      })}
    </select>
  );
};

export default DepartementDropDown;
