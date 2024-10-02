import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";

import { env } from "../Util/env";
import { fileData } from "../Util/file";
import { RequestPerson } from "../Util/types";
import { wait } from "../Util/util";

const app: Express = express();
const PORT = env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/search", async (req: Request, res: Response) => {
  const { email, number }: RequestPerson = req.body;

  try {
    const foundPeople = fileData.filter((person) => {
      if (person.email === email) {
        if (number !== "") {
          return person.number === number;
        }
        return true;
      }
    });

    // wait 5s
    await wait(1000);

    res.json(foundPeople);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
