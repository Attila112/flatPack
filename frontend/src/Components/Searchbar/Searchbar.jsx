import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input, Select, Option } from "@material-tailwind/react";
import SearchAll from "./SearchAll.jsx";
import SearchLittle from "./SearchLittle.jsx";

function Searchbar(props) {
  const [queryParams, setQueryParams] = useSearchParams();
  const [types, setTypes] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [detailsSearch, setDetailsSearch] = useState(false)
  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/properties/types"
        );
        const foundData = await response.json();
        setTypes(foundData);
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
  const handleChangeDropDownType = (value) => {
    setSelectedType(value);
    const newFormData = { ...formData, type: value };
    props.changePage(1);
    setQueryParams(newFormData);
  };
    const handleChangeDropDownMaterial = (value) => {
        setSelectedMaterial(value);
        const newFormData = { ...formData, building_material: value };
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
      <div
          className={`flex flex-col items-center justify-center transition-all duration-300 ${
              detailsSearch ? "p-4" : "p-2 h-20"
          }`}
      >
          {detailsSearch ? (
              <SearchAll
                  selectedType={selectedType}
                  handleChangeDropDownType={handleChangeDropDownType}
                  types={types}
                  formData={formData}
                  handleChange={handleChange}
                  selectedMaterial={selectedMaterial}
                  handleChangeDropDownMaterial={handleChangeDropDownMaterial}
                  setQueryParams={setQueryParams}
                  setDetailsSearch={setDetailsSearch}
              />
          ) : (
              <SearchLittle
                  selectedType={selectedType}
                  handleChangeDropDownType={handleChangeDropDownType}
                  types={types}
                  formData={formData}
                  handleChange={handleChange}
                  setQueryParams={setQueryParams}
                  setDetailsSearch={setDetailsSearch}
              />
          )}
      </div>

  )
}

export default Searchbar;
