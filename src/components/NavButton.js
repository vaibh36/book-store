import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const NavButton = ({ to, variant, color, children }) => {
  return (
    <Button component={Link} to={to} variant={variant} color={color}>
      {children}
    </Button>
  );
};

export default NavButton;
