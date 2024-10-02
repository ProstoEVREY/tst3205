import fs from "fs";
import { Person } from "../Util/types";

export const fileData: Person[] = JSON.parse(
  fs.readFileSync("./data.json", "utf-8")
);
