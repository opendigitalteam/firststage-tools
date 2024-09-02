import csvToJson from "convert-csv-to-json";
import path from "path";

export const DATA = csvToJson
  .indexHeader(5)
  .fieldDelimiter(",")
  .supportQuotedField(true)
  .getJsonFromCsv(path.join(process.cwd(), "data/ai-adoption-data.csv"))
  .reverse();

export const SIC_SECTIONS_FROM_BICS_DATA = unique(
  DATA.map((data) => data["Industry/SizeBand"]) as string[]
)
  .filter((i) => !i.match(/^[0-9]/))
  .filter((i) => !i.startsWith("All"))
  .sort();

export const DATES_FROM_BICS_DATA = [
  "Sep 2023",
  "Dec 2023",
  "Mar 2024",
  "Jun 2024",
];

export function loadAllCompaniesData(filter: string): number[] {
  const normalisedFilter = filter === "all" ? "All businesses" : filter;

  const allCompaniesData = DATA.filter(
    (data) => data["Industry/SizeBand"] === normalisedFilter
  );

  return allCompaniesData.map((dataRow) => {
    return (
      100 -
      parseFloat(
        dataRow["Businessisnotcurrentlyusingartificialintelligencetechnologies"]
      )
    );
  });
}

function unique<T>(arr: T[]): T[] {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
}
