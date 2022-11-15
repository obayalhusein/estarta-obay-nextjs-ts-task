import { Box, Breadcrumbs, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography, Input } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Head from "next/head";
import { useRouter } from "next/router";
import { ActionType, ApplicationType } from "../types/loggers";
import { useRef, useState } from "react";
import moment from "moment";


export default function Home() {
  const employeeNameInput = useRef<HTMLInputElement>(null);
  const [actionTypeInput, setActionTypeInput] = useState<string>('');
  const [applicationTypeInput, setApplicationTypeInput] = useState<string>('');
  const [fromDateInput, setFromDateInput] = useState<any>(null);
  const [toDateInput, setToDateInput] = useState<any>(null);
  const applicationIdInput = useRef<HTMLInputElement>(null);
  
  const router = useRouter();
  
  const submitFilter = (e: any) => {
    e.preventDefault();

    router.query = {
      ...(employeeNameInput.current!.value && {logId: employeeNameInput.current!.value}),
      ...(actionTypeInput && {actionType: actionTypeInput}),
      ...(applicationTypeInput && {applicationType: applicationTypeInput}),
      ...(fromDateInput && {fromDate: moment(fromDateInput).format()}),
      ...(toDateInput && {toDate: moment(toDateInput).format()}),
      ...(applicationIdInput.current!.value && {applicationId: applicationIdInput.current!.value}),
    };
    router.push(router)
    console.log(router.query);
  } 

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

        <form onSubmit={e => submitFilter(e)}>
        <Grid container spacing={2} mb={3}>
          <Grid item sx={{ flex: 1 }}>
            <TextField inputRef={employeeNameInput} label="Employee Name" placeholder="e.g. Admin.User" variant="outlined" fullWidth />
          </Grid>
          
          <Grid item sx={{ flex: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="action-type-label">Action type</InputLabel>
              <Select
                value={actionTypeInput}
                labelId="action-type-label"
                label="Action type"
                onChange={e => setActionTypeInput(e.target.value)}
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
                value={applicationTypeInput}
                labelId="application-type-label"
                label="Application type"
                onChange={e => setApplicationTypeInput(e.target.value)}
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
                  value={fromDateInput}
                  onChange={(newValue: Dayjs | null) => setFromDateInput(newValue)}
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
                  value={toDateInput}
                  onChange={(newValue: Dayjs | null) => setToDateInput(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <TextField inputRef={applicationIdInput} label="Application ID" placeholder="e.g. 219841/2021" variant="outlined" fullWidth />
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <Button type="submit" variant="contained" sx={{ height: '100%' }} fullWidth>Search</Button>
          </Grid>
        </Grid>
        </form>

      </Box>
    </div>
  )
}
