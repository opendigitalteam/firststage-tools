"use client";

import { ChevronRight } from "lucide-react";
import { useFormState } from "react-dom";
import {
  FormErrors,
  FormField,
  FormInputGroup,
  FormLabel,
} from "../../_components/Form";
import { UtilitySubmit } from "../../_components/UtilityButton";
import { research } from "../_action";

export default function ResearchForm({ jobTitle }: { jobTitle?: string }) {
  const [formErrors, action] = useFormState(research, undefined);

  return (
    <form
      action={action}
      className="flex-1 flex flex-col gap-3 md:gap-5 xl:gap-7"
    >
      <FormField errors={formErrors?.jobTitle}>
        <FormLabel
          label="Job Title"
          htmlFor="jobTitle"
          hint="Enter the job title you wish to see alternatives for"
        />

        <FormInputGroup>
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

      <div>
        <UtilitySubmit size="lg" color="pink">
          Generate Alternatives <ChevronRight className="-mr-2" />
        </UtilitySubmit>
      </div>
    </form>
  );
}
