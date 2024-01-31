import React from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Paper, IconButton } from "@mui/material";

interface SearchBarProps {
  width?: number;
  placeholder?: string;
  onSearch: (value: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({
  width = 400,
  placeholder = "Search ...",
  onSearch,
}) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: width,
        padding: "2px 4px",
        borderRadius: 2,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        value={inputValue}
        inputProps={{ "aria-label": "search" }}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <IconButton onClick={handleSearch} sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export { SearchBar };
