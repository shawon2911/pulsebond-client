"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Filtering = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname()
  // console.log("pathname", pathname)
   const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("All");
    const options = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "inprogress", label: "Inprogress" },
    { value: "Done", label: "Done" }
  ];

  


  const handleFilter = (value) => {
    const params = new URLSearchParams(searchParams);
    
    
    if (value && value !== "all") {
      params.set("status", value);
    } else {
      params.delete("status");
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
   



    <div className="relative inline-block text-left w-38">
      {/* Dropdown Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-red-600 text-gray-500 px-4 py-2 rounded-lg text-left bg-white flex justify-between items-center"
      >
        {selected}
        <span>▼</span>
      </button>

      {/* Dropdown Menu List */}
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {options.map((option) => (
            <li 
              key={option.value}
              onClick={() => {
                setSelected(option.label);
                setIsOpen(false);
                handleFilter(option.value); 
              }}
              className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-crimson hover:text-white transition-colors duration-150"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filtering;





