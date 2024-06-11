import { Fragment, useState } from "react";

import tenantDetails from "@/lib/preBuildScripts/static/tenantDetailsMain";

export default function Radio(props) {
  let defaultValue = "";
  const { options } = props;
  const inputProps = {
    ...props,
  };

  if (inputProps?.state_name === "privacy_consent") {
    defaultValue = inputProps?.options[0].value;
  }

  delete inputProps.inline;
  return (
    <Fragment>
      {options.map((n, i) => (
        <div key={i} className="flex items-start gap-2">
          <input
            type="radio"
            name={inputProps.state_name}
            id={`${inputProps?.state_name}-${i}`}
            value={defaultValue || n.value}
            className="mt-[8px]"
            checked={defaultValue ? "checked" : ""}
          />
          <label
            htmlFor={`${inputProps?.state_name}-${i}`}
            className="text-[14px] cursor-pointer"
          >
            {n.label.replace("site_name", tenantDetails?.site_name)}
          </label>
        </div>
      ))}
    </Fragment>
  );
}
