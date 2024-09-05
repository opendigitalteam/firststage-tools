import Link from "next/link";
import Glass from "../../_components/Glass";

export default function ExamplesToTry() {
  return (
    <Glass>
      <div className="flex flex-col gap-3 md:gap-5 xl:gap-7 p-3 md:p-5 xl:p-7">
        <h2 className="text-lg font-bold !leading-tight sm:text-xl lg:text-2xl 2xl:text-3xl">
          Looking for inspiration?
        </h2>

        <Link
          href="?jobTitle=Software+Engineer"
          className="font-medium underline hover:text-odpink-mid"
        >
          Software Engineer
        </Link>

        <Link
          href="?jobTitle=Data+Scientist"
          className="font-medium underline hover:text-odpink-mid"
        >
          Data Scientist
        </Link>

        <Link
          href="?jobTitle=Business+Development+Representative"
          className="font-medium underline hover:text-odpink-mid"
        >
          Business Development Representative
        </Link>

        <Link
          href="?jobTitle=Marketing+Manager"
          className="font-medium underline hover:text-odpink-mid"
        >
          Marketing Manager
        </Link>

        <Link
          href="?jobTitle=Customer+Service+Representative"
          className="font-medium underline hover:text-odpink-mid"
        >
          Customer Service Representative
        </Link>

        <Link
          href="?jobTitle=Talent+Lead"
          className="font-medium underline hover:text-odpink-mid"
        >
          Talent Lead
        </Link>
      </div>
    </Glass>
  );
}
