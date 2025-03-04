import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch } from "react-redux";
import { toggleReadStatus } from "../store";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslationContext } from "../context/TranslationContext";
import PropTypes from "prop-types";

const BookCard = ({ book }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslationContext();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedBook(null);
    setDialogOpen(false);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          height: "200px",
          minWidth: "250px",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            noWrap
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            by {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.read ? "Read" : "Unread"}
          </Typography>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <Button
              data-testid="read__btn"
              variant="contained"
              color={book.read ? "primary" : "default"}
              onClick={() => {
                dispatch(toggleReadStatus(book.id));
              }}
              sx={{
                textTransform: "none",
                marginTop: 1,
              }}
            >
              {book.read ? "Mark as Unread" : "Mark as Read"}
            </Button>
            <IconButton
              data-testid="info__icon"
              color="primary"
              onClick={() => {
                setSelectedBook(book);
                handleDialogOpen();
              }}
              sx={{ float: "right" }}
            >
              <InfoIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => {
                navigate(`/books/${book?.id}`, {
                  state: {
                    id: book?.id,
                    author: book?.author,
                    price: book?.price,
                    read: book?.read,
                    title: book?.title,
                  },
                });
              }}
              sx={{ float: "right" }}
            >
              <Edit />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{t.bookInformation}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            <strong>{t.title}</strong> {selectedBook?.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>{t.author}</strong> {selectedBook?.author}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>{t.price}</strong> {selectedBook?.price}
          </Typography>
          <Typography variant="body1">
            <strong>{t.status}</strong> {selectedBook?.read ? "Read" : "Unread"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            data-testid="close__btn"
            onClick={handleDialogClose}
            color="primary"
            variant="contained"
          >
            {t.close}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.string,
    read: PropTypes.bool,
  }).isRequired,
};

export default BookCard;
