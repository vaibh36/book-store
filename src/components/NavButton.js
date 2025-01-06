import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const NavButton = ({ to, variant, color, children, ...rest }) => {
  return (
    <Button
      component={Link}
      to={to}
      variant={variant}
      color={color}
      role="button"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default NavButton;
