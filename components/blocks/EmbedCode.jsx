export default function EmbedCode({ block }) {
    if(block?.main?.embed_code) {
        return(
            <div className="py-[50px] px-[30px] bg-[#F1F1F1]">
                {block?.main?.embed_code && (
                    <div className="container" dangerouslySetInnerHTML={{ __html: block.main.embed_code }} />
                )}
            </div>
        )
    }
    return
}