import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, List } from "@mui/material";
import { Grid } from "@mui/material";
import BookCard from "../components/BookCard";

const AllBooks = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams?.get("filter");
  const books = useSelector((state) => state?.books);

  const filteredBooks = (books?.books || [])?.filter((book) => {
    if (filter === "read") return book?.read;
    if (filter === "unread") return !book?.read;
    return true;
  });

  return (
    <Box
      sx={{
        maxWidth: 900,
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
        <Grid container spacing={4}>
          {filteredBooks?.map((book) => (
            <Grid
              item
              key={book.id}
              xs={12}
              sm={6}
              md={4}
              paddingLeft={"16px !important"}
              id="gridder"
            >
              <BookCard book={book} />
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
