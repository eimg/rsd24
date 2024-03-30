import Movies from "@/components/Movies";

const token = process.env.TOKEN;

async function fetchMovies(id) {
	const res = await fetch(
		`https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return await res.json();
}

export default async function Home({ params }) {
	const byGenres = await fetchMovies(params.id);

	return (
		<>
			<h3 className="text-lg mb-3">{params.name}</h3>
			<Movies movies={byGenres.results} />
		</>
	);
}
