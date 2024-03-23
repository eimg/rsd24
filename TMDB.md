# TMDB API End Points

## Genres List
https://api.themoviedb.org/3/genre/movie/list

## Movies By Genere
https://api.themoviedb.org/3/discover/movie?with_genres=${id}

## Popular Movies
https://api.themoviedb.org/3/movie/popular

## Top Rated Movies
https://api.themoviedb.org/3/movie/top_rated

## Trending Movies
https://api.themoviedb.org/3/trending/movie/day

## Single Movie
https://api.themoviedb.org/3/movie/${id}

## Movie Credit & Info
https://api.themoviedb.org/3/movie/${id}/credits

## Search Movies
https://api.themoviedb.org/3/search/movie?query=${query}

## Person Info
https://api.themoviedb.org/3/person/${id}

## Image URLs
POSTER_IMG=http://image.tmdb.org/t/p/w342${poster_path}
COVER_IMG=http://image.tmdb.org/t/p/w1280${backdrop_path}
PROFILE_IMG=http://image.tmdb.org/t/p/w185${profile_path}
