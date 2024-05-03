import React from 'react';
import { Box, TextField, FormControl, InputLabel, MenuItem, Select, useTheme } from '@mui/material';

const filters = [
  { name: 'Roles', options: ['Backend', 'Frontend', 'Full Stack', 'Android', 'IOS', 'Flutter', 'React Native', 'Data Engineer'] },
  { name: 'Number Of Employees', options: ['1-10', '11-20', '21-50', '51-100', '101-200', '201-500', '500+'] },
  { name: 'Experience', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
  { name: 'Remote', options: [ 'Hybrid','Remote','In-Office'] },
  { name: 'Minimum Base Pay Salary', options: ['0L','10L','20L','30L','40L','50L','60L','70L',] },
];

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
      width: 300, // Decreased width for smaller filters
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Filter = () => {
  const theme = useTheme();
  const [selectedFilters, setSelectedFilters] = React.useState({});

  const handleChange = (filterName) => (event) => {
    const { target: { value } } = event;
    setSelectedFilters({
      ...selectedFilters,
      [filterName]: typeof value === 'string' ? value.split(',') : value,
    });
  };

  return (
    <div className='flex justify-center'>
      <div >
        {filters.map((filter) => (
          <FormControl key={filter.name} sx={{ minWidth: 150, mr: 2 ,width: 250}}>
            <InputLabel id={`demo-multiple-${filter.name.toLowerCase()}-label`}>{filter.name}</InputLabel>
            <Select
              labelId={`demo-multiple-${filter.name.toLowerCase()}-label`}
              id={`demo-multiple-${filter.name.toLowerCase()}`}
              multiple
              value={selectedFilters[filter.name] || []}
              onChange={handleChange(filter.name)}
              MenuProps={MenuProps}
            >
              {filter.options.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  style={getStyles(option, selectedFilters[filter.name] || [], theme)}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
        <Box sx={{ width: 200 ,mt : 2}}>
          <TextField fullWidth label="Search Company Name" id="fullWidth" />
        </Box>
      </div>
    </div>
  );
};

export default Filter;

