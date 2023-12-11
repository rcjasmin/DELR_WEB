import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import ReportIcon from "@heroicons/react/24/solid/ChartBarSquareIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";

import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Tableau de Bord",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Configuration Mapping",
    path: "/settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Gestion Utilisateurs",
    path: "/utilisateurs",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Rapports",
    path: "/rapports",
    icon: (
      <SvgIcon fontSize="small">
        <ReportIcon />
      </SvgIcon>
    ),
  },
  /* {
    title: "Companies",
    path: "/companies",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Gestion Utilisateur",
    path: "/utilisateurs",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Login",
    path: "/auth/login",
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Register",
    path: "/auth/register",
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
  },*/
];
