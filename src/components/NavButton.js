import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

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

NavButton.propTypes = {
  to: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["text", "outlined", "contained"]),
  color: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning",
  ]),
  children: PropTypes.node.isRequired,
  ...PropTypes.object,
};

export default NavButton;
