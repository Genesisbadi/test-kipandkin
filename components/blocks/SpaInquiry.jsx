import SpaInquiryForm from "../partials/forms/SpaInquiryForm"

export default function SpaInquiry({ block }) {
    return(
        <div className="py-[30px] bg-[#F1F1F1]">
            <div className="container">
                <SpaInquiryForm form={block?.main?.form} />
            </div>
        </div>
    )
}