import Link from "next/link";

export default function Movies({ movies }) {
    const poster = "http://image.tmdb.org/t/p/w342";
    
    return (
		<>
			<div className="flex flex-wrap flex-row gap-4">
				{movies.map(movie => {
					return (
						<div className="w-[200px] text-center">
							<Link href={`/movie/${movie.id}`}>
								<img
									src={`${poster}${movie.poster_path}`}
									className="w-full hover:scale-105 transition-all"
								/>
							</Link>
							<h4>{movie.title}</h4>
							<span className="text-sm text-gray-500">
								{movie.release_date.split("-")[0]}
							</span>
						</div>
					);
				})}
			</div>
		</>
	);
}