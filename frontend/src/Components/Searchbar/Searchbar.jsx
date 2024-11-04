import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input, Select, Option } from "@material-tailwind/react";

function Searchbar(props) {
  const [queryParams, setQueryParams] = useSearchParams();
  const [types, setTypes] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/properties/types"
        );
        const foundData = await response.json();
        setTypes(foundData);
        console.log(foundData);
      } catch (error) {
        console.error("Error fetching property types:", error);
      }
    };

    fetchPropertyTypes();
  }, []);

  useEffect(() => {
    const fetchProperties = async (search) => {
      try {
        clickChange(props.page);
        const response = await fetch(
          `http://127.0.0.1:8000/api/properties/search?${search}`
        );
        const foundData = await response.json();
        props.changePageNumber(foundData.pageNumber);
        props.changeProperties(foundData.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties(queryParams.toString());
  }, [queryParams, props.page]);
  const formData = Object.fromEntries(queryParams.entries());
  const handleChangeDropDown = (value) => {
    setSelectedType(value);
    const newFormData = { ...formData, type: value };
    props.changePage(1);
    setQueryParams(newFormData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    props.changePage(1);
    setQueryParams(newFormData);
  };
  const clickChange = (number) => {
    const newFormData = {
      ...formData,
      page: number,
    };
    setQueryParams(newFormData);
  };
  return (
    <form className="flex ">
      <Select
        color={"purple"}
        label={"Select Type"}
        name={"type"}
        value={selectedType}
        onChange={handleChangeDropDown}
      >
        {types ? (
          types.map((type) => {
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
        value={formData.city || ""}
        type={"text"}
        onChange={handleChange}
      />
      <Input
        color={"black"}
        label={"Street"}
        name={"street"}
        value={formData.street || ""}
        type={"text"}
        onChange={handleChange}
      />
      <Input
        color={"black"}
        label={"Max Price"}
        name={"price"}
        value={formData.price || ""}
        type={"number"}
        onChange={handleChange}
      />
      <Input
        color={"black"}
        label={"Max Size"}
        name={"size"}
        value={formData.size || ""}
        type={"number"}
        onChange={handleChange}
      />
      <Input
        color={"black"}
        label={"Number of rooms"}
        name={"rooms"}
        value={formData.rooms || ""}
        type={"number"}
        onChange={handleChange}
      />
      <button
        className="px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
        type={"reset"}
        onClick={() => setQueryParams("")}
      >
        Reset
      </button>
    </form>
  );
}

export default Searchbar;
