import {
  Autocomplete,
  Box,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { countries, Country } from "../../data/countries"
import SearchIcon from "@mui/icons-material/Search"

interface CountryAutocompleteProps {
  showSelect: boolean
  setShowSelect: (showSelect: boolean) => void
  country: Country | undefined
  setCountry: (country: Country | undefined) => void
}

export function CountryAutocomplete({
  showSelect,
  setShowSelect,
  country,
  setCountry,
}: CountryAutocompleteProps) {
  return (
    <>
      <Select
        size="small"
        onOpen={() => setShowSelect(true)}
        onClose={() => setShowSelect(false)}
        renderValue={() => <Typography>+{country?.phone}</Typography>}
        displayEmpty
        MenuProps={{
          PaperProps: { style: { display: "none" } },
        }}
        startAdornment={
          country ? (
            <Stack alignItems="center" mr="12px">
              <img
                loading="lazy"
                width="20"
                height="10"
                src={`https://flagcdn.com/w20/${country?.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${country?.code.toLowerCase()}.png 2x`}
                alt={`flag-of-${country?.code.toLowerCase()}`}
              />
            </Stack>
          ) : null
        }
        sx={{
          minWidth: "150px",
        }}
      />
      {showSelect ? (
        <Box position="absolute" top="calc(100% + 4px)">
          <Autocomplete
            disableClearable
            forcePopupIcon={false}
            size="small"
            options={countries}
            open={true}
            filterOptions={(options, { inputValue }) =>
              options.filter(
                (option) =>
                  option.label
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                  ("+" + option.phone)
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                  option.phone.toLowerCase().includes(inputValue.toLowerCase())
              )
            }
            value={country || undefined}
            sx={{
              minWidth: "300px",
            }}
            renderInput={(params) => (
              <Box
                sx={{
                  border: "1px solid #E4E4EB",
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                }}
              >
                <TextField
                  {...params}
                  variant="standard"
                  autoFocus
                  focused={true}
                  placeholder="Search..."
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    startAdornment: (
                      <SearchIcon sx={{ color: "#5870E0", mr: "8px" }} />
                    ),
                  }}
                  sx={{
                    "& .MuiInput-root": {
                      px: "8px",
                      py: "12px",
                    },
                  }}
                />
              </Box>
            )}
            onChange={(e, _country) => {
              setCountry(_country)
            }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { flexShrink: 0 } }}
                {...props}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={4}
                  width="100%"
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <img
                      loading="lazy"
                      width="20"
                      height="10"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt={`flag-of-${option.code.toLowerCase()}`}
                    />
                    <Typography sx={{ fontSize: "14px" }}>
                      {option?.label}
                    </Typography>
                  </Stack>
                  <Typography textAlign="center" whiteSpace="nowrap">
                    +{option?.phone}
                  </Typography>
                </Stack>
              </Box>
            )}
          />
        </Box>
      ) : null}
    </>
  )
}
