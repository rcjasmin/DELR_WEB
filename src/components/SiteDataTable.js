/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from "react";

import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import OrganisationUnitsDropDown from "../components/OrganisationUnitDropDown";
import conf from "../configurations/app.conf";
import axios from "axios";

const SiteDataTable = () => {
  const [mappingData, setMappingData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, value) => {
    setRowsPerPage(value);
    setPage(0);
  };
  const handleOnTextChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onChangeOrgUnit = (value) => {
    console.log(JSON.stringify(value));
  };

  const filteredData = mappingData
    .filter(
      (item) =>
        item.MESI_NOM.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.DHIS2_NOM.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    try {
      const url = conf.SERVERS.API_SERVER + conf.RESOURCES.MAPPING_SITE_ORG_UNITS;
      axios.get(url).then((response) => {
        setMappingData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [mappingData]);

  const Input = (index, value) => {
    return (
      <div>
        <input
          id={`mesi-${index}`}
          readOnly
          type="text"
          value={value}
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
        />
      </div>
    );
  };

  return (
    <>
      <TableContainer sx={{ marginTop: "15px" }} style={{ border: "solid 1px #A7BCD1" }}>
        <Table size="small">
          <TableHead
            sx={{ backgroundColor: "#F4F6FA", borderBottom: "solid 2px #A7BCD1", height: 80 }}
          >
            <TableRow>
              <TableCell colSpan={2} style={{ backgroundColor: "#F4F6FA", paddingBottom: 0 }}>
                <Box padding={2} marginLeft={-2}>
                  <input
                    id="surveySearch"
                    name="surveySearch"
                    type="text"
                    placeholder="Rechercher"
                    style={{
                      paddingLeft: "10px",
                      paddingRight: "30px",
                      width: "100%",
                      height: "40px",
                      border: "solid 1px #A7BCD1",
                      borderRadius: "5px",
                      color: "#000",
                      fontSize: "16px",
                    }}
                    onChange={handleOnTextChange}
                  />
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", width: "50%" }}>SITE MESI</TableCell>
              <TableCell style={{ fontWeight: "bold", width: "50%" }}>
                ORGANISATION UNIT DHIS2
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((data, index) => {
              return (
                <TableRow key={`mapping-${index}`}>
                  <TableCell>
                    <div>
                      <input
                        id={`mesi-${index}`}
                        readOnly
                        type="text"
                        value={data.MESI_NOM}
                        style={{
                          paddingLeft: "10px",
                          paddingRight: "30px",
                          width: "100%",
                          height: "40px",
                          border: "solid 1px #A9A9A9",
                          borderRadius: "5px",

                          color: "#000",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <OrganisationUnitsDropDown
                      optionSelected={null}
                      onChangeOrgUnit={onChangeOrgUnit}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ borderTop: "2px solid #A7BCD1" }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={mappingData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => {
          handleChangePage(event, newPage);
        }}
        onRowsPerPageChange={(event) => {
          handleChangeRowsPerPage(event, +event.target.value);
        }}
      />
    </>
  );
};

export default SiteDataTable;
