import React from "react";
import NavButton from "./NavButton";
import { Box } from "@mui/material";
import { useTranslationContext } from "../context/TranslationContext";

const NavButtons = () => {
  const { t } = useTranslationContext();
  return (
    <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: "4px" }}>
      <NavButton to="/" variant="contained" color="primary">
        {t.home}
      </NavButton>
      <NavButton to="/books?filter=all" variant="contained" color="secondary">
        All Books
      </NavButton>
      <NavButton to="/books?filter=read" variant="contained" color="success">
        Read Books
      </NavButton>
      <NavButton to="/books?filter=unread" variant="contained" color="warning">
        Unread Books
      </NavButton>
    </Box>
  );
};

export default NavButtons;
