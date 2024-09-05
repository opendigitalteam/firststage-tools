import Image from "next/image";
import Link from "next/link";
import Glass from "./_components/Glass";
import H1 from "./_components/H1";
import aiAdoptionImage from "./ai-adoption-uk/opengraph-image.png";
import alternateJobTitlesImage from "./alternate-job-titles/opengraph-image.png";

export default function Home() {
  return (
    <div className="flex gap-3 md:gap-5 xl:gap-8 flex-col">
      <H1>Free Tools</H1>

      <ul className="flex gap-3 md:gap-5 xl:gap-8 flex-col">
        <li>
          <Link href="/ai-adoption-uk" className="group">
            <Glass>
              <div className="p-3 md:p-5 xl:p-8 2xl:p-12 flex gap-3 md:gap-5 xl:gap-8">
                <div className="w-80">
                  <Image src={aiAdoptionImage} alt="" className="rounded-lg" />
                </div>
                <div className="flex flex-col gap-2 md:gap-3 xl:gap-5">
                  <div className="font-medium underline group-hover:text-odpink-mid text-2xl">
                    AI adoption in UK companies: Benchmarking Tool
                  </div>
                  <div className="text-lg">
                    Benchmark your business to see how your business compares to
                    similar organisations across the UK.
                  </div>
                </div>
              </div>
            </Glass>
          </Link>
        </li>

        <li>
          <Link href="/alternate-job-titles" className="group">
            <Glass>
              <div className="p-3 md:p-5 xl:p-8 2xl:p-12 flex gap-3 md:gap-5 xl:gap-8">
                <div className="w-80">
                  <Image
                    src={alternateJobTitlesImage}
                    alt=""
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2 md:gap-3 xl:gap-5">
                  <div className="font-medium underline group-hover:text-odpink-mid text-2xl">
                    Alternate Job Titles
                  </div>
                  <div className="text-lg">
                    Research the best job title to attract the right volume and
                    quality of candidates.
                  </div>
                </div>
              </div>
            </Glass>
          </Link>
        </li>
      </ul>
    </div>
  );
}
