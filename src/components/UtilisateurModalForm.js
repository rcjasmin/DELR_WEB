/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from "react";
import { Box, Stack, Button, Typography, Modal, IconButton } from "@mui/material";
import conf from "../configurations/app.conf";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import CancelRounded from "@mui/icons-material/CancelRounded";
import DepartementDropDown from "./DepartementDropDownList";
import { useForm } from "react-hook-form";
import SuccessBox from "./SuccessBox";
import ConfirmDialog from "./ConfirmDialog";
import MessageBox from "./MessageBox";

const UtilisateurModalForm = ({ openClose, onCloseModal, mode, currentuser, onFormSubmit }) => {
  const [open, setOpen] = useState(false);

  const header = mode === "ADD" ? "Nouveau Utilisateur" : "Mise à jour Utilisateur";
  const [successMessage, setSuccessMessage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setOpen(openClose);
  }, [openClose]);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Make the width relative
    maxWidth: 800, // Set a maximum width
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    overflow: "auto", // Ensure the content is scrollable if it exceeds the viewport
  };

  const [formData, setFormData] = useState(null);
  const form = useForm();
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;

  useEffect(() => {
    reset();
    if (mode === "EDIT") {
      setValue("nom", currentuser.Nom, {
        shouldValidate: true,
        shouldDirty: true,
        shouldDirty: true,
      });

      setValue("prenom", currentuser.Prenom, {
        shouldValidate: true,
        shouldDirty: true,
        shouldDirty: true,
      });

      setValue("username", currentuser.NomUtilisateur, {
        shouldValidate: true,
        shouldDirty: true,
        shouldDirty: true,
      });

      setValue("role", currentuser.Role, {
        shouldValidate: true,
        shouldDirty: true,
        shouldDirty: true,
      });

      setValue("statut", currentuser.Statut, {
        shouldValidate: true,
        shouldDirty: true,
        shouldDirty: true,
      });

      setValue("departement", currentuser.DepartementId, {
        shouldValidate: true,
        shouldDirty: true,
        shouldDirty: true,
      });
      // alert(JSON.stringify(currentuser));
    }
  }, [currentuser, mode, reset, setValue]);

  const onSubmitForm = (data) => {
    if (currentuser == null) {
      data.id = 0;
    } else {
      data.id = currentuser.UtilisateurId;
    }

    setError(null);
    setFormData(data);
    setConfirmationMessage("Voulez vous vraiment enregistrer?");
  };

  const addUser = async (data) => {
    try {
      const url = conf.SERVERS.API_SERVER + conf.RESOURCES.UTILISATEURS;
      await axios.post(url, data).then((response) => {
        if (response.status === 200) {
          const results = response.data;

          if (results.CODE_MESSAGE === "SUCCESS") {
            setSuccessMessage(results.MESSAGE);
            function delay(vtime) {
              return new Promise((resolve) => setTimeout(resolve, vtime));
            }

            delay(1500).then(() => {
              setSuccessMessage(null);
              reset();
              onCloseModal(false);
              onFormSubmit();
            });
          } else {
            setError(results.MESSAGE);
          }
        }
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const updateUser = async (data) => {
    try {
      const url = conf.SERVERS.API_SERVER + conf.RESOURCES.UTILISATEURS;
      await axios.put(url, data).then((response) => {
        if (response.status === 200) {
          const results = response.data;

          if (results.CODE_MESSAGE === "SUCCESS") {
            setSuccessMessage(results.MESSAGE);
            function delay(vtime) {
              return new Promise((resolve) => setTimeout(resolve, vtime));
            }

            delay(1500).then(() => {
              setSuccessMessage(null);
              reset();
              onCloseModal(false);
              onFormSubmit();
            });
          } else {
            setError(results.MESSAGE);
          }
        }
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOnConfirm = () => {
    setConfirmationMessage(null);
    const userData = { data: formData, userId: 1 };

    switch (mode) {
      case "ADD":
        addUser(userData);
        break;

      case "EDIT":
        updateUser(userData);
        break;
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onCloseModal(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
        <Box sx={modalStyle}>
          {error != null && <MessageBox severity="error" message={error} />}
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
          <IconButton
            aria-label="close"
            sx={{
              position: "absolute",
              right: 1,
              top: 1,
            }}
            onClick={() => {
              onCloseModal(false);
            }}
          >
            <CancelRounded />
          </IconButton>

          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Typography
              variant="h5"
              style={{
                textAlign: "center",
                padding: "10px",
                marginBottom: "5px",
                marginTop: "-20px",
              }}
            >
              {header}
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <Box sx={{ width: "50%" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    Nom
                  </Typography>
                  <input
                    id="nom"
                    {...register("nom", {
                      required: { value: true, message: "Le nom est obligatoire." },
                    })}
                    style={{
                      paddingLeft: "10px",
                      width: "100%",
                      height: "40px",
                      border: "solid 2px #A9A9A9",
                      borderRadius: "5px",
                      fontWeight: "normal",
                      color: "#000",
                      fontSize: "14px",
                    }}
                  />
                  {errors.nom && (
                    <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="error">
                      {errors.nom.message}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ width: "50%" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    Prénom
                  </Typography>
                  <input
                    id="prenom"
                    {...register("prenom", {
                      required: { value: true, message: "Le prenom est obligatoire" },
                    })}
                    style={{
                      paddingLeft: "10px",
                      width: "100%",
                      height: "40px",
                      border: "solid 2px #A9A9A9",
                      borderRadius: "5px",
                      fontWeight: "normal",
                      color: "#000",
                      fontSize: "14px",
                    }}
                  />
                  {errors.prenom && (
                    <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="error">
                      {errors.prenom.message}
                    </Typography>
                  )}
                </Box>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Box sx={{ width: "50%" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    Nom Utilisateur
                  </Typography>
                  <input
                    id="username"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Le nom utilisateur est obligatoire",
                      },
                    })}
                    style={{
                      paddingLeft: "10px",
                      width: "100%",
                      height: "40px",
                      border: "solid 2px #A9A9A9",
                      borderRadius: "5px",
                      fontWeight: "normal",
                      color: "#000",
                      fontSize: "14px",
                    }}
                  />

                  {errors.username && (
                    <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="error">
                      {errors.username.message}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ width: "50%" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    Role
                  </Typography>
                  <select
                    id="role"
                    {...register("role", {
                      required: { value: true, message: "Le role est obligatoire." },
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
                    <option value="">Selectionner un Role</option>
                    <option value="ADMINISTRATOR">ADMINISTRATOR</option>
                    <option value="USER">USER</option>
                  </select>

                  {errors.role && (
                    <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="error">
                      {errors.role.message}
                    </Typography>
                  )}
                </Box>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Box sx={{ width: "50%" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    Departement
                  </Typography>
                  <DepartementDropDown
                    register={register}
                    name="departement"
                    //selectedDepartement={currentuser?.DepartementId}
                  />
                  {errors.departement && (
                    <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="error">
                      {errors.departement.message}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ width: "50%" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    Statut
                  </Typography>
                  <select
                    id="statut"
                    {...register("statut", {
                      required: { value: true, message: "Le statut est obligatoire." },
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
                    <option value="ACTIF">ACTIF</option>
                    <option value="INACTIF">INACTIF</option>
                  </select>
                  {errors.statut && (
                    <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="error">
                      {errors.statut.message}
                    </Typography>
                  )}
                </Box>
              </Stack>

              <Box sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{ mt: 0.5, borderRadius: "6px" }}
                  type="submit"
                >
                  ENREGISTRER
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default UtilisateurModalForm;
