/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
  TableFooter,
  Box,
} from "@mui/material";
import OrganisationUnitsDropDown from "../components/OrganisationUnitDropDown";
import conf from "../configurations/app.conf";
import axios from "axios";
import MessageBox from "./MessageBox";
import SuccessBox from "./SuccessBox";
import ConfirmDialog from "./ConfirmDialog";

const SiteDataTable = () => {
  const [mappingData, setMappingData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, value) => {
    setRowsPerPage(value);
    setPage(0);
  };
  const handleOnTextChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const onChangeOrgUnit = (MappingElementId, obj) => {
    setMappingData((prev) => {
      const newData = prev.map((item) => {
        // Check if the current item's ID matches the MappingElementId
        if (item.MESI_ID === MappingElementId) {
          // If it matches, return a new object with updated values
          return {
            ...item,
            DHIS2_ID: obj.value,
            DHIS2_NOM: obj.label, // Assuming 'obj.label' contains the new name
          };
        }
        // If it doesn't match, return the item as is
        return item;
      });
      //console.log(JSON.stringify(newData));
      return newData;
    });
  };

  const handleOnConfirm = () => {
    setConfirmationMessage(null);

    const data = mappingData.filter((element) => element.DHIS2_ID != 0);
    let isValid = true;

    outerloop: for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (data[i].DHIS2_ID === data[j].DHIS2_ID) {
          setError(
            'Variable:  "' + data[i].DHIS2_NOM + '" est mappée plusieurs fois. Veuillez corriger.'
          );
          isValid = false;

          break outerloop;
        }
      }
    }

    if (isValid) {
      const requestData = { mappingData: data, userId: 1 };
      save(requestData);
    }
  };

  const filteredmappingData = mappingData.filter(
    (item) =>
      item?.MESI_NOM?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.DHIS2_NOM?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredData = filteredmappingData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getData = async () => {
    try {
      const url = conf.SERVERS.API_SERVER + conf.RESOURCES.MAPPING_SITE_ORG_UNITS;
      await axios.get(url).then((response) => {
        setMappingData(response.data);
      });
    } catch (error) {
      setMappingData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const save = async (data) => {
    try {
      const url = conf.SERVERS.API_SERVER + conf.RESOURCES.MAPPING_SITE_ORG_UNITS;
      await axios.post(url, data).then((response) => {
        if (response.status === 200) {
          setSuccessMessage("Enregistrement éffectué avec success");
          function delay(vtime) {
            return new Promise((resolve) => setTimeout(resolve, vtime));
          }

          delay(1000).then(() => {
            setSuccessMessage(null);
          });
        }
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Box>
        {successMessage != null && (
          <SuccessBox
            message={successMessage}
            onClose={() => {
              setSuccessMessage(null);
            }}
          />
        )}

        {confirmationMessage != null && (
          <ConfirmDialog
            message={confirmationMessage}
            OnCancel={() => {
              setConfirmationMessage(null);
            }}
            OnConfirm={handleOnConfirm}
          />
        )}

        {error != null && <MessageBox severity="error" message={error} />}

        <Button
          variant="contained"
          startIcon={<SaveIcon style={{ fontSize: "large" }} />}
          style={{ float: "right", borderRadius: "6px" }}
          onClick={() => {
            setError(null);
            setConfirmationMessage("Voulez vous vraiment sauvegarder?");
          }}
        >
          ENREGISTRER
        </Button>
      </Box>

      <TableContainer sx={{ marginTop: "8px" }} style={{ border: "solid 1px #A7BCD1" }}>
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
            {filteredData.map((data) => {
              return (
                <TableRow key={`mapping-${data.MESI_ID}`}>
                  <TableCell>
                    <Box>
                      <input
                        readOnly
                        disabled
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
                    </Box>
                  </TableCell>
                  <TableCell>
                    <OrganisationUnitsDropDown
                      optionSelected={{ label: data.DHIS2_NOM, value: data.DHIS2_ID }}
                      onChangeOrgUnit={onChangeOrgUnit}
                      MappingElementId={data.MESI_ID}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter sx={{ backgroundColor: "#F4F6FA" }}>
            <TableRow>
              <TableCell style={{ padding: 0 }} align="right" colSpan={2}>
                <TablePagination
                  style={{ borderTop: "0px solid #A7BCD1", float: "right" }}
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredmappingData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(event, newPage) => {
                    handleChangePage(event, newPage);
                  }}
                  onRowsPerPageChange={(event) => {
                    handleChangeRowsPerPage(event, +event.target.value);
                  }}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <br />
    </>
  );
};

export default SiteDataTable;
