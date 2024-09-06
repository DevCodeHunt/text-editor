"use clients";

import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

type Option = {
  value: string;
  label: string;
};
type DropdownProps = {
  options: Option[];
  value: string;
  setValue: any;
};

const Dropdown: React.FC<DropdownProps> = ({ options, value, setValue }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const toggleDropdown = useCallback(() => {
    setOpenDropdown((prevOpen) => !prevOpen);
    setSearch("");
    setFilteredOptions(options); 
  }, [options]);

  const handleSelectValue = (value: string) => {
    setValue(value);
    toggleDropdown();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    const filteredData = options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filteredData);
  };

  return (
    <div
      ref={dropdownRef}
      onClick={toggleDropdown}
      className="relative cursor-pointe flex items-center justify-between gap-4 border rounded h-[36px] px-2 w-36"
    >
      <span className="text-sm whitespace-nowrap line-clamp-1 flex-1">{value}</span>
      <button type="button" className="">
        {openDropdown ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {openDropdown && (
        <ul
          onClick={(e) => e.stopPropagation()}
          className="absolute top-9 border rounded bg-white z-10 left-0 right-0 w-full max-h-[300px] overflow-y-auto no-scrollbar"
        >
          {options.length > 20 && (
            <li className="sticky top-0 left-0">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Serach..."
                className="w-full h-8 border-b text-xs px-2 outline-none"
              />
            </li>
          )}
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelectValue(option.value)}
              className={`p-2 cursor-pointer text-sm transition ${
                value === option.value ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
