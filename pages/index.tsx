import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import MovieCard, { Movie } from "../components/MovieCard";
export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies/popular");
      const data = await res.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        🎬 Popular Movies
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
          justifyItems: "center",
        }}
      >
        {movies.length > 0 &&
          movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </Box>
    </Container>
  );
}
