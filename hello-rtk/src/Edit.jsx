import { useState } from "react";

import { Input, IconButton } from "@mui/material";
import { Save as SaveIcon, ArrowBack as BackIcon } from "@mui/icons-material";

import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Edit({ update }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [subject, setSubject] = useState(state.item.subject);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          update(state.item._id, subject);
          navigate("/");
        }}
      >
        <Input
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          sx={{ mb: 4 }}
          fullWidth
          endAdornment={
            <IconButton type="submit">
              <SaveIcon />
            </IconButton>
          }
        />
      </form>
      <Link to="/">
        <BackIcon />
      </Link>
    </div>
  );
}
