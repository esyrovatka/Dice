"use client";
import {
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import styles from "./home.module.css";
import Button from "@mui/material/Button";
import { marks } from "./config";
import useHome from "./lib/useHome";

export default function HomePage() {
  const { lastMatchStatistic, num, isUnder, setIsUnder, selectedValue, tableList, handleChange, getRandomNum } = useHome();

  return (
    <main className={styles.main}>
      {lastMatchStatistic && (
        <Alert
          variant="filled"
          severity={lastMatchStatistic.status}
          sx={{ width: 600, position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)" }}
        >
          <Typography>{lastMatchStatistic.text}</Typography>
          <Typography>{lastMatchStatistic.subtext}</Typography>
        </Alert>
      )}

      <Box className={styles.num}>
        <Typography className={styles.value} fontSize={96} lineHeight={2}>
          {num}
        </Typography>
      </Box>

      <FormControl>
        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group" row value={isUnder ? "Under" : "Over"}>
          <FormControlLabel value="Under" control={<Radio color="secondary" />} label="Under" onClick={event => setIsUnder(true)} />
          <FormControlLabel value="Over" control={<Radio color="secondary" />} label="Over" onClick={() => setIsUnder(false)} />
        </RadioGroup>
      </FormControl>

      <Box sx={{ width: 320 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Slider size="small" color="secondary" step={1} valueLabelDisplay="auto" marks={marks} value={selectedValue} onChange={handleChange} />
        </Stack>
      </Box>

      <Button sx={{ maxWidth: 320, marginTop: 2 }} variant="contained" color="secondary" fullWidth onClick={getRandomNum}>
        Play
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600, border: 0 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Guess</TableCell>
              <TableCell>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableList.map(row => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.time}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.guess}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ color: row.isWin ? "green" : "red" }}>
                  {row.result}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
