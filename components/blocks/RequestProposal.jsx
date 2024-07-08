import globalState from "@/lib/store/globalState";
import ProposalForm from "../partials/forms/ProposalForm"

export default function RequestProposal({ block }) {
    const showLazy = globalState((state) => state.showLazy);
    return(
        <div className="bg-[#F1F1F1] py-[30px]">
            <div className="container">
                {!showLazy ? (
                    <>
                        <div className="flex flex-wrap ">
                            {Array.from({ length: 12 }, (_, index) => (
                                <div className="w-full md:max-w-[50%] p-[7px] mb-[15px]" key={index}>
                                    <div className="animate-pulse bg-[#ccc] h-[15px] w-full mb-2 max-w-[100px]"/>
                                    <div className="animate-pulse bg-[#ccc] h-[40px] w-full"/>
                                </div>
                            ))}
                        </div>
                        <div className="px-[7px] mt-[15px]">
                            <div className="animate-pulse bg-[#ccc] max-w-[200px] h-[40px] w-full"/>
                        </div>
                    </>
                ) : (
                    <ProposalForm form={block?.main?.form} />
                )}
            </div>
        </div>
    )
}