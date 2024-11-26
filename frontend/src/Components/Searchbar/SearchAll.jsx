import React from 'react';
import {Input, Option, Select} from "@material-tailwind/react";

function SearchAll(props) {
    return (
        <form className="grid grid-cols-4 gap-4 relative pb-16">
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
                label={"Street"}
                name={"street"}
                value={props.formData.street || ""}
                type={"text"}
                onChange={props.handleChange}
            />
            <Input
                color={"black"}
                label={"House Number"}
                name={"house_number"}
                value={props.formData.house_number || ""}
                type={"number"}
                onChange={props.handleChange}
            />
            <Input
                color={"black"}
                label={"Max Size"}
                name={"size"}
                value={props.formData.size || ""}
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
            <Input
                color={"black"}
                label={"Title"}
                name={"title"}
                value={props.formData.title || ""}
                type={"text"}
                onChange={props.handleChange}
            />
            <Input
                color={"black"}
                label={"Max bathroom"}
                name={"bathroom_count"}
                value={props.formData.bathroom_count || ""}
                type={"number"}
                onChange={props.handleChange}
            />
            <Input
                color={"black"}
                label={"Floor numbers"}
                name={"floor"}
                value={props.formData.floor || ""}
                type={"number"}
                onChange={props.handleChange}
            />
            <Select
                color={"purple"}
                label={"Select building material"}
                name={"building_material"}
                value={props.selectedMaterial}
                onChange={props.handleChangeDropDownMaterial}>
                <Option disabled value="">Select Building Material</Option>
                <Option value="Brick">Brick</Option>
                <Option value="Wood">Wood</Option>
                <Option value="Mud">Mud</Option>
                <Option value="Disc">Disc</Option>
            </Select>
            <label>Garage:
                <input name={"garage"} type={"checkbox"} checked={props.formData.garage} onChange={props.handleChange}/>
            </label>
            <button
                className="px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
                type={"reset"}
                onClick={() => props.setQueryParams("")}
            >
                Reset
            </button>
            <div className={"col-span-4 flex justify-center absolute bottom-0 left-0 right-0"}>
            <button
                className="px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
                type={"button"}
                onClick={() => props.setDetailsSearch(false)}
            >
                Less Details
            </button>
            </div>
        </form>
    );
}

export default SearchAll;