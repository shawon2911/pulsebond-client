"use client";

import { useState } from "react";
import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";
import SearchDonorTable from "./SearchDonorTable";

const SearchDonorFilter = () => {
  const [isOpenBloodBox, setIsOpenBloodBox] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [isUpazilaOpen, setIsUpazilaOpen] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("A+");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDistrictLabel, setSelectedDistrictLabel] = useState(
    "Select Donor District",
  );
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedUpazilaLabel, setSelectedUpazilaLabel] = useState(
    "Select Donor upazila",
  );
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const BloodOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  const handleSearch = async () => {
    try {
      console.log({ selectedBloodGroup, selectedDistrict, selectedUpazila });
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/searchDonor?bloodGroup=${encodeURIComponent(selectedBloodGroup)}`;
      if (selectedDistrict) {
        url += `&district=${encodeURIComponent(selectedDistrict)}`;
      }
      if (selectedUpazila) {
        url += `&upazila=${encodeURIComponent(selectedUpazila)}`;
      }

      const res = await fetch(url);
      const result = await res.json();
      // console.log(result);
      const finalResult = result?.data;
      setDonors(finalResult);
      setHasSearched(true);
    } catch (error) {
      console.error("Submission layout exception crash tracking: ", error);
    }
  };
  // console.log(donors)

  return (
    <div className=" max-w-7xl mx-auto ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-10 bg-white rounded-2xl py-8  px-6  shadow-md border items-end">
        {/* Blood Group */}
        <div className="relative inline-block text-left w-full lg:col-span-3">
          <label className="text-ink block font-semibold mb-1">
            Blood Group
          </label>
          <button
            type="button"
            onClick={() => setIsOpenBloodBox(!isOpenBloodBox)}
            className="w-full border border-red-600 text-gray-500 px-4 py-2 rounded-lg text-left bg-white flex justify-between items-center"
          >
            {selectedBloodGroup}
            <span>▼</span>
          </button>

          {isOpenBloodBox && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {BloodOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    setSelectedBloodGroup(option.label);
                    setIsOpenBloodBox(false);
                  }}
                  className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-crimson hover:text-white transition-colors duration-150"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* District */}
        <div className="relative inline-block text-left w-full lg:col-span-3">
          <label className="text-ink block font-semibold mb-1">
            Donor District
          </label>
          <button
            type="button"
            onClick={() => setIsDistrictOpen(!isDistrictOpen)}
            className="w-full border border-red-600 text-gray-500 px-4 py-2 rounded-lg text-left bg-white flex justify-between items-center"
          >
            {selectedDistrictLabel}
            <span>▼</span>
          </button>

          {isDistrictOpen && (
            <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
              {districtsData?.map((d) => (
                <li
                  key={d.id}
                  onClick={() => {
                    setSelectedDistrict(d.id);
                    setSelectedDistrictLabel(d.name);
                    setSelectedUpazila("");
                    setSelectedUpazilaLabel("Select Donor upazila");
                    const upazilas = upazilasData?.filter(
                      (u) => u.district_id === d.id,
                    );
                    setFilteredUpazilas(upazilas);
                    setIsDistrictOpen(false);
                  }}
                  className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-crimson hover:text-white transition-colors duration-150"
                >
                  {d.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Upazila */}
        <div className="relative inline-block text-left w-full lg:col-span-3">
          <label className="text-ink block font-semibold mb-1">
            Donor Upazila
          </label>
          <button
            type="button"
            disabled={!selectedDistrict}
            onClick={() => setIsUpazilaOpen(!isUpazilaOpen)}
            className={`w-full border border-red-600 text-gray-500 px-4 py-2 rounded-lg text-left bg-white flex justify-between items-center ${
              !selectedDistrict ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {selectedUpazilaLabel}
            <span>▼</span>
          </button>

          {isUpazilaOpen && selectedDistrict && (
            <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
              {filteredUpazilas?.map((u) => (
                <li
                  key={u.id}
                  onClick={() => {
                    setSelectedUpazila(u.id);
                    setSelectedUpazilaLabel(u.name);
                    setIsUpazilaOpen(false);
                  }}
                  className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-crimson hover:text-white transition-colors duration-150"
                >
                  {u.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Button */}
        <div className="w-full lg:col-span-1">
          <button
            type="button"
            onClick={handleSearch}
            className="w-full bg-crimson text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-150"
          >
            Search
          </button>
        </div>
      </div>

      <div className="md:py-10">
        {/* text show before search */}
      {!hasSearched && (
        <div className="max-w-7xl mx-auto mt-6 bg-white border border-crimson/20 rounded-2xl shadow-md p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-crimson/10 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-crimson"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-ink text-lg font-semibold mb-1">Find a Donor</h3>
          <p className="text-ink/60 text-sm max-w-sm">
            Select blood group, district, and upazila above, then hit search to
            find available donors near you.
          </p>
        </div>
      )}

      {/* table show after find data */}
      {hasSearched && donors.length > 0 && <SearchDonorTable data={donors} selectedDistrictLabel={selectedDistrictLabel} selectedUpazilaLabel={selectedUpazilaLabel}  />}

      {/* no donor found text show after search */}
      {hasSearched && donors.length === 0 && (
        <div className="max-w-7xl mx-auto mt-6 bg-white border border-crimson/20 rounded-2xl shadow-md p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-crimson/10 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-crimson"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-ink text-lg font-semibold mb-1">
            No Donor Found
          </h3>
          <p className="text-ink/60 text-sm max-w-sm">
            We couldn't find any donor matching your selected blood group,
            district, or upazila. Try adjusting your filters.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 bg-crimson-dark text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-crimson transition-colors duration-150"
          >
            Reset Filters
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default SearchDonorFilter;
