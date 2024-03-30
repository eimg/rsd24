import Movies from "@/components/Movies";

const token = process.env.TOKEN;

async function fetchTrending() {
	const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return await res.json();
}

export default async function Home() {
	const trending = await fetchTrending();

	return (
		<>
			<h3 className="text-lg mb-3">Trending</h3>
            <Movies movies={trending.results} />
		</>
	);
}
