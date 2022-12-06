import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { useState, useMemo } from "react";
import "./styles.css";

// const WEIGHTS = [45, 35, 25, 10, 5, 2.5];
const WEIGHTS = [25, 20, 15, 10, 5, 2.5, 1.25];

export default function App() {
  const [maxWeight, setMaxWeight] = useState(250);
  const [bar, setBar] = useState(20);
  // const [with35, setWith35] = useState(true);
  // const [with55, setWith55] = useState(false);
  // const [with100, setWith100] = useState(false);
  const map = useMemo(() => {
    const map = {};
    let i = bar;
    while (i < maxWeight) {
      const plates = {};
      let weight = i - bar;
      // if (with100) {
      //   plates[100] = Number.parseInt(weight / 200, 10);
      //   weight %= 200;
      // }
      // if (with55) {
      //   plates["55"] = Number.parseInt(weight / 110, 10);
      //   weight %= 110;
      // }
      WEIGHTS.forEach((plate) => {
        plates[plate + " "] = Number.parseInt((weight / plate) * 2, 10);
        weight %= plate * 2;
      });
      // plates["45"] = Number.parseInt(weight / 90, 10);
      // weight %= 90;
      // if (with35) {
      //   plates["35"] = Number.parseInt(weight / 70, 10);
      //   weight %= 70;
      // }
      // plates["25"] = Number.parseInt(weight / 50, 10);
      // weight %= 50;
      // plates["10"] = Number.parseInt(weight / 20, 10);
      // weight %= 20;
      // plates["5"] = Number.parseInt(weight / 10, 10);
      // weight %= 10;
      // plates["2.5"] = Number.parseInt(weight / 5, 10);
      map[i] = plates;
      i += WEIGHTS[WEIGHTS.length - 1] * 2;
    }
    return map;
  }, [bar, maxWeight /*, with35, with55, with100*/]);

  return (
    <>
      <h1>The Homegym Discord Plate Math Chart</h1>
      <div>
        <label htmlFor="bar">Bar Weight</label>
        <input
          type="number"
          step={5}
          max={85}
          min={15}
          id="bar"
          value={bar}
          onChange={(e) => setBar(Number.parseInt(e.target.value, 10))}
        />
        <label htmlFor="max">Max Weight</label>
        <input
          type="number"
          min={45}
          id="max"
          value={maxWeight}
          onChange={(e) => setMaxWeight(Number.parseInt(e.target.value, 10))}
        />
        {/* <label htmlFor="no35">No 35s</label>
        <input
          type="checkbox"
          id="no35"
          checked={!with35}
          onChange={(e) => setWith35(!e.target.checked)}
        />
        <label htmlFor="with55">With 55s</label>
        <input
          type="checkbox"
          id="with55"
          checked={with55}
          onChange={(e) => setWith55(e.target.checked)}
        />
        <label htmlFor="with100">With 100s</label>
        <input
          type="checkbox"
          id="with100"
          checked={with100}
          onChange={(e) => setWith100(e.target.checked)}
        /> */}
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell component="th">Weight</TableCell>
            {Object.keys(map[bar]).map((weight) => (
              <TableCell key={weight} component="th">
                {weight}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(map).map(([weight, plates]) => (
            <TableRow key={weight}>
              <TableCell component="th">{weight}</TableCell>
              {Object.entries(plates).map(([plate, amount]) => (
                <TableCell key={plate}>{amount}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
