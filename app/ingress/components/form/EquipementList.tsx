"use client";
import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Equipement } from "../../types";

interface EquipementListProps {
  equipements: Equipement[] | undefined;
  selectedEquipements: string[];
  setValue: any;
}

const EquipementList: React.FC<EquipementListProps> = ({
  equipements,
  selectedEquipements,
  setValue,
}) => {
  const handleCheckboxChange = (id: string) => {
    const currentIndex = selectedEquipements.indexOf(id);
    const newChecked = [...selectedEquipements];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setValue("equipements", newChecked);
  };
  return (
    <Stack direction="column" gap={2} mt={2} width="100%">
      <Typography>Equipamiento</Typography>
      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {equipements?.map((equipement) => (
          <FormControlLabel
            key={equipement.id}
            control={
              <Checkbox
                checked={selectedEquipements.includes(equipement.id)}
                onChange={() => handleCheckboxChange(equipement.id)}
              />
            }
            label={equipement.type}
          />
        ))}
      </FormGroup>
    </Stack>
  );
};

export { EquipementList };
