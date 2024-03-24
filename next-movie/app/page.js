import Link from "next/link"
import { Button } from "@/components/ui/button";

async function fetchGenres() {
    const token = process.env.TOKEN;
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return await res.json();
}

export default async function Home() {
    const data = await fetchGenres();

    return <div className="flex">
        <div className="w-[250px] pr-4 border-r">
            <Button variant="ghost" className="w-full justify-start">All Movies</Button>
            {data.genres.map(genre => {
                return <Button
                    key={genre.id}
					variant="ghost"
					className="w-full justify-start">
					{genre.name}
				</Button>;
            })}
        </div>
    </div>
}
