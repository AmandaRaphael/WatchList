import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { useState } from "react";

export type Movie = {
  id: number;
  backdrop_path: string | null;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  original_language: string;
};

const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }: { theme?: any; expand: boolean }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MovieCard({ movie }: { movie: Movie }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  const img = movie.backdrop_path
    ? `${IMAGE_BASE}${movie.backdrop_path}`
    : "/movie-placeholder-new.svg";

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        boxShadow: 4,
        backgroundColor: "#121212",
        color: "white",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={img}
        alt={movie.original_title}
      />
      <CardContent
        sx={{
          minHeight: 140,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.4,
          }}
        >
          {movie.original_title}
        </Typography>
        <Typography variant="body2" color="gray">
          {movie.original_language.toUpperCase()} &nbsp;|&nbsp;{" "}
          {movie.release_date} <br />⭐ {movie.vote_average} ({movie.vote_count}{" "}
          votes)
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ color: "white" }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{movie.overview}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
