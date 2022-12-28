import { Box } from "@mui/material";

function Unit({ ligature = false }) {
  if (ligature) {
    return (
      <Box
        display="inline-grid"
        gridTemplateColumns="repeat(2, 1fr)"
        fontSize="50%"
        fontWeight="bold"
        paddingLeft="1ex"
        style={{ verticalAlign: "middle" }}
      >
        <span>マ</span>
        <span>チ</span>
        <span>ー</span>
      </Box>
    );
  }

  return "マチー";
}

export default Unit;
