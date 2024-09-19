import formStore from "@/lib/store/formStore";
import tenantDetails from "@/lib/preBuildScripts/static/tenantDetailsMain";
export default function Radio(props) {
  const { state_name, name, options } = props;

  const dataHandler = formStore((state) => state[state_name]) || [];
  const entryOnChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const handler = checked ? [value] : [];
    formStore.setState({ [state_name]: handler });
  };

  const isChecked = (value, index) => {
    if (dataHandler.length === 0) {
      return index === 0;
    } else {
      return dataHandler.includes(value);
    }
  };

  return (
    <div className="md:flex flex-wrap w-full gap-x-[20px]">
      {options.map((option, i) => (
        <div key={i} className="flex items-start mb-[20px] md:mb-0">
          <input
            id={`${state_name}-${i}`}
            type="radio"
            value={option.value}
            onChange={entryOnChange}
            checked={isChecked(option.value, i)}
            className="top-[5px] relative"
            name={name}
          />
          <label
            htmlFor={`${state_name}-${i}`}
            className={`text-[14px] cursor-pointer pl-[5px]`}
          >
            {option.label.replace("site_name", tenantDetails?.site_name)}
          </label>
        </div>
      ))}
    </div>
  );
}
