"use client";

import { countries } from "countries-list";
import { Search } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import {
  FormErrors,
  FormField,
  FormInputGroup,
  FormLabel,
} from "../../_components/Form";
import { UtilitySubmit } from "../../_components/UtilityButton";
import { research } from "../_action";
import { CountryCode } from "../_domain";

export default function ResearchForm({
  jobTitle,
  location,
}: {
  jobTitle?: string;
  location?: CountryCode;
}) {
  const [formErrors, action] = useFormState(research, undefined);
  const [showMoreOptions, setShowMoreOptions] = useState(
    location !== "global" && location !== undefined
  );

  return (
    <form
      action={action}
      className="flex-1 flex flex-col gap-3 md:gap-5 xl:gap-7 max-w-2xl"
    >
      <FormField errors={formErrors?.jobTitle}>
        <FormLabel
          label="Job Title"
          htmlFor="jobTitle"
          hint="Enter a job title you would like to research"
        />

        <FormInputGroup>
          <FormErrors errors={formErrors?.jobTitle} />

          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            className="w-full rounded border-2 border-odpink-black/50 px-3 py-2 group-[.error]:border-red-500"
            defaultValue={jobTitle}
          />
        </FormInputGroup>

        {!showMoreOptions && (
          <button
            className="md:hidden text-sm self-start font-medium underline hover:text-odpink-mid"
            onClick={() => setShowMoreOptions(true)}
          >
            Filter by location
          </button>
        )}
      </FormField>

      {showMoreOptions && (
        <>
          <FormField errors={formErrors?.location}>
            <FormLabel label="Location" htmlFor="location" />

            <FormInputGroup>
              <FormErrors errors={formErrors?.location} />

              <div className="flex gap-3">
                <select
                  id="location"
                  name="location"
                  className="w-full md:max-w-md rounded border-2 border-odpink-black/50 px-3 py-2 group-[.error]:border-red-500"
                  defaultValue={location}
                >
                  <optgroup>
                    <option value="global">Global</option>
                    <option value="GB">United Kingdom</option>
                    <option value="US">United States</option>
                  </optgroup>

                  <optgroup>
                    {Object.entries(countries)
                      .sort(sortFn(([, country]) => country.name))
                      .map(([countryCode, country]) => (
                        <option key={countryCode} value={countryCode}>
                          {country.name}
                        </option>
                      ))}
                  </optgroup>
                </select>

                {/* <button
                  className="font-medium underline hover:text-odpink-mid whitespace-nowrap"
                  onClick={() => setShowMoreOptions(false)}
                >
                  show global results
                </button> */}
              </div>
            </FormInputGroup>
          </FormField>
        </>
      )}

      <div className="flex gap-5 items-center mt-1">
        <UtilitySubmit size="lg" color="pink">
          <Search className="-ml-1" /> Search
        </UtilitySubmit>

        {!showMoreOptions && (
          <>
            <input type="hidden" name="location" value="global" />
            <button
              className="max-md:hidden font-medium underline hover:text-odpink-mid"
              onClick={() => setShowMoreOptions(true)}
            >
              Filter by location
            </button>
          </>
        )}
      </div>
    </form>
  );
}

export function sortFn<T>(
  sortValueFn: (item: T) => string | number,
  asc = true
) {
  return asc
    ? (a: T, b: T) => (sortValueFn(a) > sortValueFn(b) ? 1 : -1)
    : (a: T, b: T) => (sortValueFn(a) < sortValueFn(b) ? 1 : -1);
}
