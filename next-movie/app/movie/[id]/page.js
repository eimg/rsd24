import Link from "next/link";

export default function Movie({ params }) {
	return (
		<div>
			Movie Page: 
            <b className="text-green-500">
                {params.id}
            </b> <br />
            
			<Link href="/">Home</Link>
		</div>
	);
}
