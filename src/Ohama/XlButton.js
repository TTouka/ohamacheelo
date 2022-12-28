import { Button } from "@mui/material";

function XlButton({ children, ...props }) {
  return (
    <Button size="large" sx={{ fontSize: 32, px: 7 }} {...props}>
      {children}
    </Button>
  );
}

export default XlButton;
