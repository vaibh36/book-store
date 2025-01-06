import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { Card, CardContent, Grid, Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleReadStatus } from "../store";

const AllBooks = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams?.get("filter");
  const books = useSelector((state) => state?.books);
  const dispatch = useDispatch();

  const filteredBooks = (books?.books || [])?.filter((book) => {
    if (filter === "read") return book?.read;
    if (filter === "unread") return !book?.read;
    return true;
  });

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
        }}
      >
        {filter === "read"
          ? "Read Books"
          : filter === "unread"
          ? "Unread Books"
          : "All Books"}
      </Typography>
      <List>
        <Grid container spacing={3}>
          {filteredBooks?.map((book) => (
            <Grid item key={book.id} xs={12} sm={6} md={4}>
              <Card variant="outlined">
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
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {book.read ? "Read" : "Unread"}
                  </Typography>
                  <Button
                    variant="contained"
                    color={book.read ? "primary" : "default"}
                    onClick={() => {
                      dispatch(toggleReadStatus(book.id));
                    }}
                    sx={{
                      textTransform: "none", // Keep button text in normal case
                      marginTop: 1,
                    }}
                  >
                    {book.read ? "Mark as Unread" : "Mark as Read"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {filteredBooks?.length === 0 && (
          <Typography
            sx={{
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            No books found
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default AllBooks;
