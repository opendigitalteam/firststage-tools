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

export default function ResearchForm({
  jobTitle,
  location,
}: {
  jobTitle?: string;
  location?: string;
}) {
  const [formErrors, action] = useFormState(research, undefined);
  const [showMoreOptions, setShowMoreOptions] = useState(location !== "global");

  return (
    <form
      action={action}
      className="flex-1 flex flex-col gap-3 md:gap-5 xl:gap-7 max-w-2xl"
    >
      <FormField errors={formErrors?.jobTitle} inline="center">
        <FormLabel label="Job Title" htmlFor="jobTitle" widthClassName="w-32" />

        <FormInputGroup width="grow">
          <FormErrors errors={formErrors?.jobTitle} />

          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            className="w-full rounded-full border-2 border-odpink-black/50 px-6 py-3 text-lg group-[.error]:border-red-500"
            defaultValue={jobTitle}
          />
        </FormInputGroup>
      </FormField>

      {showMoreOptions ? (
        <>
          <FormField errors={formErrors?.location} inline="center">
            <FormLabel
              label="Location"
              htmlFor="location"
              widthClassName="w-32"
            />

            <FormInputGroup>
              <FormErrors errors={formErrors?.location} />

              <div className="flex gap-3">
                <select
                  id="location"
                  name="location"
                  className="w-full max-w-md rounded-full border-2 border-odpink-black/50 px-6 py-3 text-lg group-[.error]:border-red-500"
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

                <button
                  className="font-medium underline hover:text-odpink-mid whitespace-nowrap"
                  onClick={() => setShowMoreOptions(false)}
                >
                  show global results
                </button>
              </div>
            </FormInputGroup>
          </FormField>
        </>
      ) : (
        <div>
          <input type="hidden" name="location" value="global" />
          <button
            className="font-medium underline hover:text-odpink-mid"
            onClick={() => setShowMoreOptions(true)}
          >
            Filter by location
          </button>
        </div>
      )}

      <div>
        <UtilitySubmit size="lg" color="pink">
          <Search className="-ml-1" /> Search
        </UtilitySubmit>
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
