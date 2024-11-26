import React from 'react';
import {Input, Option, Select} from "@material-tailwind/react";

function SearchLittle(props) {
    return (
        <form className="flex items-center justify-center w-auto h-auto space-x-2">
            <Select
                color={"purple"}
                label={"Select Type"}
                name={"type"}
                value={props.selectedType}
                onChange={props.handleChangeDropDownType}
            >
                {props.types ? (
                    props.types.map((type) => {
                        return (
                            <Option value={type} key={type}>
                                {type}
                            </Option>
                        );
                    })
                ) : (
                    <Option> Nothing</Option>
                )}
            </Select>
            <Input
                color={"black"}
                label={"City"}
                name={"city"}
                value={props.formData.city || ""}
                type={"text"}
                onChange={props.handleChange}
            />
            <Input
                color={"black"}
                label={"Max Price"}
                name={"price"}
                value={props.formData.price || ""}
                type={"number"}
                onChange={props.handleChange}
            />
            <Input
                color={"black"}
                label={"Number of rooms"}
                name={"rooms"}
                value={props.formData.rooms || ""}
                type={"number"}
                onChange={props.handleChange}
            />
            <button
                className="px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
                type={"reset"}
                onClick={() => props.setQueryParams("")}
            >
                Reset
            </button>
            <button
                className="px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
                type={"button"}
                onClick={() => props.setDetailsSearch(true)}
            >
                Details
            </button>

        </form>
    );
}

export default SearchLittle;