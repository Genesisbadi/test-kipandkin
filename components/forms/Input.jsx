import formStore from "@/lib/store/formStore";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import countries from "@/lib/country/countries";
import "react-datepicker/dist/react-datepicker.css";
import "flatpickr/dist/themes/material_green.css";

const Select = dynamic(
  () => import("react-select").then((module) => module.default),
  {
    ssr: false,
  }
);

const DatePicker = dynamic(
  () => import("react-datepicker").then((module) => module.default),
  {
    ssr: false,
  }
);

const Flatpickr = dynamic(
  () => import("react-flatpickr").then((module) => module.default),
  {
    ssr: false,
  }
);

const CustomInput = ({ inputRef, ...props }) => {
  return (
    <input
      {...props}
      className="border-[1px] border-[#ddd] w-full px-[10px] py-[5px] min-h-[45px] w-[100%]"
      ref={inputRef}
      value={formStore.getState()[props?.state_name]}
    />
  );
};

export default function Input(props) {
  const { state_name } = props;
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value, state_name]);

  const onChange = (newValue) => {
    setValue(newValue);
    formStore.setState({ [state_name]: newValue });
    if (props.onChange) props.onChange(newValue);
  };

  const handleFocus = (e) => {
    const parentContainer = e.target.closest(".parent-select");
    parentContainer.classList.add("is-active");

    const input = parentContainer.querySelector(
      `input[name="${props.state_name}"]`
    );
    input.addEventListener("blur", handleBlur);
    input.addEventListener("change", handleChange);
  };

  const handleBlur = (e) => {
    const parentContainer = e.target.closest(".parent-select");
    if (e.target.value === "") {
      parentContainer.classList.remove("is-active");
    }
  };

  const handleChange = (e) => {
    const parentContainer = e.target.closest(".parent-select");
    if (e.target.value === "") {
      parentContainer.classList.remove("is-active");
    }
  };
  switch (state_name) {
    case "date":
      return (
        <>
          <Flatpickr
            options={{
              enableTime: false,
              dateFormat: "Y-m-d",
            }}
            onChange={(selectedDates) => {
              const date = selectedDates[0];
              onChange(date);
            }}
            value={formStore.getState()[props?.state_name]}
            render={({ ...props }, ref) => {
              return (
                <CustomInput
                  name={state_name}
                  state_name={state_name}
                  id={state_name}
                  inputRef={ref}
                />
              );
            }}
          />
        </>
      );
    case "preferred_time":
      return (
        <>
          <Flatpickr
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: "h:i K",
              time_24hr: false,
            }}
            onChange={(selectedTimes) => {
              const time = selectedTimes[0];
              onChange(time);
            }}
            name={state_name}
            id={state_name}
            value={formStore.getState()[props?.state_name]}
            render={({ ...props }, ref) => {
              return (
                <CustomInput
                  name={state_name}
                  state_name={state_name}
                  id={state_name}
                  inputRef={ref}
                />
              );
            }}
          />
        </>
      );
    case "country":
      return (
        <div
          className={`${props?.wrapperclassname} parent-select`}
          onFocus={handleFocus}
        >
          <Select
            isClearable={true}
            id={state_name}
            state_name={state_name}
            name={state_name}
            value={formStore.getState()[state_name]}
            className="border-0"
            {...props}
            onChange={(e) => {
              onChange(e);
              formStore.setState({ [state_name]: e });
              if (props?.onChange) props?.onChange(e);
            }}
            options={countries}
          />
        </div>
      );
    case "event_date":
      return (
        <DatePicker
          selected={value}
          className="w-full"
          placeholderText={"Please select a date"}
          onChange={(date) => onChange(date)}
          {...props}
        />
      );
    default:
      return (
        <input
          {...props}
          onChange={(e) => {
            if (props?.onChange) props?.onChange(e);
          }}
        />
      );
  }
}
