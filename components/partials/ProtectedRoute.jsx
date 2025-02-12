import persistentStore from "@/lib/store/persistentStore";

export default function ProtectedRoute({ statePassword, tenantPassword }) {
  const submitForm = (e) => {
    e.preventDefault();
    const form = document.getElementById("protected-form");
    const password = form.querySelector("input").value;

    if (password === tenantPassword) {
      persistentStore.setState({ password });
    } else {
      alert("Invalid password.");
    }
  };

  return (
    <div className="py-[50px] min-h-[70vh] flex items-center">
      <div className="container">
        <div
          className={`pb-[30px]  w-full flex text-center justify-center pt-[10px] text-[25px] text-primary ${
            process.env.NEXT_PUBLIC_MICROSITE_ID == 7
              ? "font-effra"
              : "font-tenor"
          }`}
        >
          Password Protected
        </div>
        <form
          id="protected-form"
          className="relative max-w-[500px] mx-auto"
          onSubmit={submitForm}
        >
          <input
            type="password"
            name="new-password"
            id="new-password"
            autoComplete="new-password"
            className="border-[1px] border-[#ddd] w-full px-[10px] py-[5px] min-h-[45px] pr-[80px]"
            placeholder="Enter the password to proceed."
          />
          <button
            type="submit"
            className="absolute w-full max-w-[70px] w-full top-0 right-0 bg-primary py-[10px] text-[#FFFFFF] min-h-[45px] text-[15px] flex justify-center items-center px-[15px] uppercase"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[20px] h-[20px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
