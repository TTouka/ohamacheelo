import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Logs from "./Logs";

const ROLES = [
  { dice: "111", name: "ピンゾロ", power: 5 },
  { dice: "xxx", name: "ゾロ目", power: 3 },
  { dice: "456", name: "ジゴロ", power: 2 },
  { dice: "123", name: "ヒフミ", power: -2 },
  { dice: "334", name: "33-4", power: -5 },
];

function detectRole(dice) {
  const nums = dice.split("");
  nums.sort();
  let diceSorted = nums.join("");

  const role = ROLES.find(({ dice }) => dice === diceSorted);
  if (role) {
    return { ...role, dice };
  }
  if (nums[0] === nums[1] && nums[0] === nums[2]) {
    // ゾロ目
    return { ...ROLES.find(({ dice }) => dice === "xxx"), dice };
  }

  const numSorted = nums.reduce((acc, num) => {
    acc[num] = acc[num] ?? 0;
    acc[num]++;

    return acc;
  }, {});

  const hasDouble = Object.values(numSorted).find((cnt) => cnt === 2);
  if (hasDouble) {
    return {
      dice: dice,
      name: Object.entries(numSorted).find((dice) => dice[1] === 1)[0],
      power: 1,
    };
  }

  return { name: "役なし", dice };
}

function RollDialog({ member, onClose, open, onTurnEnd, TransitionProps }) {
  const [role, setRole] = useState({});
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs([]);
    setRole({});
  }, [member, setLogs, setRole]);

  const handleDiceInput = useCallback(
    (ev) => {
      const dice = ev.target.value.toString();
      if (!dice.match(/^[1-6]{3}$/)) {
        setRole({});

        return;
      }
      setRole(detectRole(dice));
    },
    [setRole]
  );

  const handleKeyDown = useCallback(
    (ev) => {
      if (ev.key !== "Enter") {
        return;
      }

      const dice = ev.target.value.toString();
      if (!dice.match(/^[1-6]{3}$/)) {
        return;
      }

      const role = detectRole(dice);
      setLogs([...logs, role]);
      ev.target.value = "";
      setRole({});
    },
    [logs, setLogs]
  );

  const handleFumble = useCallback(() => {
    setLogs([...logs, { name: "ションベン", isFumble: true }]);
  }, [setLogs, logs]);

  const handleClose = useCallback(
    (event, reason) => {
      if (reason === "backdropClick") {
        return;
      }
      onClose(event);
    },
    [onClose]
  );

  const handleCommit = useCallback(() => {
    onTurnEnd(member, logs);
    handleClose();
  }, [member, onTurnEnd, logs, handleClose]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionProps={TransitionProps}
      disableEscapeKeyDown
    >
      <DialogTitle>
        {member.name}さん
        {member.isDealer && "（親）"}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignContent="center">
          <TextField
            autoFocus
            fullWidth
            placeholder="出目"
            sx={{
              input: {
                textAlign: "center",
                fontSize: 36,
                letterSpacing: 10,
                MozAppearance: "textfield",
                "&::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                },
                "&::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                },
              },
            }}
            inputProps={{ size: 5 }}
            onChange={handleDiceInput}
            onKeyDown={handleKeyDown}
            type="number"
            variant="outlined"
            title="入力したらEnter"
          />
          <Typography variant="h6" component="div" textAlign="center">
            {role.name ?? "-"}
          </Typography>
          <Button color="warning" variant="text" onClick={handleFumble}>
            ションベン！
          </Button>
        </Box>
        <Divider />
        {logs.length > 0 && <Logs logs={logs} />}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={handleClose} color="primary">
          キャンセル
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommit}
          disabled={logs.length === 0}
        >
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RollDialog;
