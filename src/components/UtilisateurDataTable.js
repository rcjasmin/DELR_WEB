/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from "react";
import AddCircleRounded from "@mui/icons-material/AddCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from "@mui/icons-material/LockReset";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import UtilisateurModalForm from "src/components/UtilisateurModalForm";

import EditIcon from "@mui/icons-material/Edit";
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
  IconButton,
} from "@mui/material";
import conf from "../configurations/app.conf";
import axios from "axios";
import { Stack } from "@mui/system";

const SiteDataTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCloseModal, setOpenCloseModbal] = useState(false);
  const [mode, setMode] = useState("ADD");
  const [currentuser, setCurrentuser] = useState(null);
  const [reload, setReload] = useState(false);

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

  const filteredUsersData = usersData.filter(
    (item) =>
      item?.Prenom?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Nom?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredData = filteredUsersData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getData = async () => {
    try {
      const url = conf.SERVERS.API_SERVER + conf.RESOURCES.UTILISATEURS;
      await axios.get(url).then((response) => {
        setUsersData(response.data);
      });
    } catch (error) {
      setUsersData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [reload]);

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddCircleRounded style={{ fontSize: "23px" }} />}
          style={{ float: "right", borderRadius: "6px" }}
          onClick={() => {
            setOpenCloseModbal(true);
            setMode("ADD");
            setCurrentuser(null);
          }}
        >
          NOUVEAU UTILISATEUR
        </Button>
      </Box>

      <TableContainer sx={{ marginTop: "8px" }} style={{ border: "solid 1px #A7BCD1" }}>
        <Table size="small">
          <TableHead
            sx={{ backgroundColor: "#F4F6FA", borderBottom: "solid 2px #A7BCD1", height: 80 }}
          >
            <TableRow>
              <TableCell colSpan={6} style={{ backgroundColor: "#F4F6FA", paddingBottom: 0 }}>
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
              <TableCell style={{ fontWeight: "bold", width: "25%" }}>NOM ET PRENOM</TableCell>
              <TableCell style={{ fontWeight: "bold", width: "15%" }}>ROLE</TableCell>
              <TableCell style={{ fontWeight: "bold", width: "20%" }}>DEPARTEMENT</TableCell>
              <TableCell style={{ fontWeight: "bold", width: "15%" }}>NOM UTILISATEUR</TableCell>
              <TableCell style={{ fontWeight: "bold", width: "7%" }}>STATUT</TableCell>
              <TableCell style={{ width: "20%", fontWeight: "bold" }}>
                <Stack padding={2} flexDirection={"row"} justifyContent={"center"}>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    ACTIONS
                  </span>
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((data, index) => {
              return (
                <TableRow
                  key={`user-${data.UtilisateurId}`}
                  sx={{ backgroundColor: index % 2 === 1 ? "#FAFBFD" : "#fff" }}
                >
                  <TableCell>{`${data.Prenom} ${data.Nom}`}</TableCell>
                  <TableCell>{data.Role}</TableCell>
                  <TableCell>{data.NomDepartement}</TableCell>
                  <TableCell>{data.NomUtilisateur}</TableCell>
                  <TableCell>{data.Statut}</TableCell>

                  <TableCell style={{ padding: "0.5px" }}>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ flex: 1, marginRight: "8px" }}>
                        <IconButton
                          aria-label="Edit"
                          onClick={() => {
                            setCurrentuser(data);
                            setOpenCloseModbal(true);
                            setMode("EDIT");

                            //alert(JSON.stringify(data));
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </span>
                      <span style={{ flex: 1, marginRight: "8px" }}>
                        <IconButton aria-label="Reset">
                          <LockResetIcon />
                        </IconButton>
                      </span>
                      {data.Statut === "ACTIF" ? (
                        <span style={{ flex: 1 }}>
                          <IconButton aria-label="Lock User">
                            <LockPersonIcon />
                          </IconButton>
                        </span>
                      ) : (
                        <span style={{ flex: 1 }}>
                          <IconButton aria-label="Unlock User">
                            <LockOpenIcon />
                          </IconButton>
                        </span>
                      )}
                      <span style={{ flex: 1 }}>
                        <IconButton aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </span>
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter sx={{ backgroundColor: "#F4F6FA" }}>
            <TableRow>
              <TableCell style={{ padding: 0 }} align="right" colSpan={8}>
                <TablePagination
                  style={{ borderTop: "0px solid #A7BCD1", float: "right" }}
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredUsersData.length}
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

      <UtilisateurModalForm
        openClose={openCloseModal}
        onCloseModal={(value) => setOpenCloseModbal(value)}
        mode={mode}
        currentuser={currentuser}
        onFormSubmit={() => {
          setReload(!reload);
        }}
      />
    </>
  );
};

export default SiteDataTable;
