import SearchDonorFilter from "@/Components/SearchDonorFilter";

const SearchDonorPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">

      <div className="mb-8 border-l-4 border-crimson pl-4">
        <h3 className="uppercase text-xs font-bold tracking-wider text-crimson mb-1">
          Find a donor
        </h3>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
          Search donors near you
        </h2>
      </div>

      <div>

        <div>
            <SearchDonorFilter />
        </div>

      </div>
    </section>
  );
};

export default SearchDonorPage;
