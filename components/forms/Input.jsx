import formStore from "@/lib/store/formStore";
import dynamic from "next/dynamic";
import { useState } from "react";
import countries from "@/lib/country/countries";
import "react-datepicker/dist/react-datepicker.css";

const Select = dynamic(() => import("react-select").then((module) => module.default), {
  ssr: false,
});

const DatePicker = dynamic(() => import("react-datepicker").then((module) => module.default), {
  ssr: false,
});

export default function Input(props) {
  const { state_name, automated = false } = props;
  const [value, setValue] = useState("");

  const onChange = (value) => {
    formStore.setState({ [state_name]: value.map((n) => n.value) });
  };

  const handleFocus = (e) => {
    const parentContainer = e.target.closest(".parent-select");
    parentContainer.classList.add("is-active");

    const input = parentContainer.querySelector(`input[name="${props.state_name}"]`);
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
    case "country":
      return (
        <div className={`${props?.wrapperclassname} parent-select`} onFocus={handleFocus}>
          <Select
            isClearable={true}
            {...props}
            onChange={(e) => {
              if (props?.onChange) props?.onChange(e);
              if (automated) onChange(e);
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
          placeholderText={'Please select a date'} 
          onChange={(date) => {
            setValue(date);
            if (props?.onChange) props?.onChange(date);
          }}
          {...props} 
          
        />
      );
    default:
      return (
        <input
          {...props}
          onChange={(e) => {
            setValue(e.target.value);
            if (props?.onChange) props?.onChange(e);
          }}
        />
      );
  }
}