import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useMembers } from "./Store/useMembers";

function MemberDialog({ config, open, onClose }) {
  const { members, saveMembers } = useMembers();
  const [tmpMembers, setTmpMembers] = useState([...members]);
  useEffect(() => {
    setTmpMembers([...members]);
  }, [setTmpMembers, members]);

  //
  const handleSaveMembers = useCallback(() => {
    saveMembers(tmpMembers);
    onClose();
  }, [saveMembers, onClose, tmpMembers]);

  //
  const [toAdd, setToAdd] = useState("");
  const handleAddMember = useCallback(
    (ev) => {
      ev.preventDefault();

      if (toAdd === "" || tmpMembers.map(({ name }) => name).includes(toAdd)) {
        return false;
      }

      setTmpMembers([
        ...tmpMembers,
        {
          name: toAdd,
          point: config.initialPoint,
          isDealer: tmpMembers.length === 0,
        },
      ]);
      setToAdd("");
    },
    [config, tmpMembers, setTmpMembers, toAdd, setToAdd]
  );

  //
  const handleToDealer = useCallback(
    (memberName) => () => {
      setTmpMembers([
        ...tmpMembers.map((member) => {
          member.isDealer = member.name === memberName;
          return member;
        }),
      ]);
    },
    [tmpMembers, setTmpMembers]
  );
  const handleDelete = useCallback(
    (memberName) => () => {
      setTmpMembers([
        ...tmpMembers.filter((member) => member.name !== memberName),
      ]);
    },
    [setTmpMembers, tmpMembers]
  );
  const handleChangePoint = useCallback(
    (memberName) => (ev) => {
      setTmpMembers([
        ...tmpMembers.map((member) => {
          if (member.name === memberName) {
            member.point = Number(ev.target.value);
          }

          return member;
        }),
      ]);
    },
    [tmpMembers, setTmpMembers]
  );

  //
  const handleEntering = useCallback(() => {
    setTmpMembers([...members]);
  }, [setTmpMembers, members]);
  const handleClose = useCallback(
    (ev, reason) => {
      if (reason === "escapeKeyDown" || reason === "backdropClick") {
        onClose();

        return;
      }

      saveMembers(tmpMembers);
      onClose();
    },
    [saveMembers, onClose, tmpMembers]
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      TransitionProps={{
        onEntering: handleEntering,
      }}
    >
      <DialogTitle>参加者</DialogTitle>
      <DialogContent>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>名前</TableCell>
              <TableCell>マチー</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tmpMembers.map((member) => (
              <TableRow key={member.name}>
                <TableCell>{member.name}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={member.point}
                    size="small"
                    onChange={handleChangePoint(member.name)}
                  />
                </TableCell>
                <TableCell align="right">
                  {member.isDealer && "親"}
                  {!member.isDealer && (
                    <Button onClick={handleToDealer(member.name)}>
                      親にする
                    </Button>
                  )}
                  <Button
                    color="error"
                    disabled={member.isDealer}
                    onClick={handleDelete(member.name)}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ display: "flex", alignItems: "center" }}>
                <form
                  style={{ display: "contents" }}
                  onSubmit={handleAddMember}
                >
                  <TextField
                    value={toAdd}
                    size="small"
                    onChange={(ev) => setToAdd(ev.target.value)}
                  />
                  <Button
                    onClick={handleAddMember}
                    disabled={
                      toAdd === "" ||
                      tmpMembers.map(({ name }) => name).includes(toAdd)
                    }
                  >
                    追加
                  </Button>
                </form>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box textAlign="right">
          <Button color="primary" onClick={handleSaveMembers}>
            保存
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default MemberDialog;
