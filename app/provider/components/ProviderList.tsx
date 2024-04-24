import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import { Provider } from "../types";
import { ProviderCard } from "./ProviderCard";

const ProvidersList: React.FC<{ providers: Provider[] }> = ({ providers }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(providers);

  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProviders.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleSearch = () => {
    const filtered = providers.filter((provider) =>
      provider.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProviders(filtered);
  };

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Stack
      width="100%"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      paddingBottom={5}
    >
      <Typography variant="h4" sx={{ margin: 2 }}>
        Lista de proveedores
      </Typography>

      <Stack width="70%" direction="row" justifyContent="flex-end">
        <TextField
          label="Search Providers"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
      </Stack>

      {currentItems.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}

      <Pagination
        count={Math.ceil(providers.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </Stack>
  );
};

export { ProvidersList };
