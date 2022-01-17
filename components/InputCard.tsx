import styles from "../styles/Home.module.css";
// import { cognito_state } from "recoil/state";
// import { useRecoilValue } from "recoil";
// import axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useAxiosInstance from "util/axios";

interface props {
    field: string;
    label: string;
    help: string;
}

const InputCard = ({field, label, help}: props) => {
  const [data, setData] = useState("");
  const axios = useAxiosInstance();

  const submit = async () => {
    if (data === "") {
        return;
    }

    const body = {
        field: field,
        value: data,
    }
    const res = await axios.put("/profile", body);
  };

  return (
    <a className={styles.card}>
      <h2>{label} &rarr;</h2>
      <TextField
        id="outlined-basic"
        label="Net ID"
        variant="outlined"
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
      <Button style={{ marginTop: 10, marginLeft: 10 }} color="primary" onClick={submit}>
        Submit
      </Button>

      <p style={{ marginTop: 20 }}>{help}</p>
    </a>
  );
};

export default InputCard;
