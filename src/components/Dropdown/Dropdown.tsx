import React, {useEffect, useRef, useState} from "react";
import {FilterType} from "../../shared/types";
import "./Dropdown.scss";

function DropDown({handleChange}: { handleChange: (filter: FilterType) => void }) {
    const status: FilterType[] = [FilterType.ALL, FilterType.PENDING, FilterType.COMPLETED, FilterType.CANCELLED, FilterType.IN_PROGRESS];
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Request to the BE to get rides with selected FilterType
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    function handleToggle() {
        setIsOpen(!isOpen);
    }


    function onChange(filter: FilterType) {
        setIsOpen(false);
        handleChange(filter);
    }

    return (
        <div className="dropdown">
            <button
                className={`btn dropdown-toggle ${isOpen ? "active" : ""}`}
                type="button"
                id="dropdownMenuButton"
                aria-haspopup="true"
                onClick={handleToggle}
            >
                Filter
            </button>

            {isOpen && (
                <div className="list" ref={dropdownRef}>
                    <ul>
                        {status.map((filter: FilterType) => (
                            <li
                                key={filter}
                                className="option"
                                onClick={() => onChange(filter)}
                            >
                                {filter}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    );
}

export default DropDown;
