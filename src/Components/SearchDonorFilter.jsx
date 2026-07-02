"use client";

import { useState } from "react";
import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";

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

  const handleSearch = () => {
    // TODO: call your filter/search logic here
    console.log({ selectedBloodGroup, selectedDistrict, selectedUpazila });
  };

  return (
    <div className="bg-white max-w-7xl mx-auto rounded-2xl p-4 shadow-md border">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-10 items-end">
        {/* Blood Group */}
        <div className="relative inline-block text-left w-full lg:col-span-3">
          <label className="text-ink block mb-1">Blood Group</label>
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
          <label className="text-ink block mb-1">Donor District</label>
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
          <label className="text-ink block mb-1">Donor Upazila</label>
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
    </div>
  );
};

export default SearchDonorFilter;