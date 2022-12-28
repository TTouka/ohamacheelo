import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import { useConfig } from "./Store/useConfig";
import { useGame } from "./Store/useGame";
import Unit from "./Unit";

function Member({ member, onClick, disabled, ...rest }) {
  const { config } = useConfig();
  const { getRoll } = useGame();
  const roll = getRoll(member.name);
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
        disabled={disabled}
        onClick={onClick}
        sx={{
          display: "flex",
          justifyContent: "stretch",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <CardContent
          sx={{
            padding: 1,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
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
            flexGrow={1}
          >
            <Box textAlign="center" flexGrow={0}>
              <Typography variant="h5" lineHeight={1}>
                {member.point.toLocaleString()}
              </Typography>
              <Typography variant="h6" lineHeight={1} fontSize={14}>
                <Unit />
              </Typography>
            </Box>
            <Box
              textAlign="center"
              flexGrow={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {roll && !member.isDealer && (
                <>
                  <Tooltip
                    open={Boolean(roll?.refundMulti ?? false)}
                    title={`\u00d7 ${roll?.refundMulti}`}
                    placement="right-start"
                    arrow
                    componentsProps={{
                      popper: {
                        sx: {
                          zIndex: 1000,
                        },
                      },
                      tooltip: {
                        sx: {
                          fontSize: 18,
                          mt: -2,
                          backgroundColor:
                            roll?.refundMulti > 0
                              ? "primary.main"
                              : "error.main",
                        },
                      },
                      arrow: {
                        sx: {
                          transform: "translate3d(0px, 4.75px, 0px) !important",
                          "&:before": {
                            backgroundColor:
                              roll?.refundMulti > 0
                                ? "primary.main"
                                : "error.main",
                          },
                        },
                      },
                    }}
                  >
                    <Typography variant="h5" lineHeight={1}>
                      {roll.bet.toLocaleString()}
                      <Unit ligature />
                    </Typography>
                  </Tooltip>
                </>
              )}
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
