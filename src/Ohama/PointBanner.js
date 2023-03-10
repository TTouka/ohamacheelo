import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Unit from "./Unit";

const COUNT_DURATION = 1000;
const COUNT_STEP = 50;

function stepCount(from, to, setter, finish) {
  const step = (to - from) / COUNT_STEP;

  const counter = (num) => {
    setter(from + step * num);

    if (num >= COUNT_STEP || from + step * (num + 1) > to) {
      setter(to);
      finish();
      return;
    }

    setTimeout(() => {
      counter(num + 1);
    }, COUNT_DURATION / COUNT_STEP);
  };

  counter(0);
}

function PointBanner({ roll, member }) {
  const [tmpWon, setTmpWon] = useState(0);
  const [tmpPoint, setTmpPoint] = useState(0);

  const [updatingWon, setUpdatingWon] = useState(false);
  const [updatingPoint, setUpdatingPoint] = useState(false);

  useEffect(() => {
    if (roll?.won && !updatingWon && roll?.won !== tmpWon) {
      setUpdatingWon(true);
      stepCount(tmpWon, roll?.won, setTmpWon, () => setUpdatingWon(false));
    } else if ((roll?.won ?? null) === null) {
      setTmpWon(0);
    }
  }, [tmpWon, roll?.won, updatingWon]);

  useEffect(() => {
    if (!updatingPoint && member.point !== tmpPoint) {
      setUpdatingPoint(true);
      stepCount(tmpPoint, member.point, setTmpPoint, () =>
        setUpdatingPoint(false)
      );
    }
  }, [tmpPoint, member.point, updatingPoint]);

  if (tmpWon === 0) {
    return (
      <Box position="absolute" top={0} bottom={0} left={0} right={0}>
        <Box
          sx={{ transform: "translateX(30px) rotate(45deg)" }}
          width="500px"
          textAlign="center"
          position="absolute"
          left={-250}
          backgroundColor="lightcyan"
          paddingY={1}
        >
          <Typography variant="h5" lineHeight={1}>
            {tmpPoint.toLocaleString()}
          </Typography>
          <Typography variant="h6" lineHeight={1} fontSize={14}>
            <Unit />
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box position="absolute" top={0} bottom={0} left={0} right={0}>
      <Box
        sx={{
          transform:
            "translate(22px, 8px) translate(25px, -14px) scale(0.75, 0.75) rotate(45deg)",
        }}
        width="500px"
        position="absolute"
        left={-250}
        paddingY={1}
        textAlign="center"
        backgroundColor="mistyrose"
      >
        <Typography variant="h5" lineHeight={1}>
          {(tmpWon ?? 0) > 0 && "+"}
          {tmpWon?.toLocaleString()}
          <Typography
            variant="h6"
            lineHeight={1}
            fontSize={14}
            component="span"
          >
            <Unit />
          </Typography>
        </Typography>
      </Box>
      <Box
        sx={{
          transform:
            "translate(20px, 10px) translate(0,0) scale(0.75, 0.75) rotate(45deg)",
        }}
        width="500px"
        position="absolute"
        left={-250}
        paddingY={1}
        textAlign="center"
        backgroundColor="lightcyan"
      >
        <Typography variant="h5" lineHeight={1}>
          {tmpPoint.toLocaleString()}
        </Typography>
        <Typography variant="h6" lineHeight={1} fontSize={14}>
          <Unit />
        </Typography>
      </Box>
    </Box>
  );
}

export default PointBanner;
