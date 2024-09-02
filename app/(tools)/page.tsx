import Link from "next/link";
import H1 from "./_components/H1";

export default function Home() {
  return (
    <div>
      <H1>Free Tools</H1>

      <ul>
        <li>
          <Link
            href="/ai-adoption-uk"
            className="font-medium underline hover:text-odpink-mid"
          >
            AI adoption in UK companies: Benchmarking Tool
          </Link>
        </li>
      </ul>
    </div>
  );
}
