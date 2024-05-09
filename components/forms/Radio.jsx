import { Fragment } from "react";

import tenantDetails from "@/lib/preBuildScripts/static/tenantDetailsMain";

export default function Radio(props) {
  const { options } = props;
  const inputProps = {
    ...props,
  };

  delete inputProps.inline;
  return (
    <Fragment>
      {options.map((n, i) => (
        <div key={i} className="flex items-start gap-2">
          <input
            type="radio"
            name={inputProps.state_name}
            id={`${inputProps?.state_name}-${i}`}
            value={n.value}
            className="mt-[8px]"
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
