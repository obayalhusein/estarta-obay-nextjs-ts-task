import { Box, Breadcrumbs, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Head from "next/head";
import { ActionType, ApplicationType } from "../types/loggers";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Obay Alhusein - Next js on typescript</title>
      </Head>
      <Box sx={{ mx: 3 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ my: 3 }}>
          <Typography color="text.primary">Home</Typography>
          <Typography color="text.primary">Administration</Typography>
          <Typography color="text.primary">Logger search</Typography>
        </Breadcrumbs>

        <Grid container spacing={2} mb={3}>
          <Grid item sx={{ flex: 1 }}>
            <TextField label="Employee Name" placeholder="e.g. Admin.User" variant="outlined" fullWidth />
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="action-type-label">Action type</InputLabel>
              <Select
                labelId="action-type-label"
                // value={actionTypeInput}
                label="Action type"
                // onChange={e => setActionTypeInput(e.target.value)}
              >
                <MenuItem value="">
                    No select
                </MenuItem>
                {Object.keys(ActionType).map((keyName: string, index: number) => (
                    <MenuItem value={ActionType[keyName]} key={index}>
                        {ActionType[keyName]}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="application-type-label">Application type</InputLabel>
              <Select
                labelId="application-type-label"
                // value={applicationTypeInput}
                label="Application type"
                // onChange={e => setApplicationTypeInput(e.target.value)}
              >
                <MenuItem value="">
                    No select
                </MenuItem>
                {Object.keys(ApplicationType).map((keyName: string, index: number) => (
                    <MenuItem value={ApplicationType[keyName]} key={index}>
                        {ApplicationType[keyName]}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="From Date"
                  inputFormat="MM/DD/YYYY"
                  // value={fromDateInput}
                  // onChange={(newValue: Dayjs | null) => setFromDateInput(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="To Date"
                  inputFormat="MM/DD/YYYY"
                  // value={toDateInput}
                  // onChange={(newValue: Dayjs | null) => setToDateInput(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <TextField label="Application ID" placeholder="e.g. 219841/2021" variant="outlined" fullWidth />
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <Button variant="contained" sx={{ height: '100%' }} fullWidth>Search</Button>
          </Grid>
        </Grid>

      </Box>
    </div>
  )
}
