import axios from 'axios';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Grid, TextField } from '@mui/material';

/* eslint-disable-next-line */
export interface LoginProps {
  email: string
  password: string
}

const StyledLogin = styled.div`
  color: pink;
`;

export function Login() {
  const [form, setForm] = useState<LoginProps>({
    email: "",
    password: ""
  })

  const onEnter = () => {
    axios.post("api/login", form)
  }

  return (
    <StyledLogin>
      <Grid container spacing={1}>
        <Grid item>
          <TextField
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            label="Email"
            value={form.email}
          />
        </Grid>
        <Grid item>
          <TextField
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            label="Senha"
            value={form.password}
          />
        </Grid>
        <Grid item>
          <Button onClick={onEnter} >Entrar</Button>
        </Grid>
      </Grid>

    </StyledLogin>
  );
}
