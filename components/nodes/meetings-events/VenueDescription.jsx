export default function VenueDescription({ ...props }) {
  const { description } = props;
  return (
    <section
      className="w-full block text-[14px] mb-[30px]"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}
