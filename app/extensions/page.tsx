import { FilterExtentions } from "@/components/FilterExtentions";

export default function ExtensionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <section className="py-40">
      <div className="container mx-auto">
        <FilterExtentions searchParams={searchParams} />
      </div>
    </section>
  );
}
