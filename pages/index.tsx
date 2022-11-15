import { useRef, useState } from "react";
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Breadcrumbs, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography, Input } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import { ActionType, ApplicationType, GetLoggerResults, Result } from "../types/loggers";

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f");
  const {result}: GetLoggerResults = await res.json();

  return {
    props: {
      result: result,
    }
  }
}

const columns: GridColDef[] = [
  { field: 'logId', headerName: 'Log ID', width: 150 },
  { field: 'applicationType', headerName: 'Aplication Type', width: 150 },
  { field: 'applicationId', headerName: 'Application ID', width: 150 },
  { field: 'actionType', headerName: 'Action Type', width: 150 },
  { field: '', headerName: 'Action Details', width: 150 },
  { field: 'creationTimestamp', headerName: 'Date: Time', width: 150 },
];

const Home: NextPage<{result: Result}> = ({result}) => {

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
      ...(employeeNameInput.current!.value && {logInfo: employeeNameInput.current!.value}),
      ...(actionTypeInput && {actionType: actionTypeInput}),
      ...(applicationTypeInput && {applicationType: applicationTypeInput}),
      ...(fromDateInput && {fromDate: moment(fromDateInput).format()}),
      ...(toDateInput && {toDate: moment(toDateInput).format()}),
      ...(applicationIdInput.current!.value && {applicationId: applicationIdInput.current!.value}),
    };
    router.push(router)
  }
  
  function getLoggersData(data: any) {
    data = data
    .filter((datum: any)=> datum.logInfo?.toString?.()?.includes?.(router.query.logInfo || ""))
    .filter((datum: any)=> datum.actionType?.toString?.()?.includes?.(router.query.actionType || ""))
    .filter((datum: any)=> datum.applicationType?.toString?.()?.includes?.(router.query.applicationType || ""))
    .filter((datum: any)=> datum.applicationId?.toString?.()?.includes?.(router.query.applicationId || ""))

    return data
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
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="From Date"
                  inputFormat="MM/DD/YYYY"
                  value={fromDateInput}
                  onChange={(newValue: Date | null) => setFromDateInput(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="To Date"
                  inputFormat="MM/DD/YYYY"
                  value={toDateInput}
                  onChange={(newValue: Date | null) => setToDateInput(newValue)}
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

        <Box sx={{ height: 700, width: '100%' }}>
          <DataGrid
            getRowId={(row) => row.logId}
            rows={getLoggersData(result.auditLog)}
            columns={columns}
            pageSize={11}
            rowsPerPageOptions={[5]}
          />
        </Box>

      </Box>
    </div>
  )
}

export default Home;