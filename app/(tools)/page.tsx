import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Tools</h1>

      <ul>
        <li>
          <Link
            href="/ai-adoption-uk"
            className="font-medium underline hover:text-odpink-mid"
          >
            AI Adoption in UK: Benchmarking Tool
          </Link>
        </li>
      </ul>
    </div>
  );
}
