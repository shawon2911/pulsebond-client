"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filtering = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname()
  // console.log("pathname", pathname)

  const handleFilter = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if(value){
      params.set("status", value);
      // console.log("params:", params)
    }else{
      params.delete("status");
    }
    router.push(`${pathname}?${params.toString()}`);
  }
  return (
    <div>
      <select
        onChange={handleFilter}
        className="border border-crimson text-gray-400 px-4 py-2 rounded-lg"
      >
        <option className="text-gray-200" value="all">
          All 
        </option>
        <option value="pending">Pending</option>
        <option value="inprogress">Inprogress</option>
        <option value="Done">Done</option>
       
      </select>
    </div>
  );
};

export default Filtering;
