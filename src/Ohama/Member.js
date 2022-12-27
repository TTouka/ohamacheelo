import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

function Member({ member, roll, onClick, ...rest }) {
  const rolled = Boolean(roll);

  const color = !rolled
    ? "grey.500"
    : roll.isFumble
    ? "error.main"
    : roll.power < 0
    ? "warning.main"
    : "primary.main";

  return (
    <Card
      sx={{
        borderColor: color,
        borderWidth: 2,
        display: "flex",
      }}
      elevation={0}
      variant="outlined"
      {...rest}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <CardContent sx={{ padding: 1 }}>
          <Box textAlign="center">
            <Typography
              variant="h5"
              component="div"
              textAlign="center"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {member.isDealer && `\u{1F3B2}`}
              {member.name}
            </Typography>
          </Box>
          <Box
            display="flex"
            gap={1}
            alignItems="center"
            justifyContent="stretch"
          >
            <Box textAlign="center" flexGrow={0}>
              <Typography variant="h5" lineHeight={1}>
                {member.point.toLocaleString()}
              </Typography>
              <Typography variant="h6" lineHeight={1} fontSize={14}>
                マッチー
              </Typography>
            </Box>
            <Box textAlign="center" flexGrow={1}>
              {roll && (
                <Typography
                  variant="h6"
                  lineHeight={1}
                  fontSize={14}
                  sx={{
                    "& span::before": {
                      content: "'/'",
                    },
                    "& span:first-of-type::before": {
                      content: "''",
                    },
                  }}
                >
                  {roll.log.map((roll, idx) => (
                    <span key={idx}>{roll.dice ?? "\u00d7"}</span>
                  ))}
                </Typography>
              )}
              {roll && (
                <Typography
                  variant="h5"
                  component="div"
                  textAlign="center"
                  fontWeight="bold"
                  lineHeight={1}
                  sx={{ mt: 0.5 }}
                >
                  {roll.name}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Member;
