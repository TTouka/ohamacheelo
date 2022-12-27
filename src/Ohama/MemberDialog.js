import {
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
import { useCallback, useState } from "react";

function MemberDialog({ open, onClose, members, setMembers }) {
  const [toAdd, setToAdd] = useState("");

  const handleToDealer = useCallback(
    (memberName) => () => {
      setMembers([
        ...members.map((member) => {
          member.isDealer = member.name === memberName;
          return member;
        }),
      ]);
    },
    [members, setMembers]
  );

  const handleDelete = useCallback(
    (memberName) => () => {
      setMembers([...members.filter((member) => member.name !== memberName)]);
    },
    [setMembers, members]
  );

  const handleAddMember = useCallback(
    (ev) => {
      ev.preventDefault();

      if (toAdd === "" || members.map(({ name }) => name).includes(toAdd)) {
        return false;
      }

      setMembers([
        ...members,
        {
          name: toAdd,
          point: 10000,
          isDealer: members.length === 0,
        },
      ]);
      setToAdd("");
    },
    [members, setMembers, toAdd, setToAdd]
  );

  const handleChangePoint = useCallback(
    (memberName) => (ev) => {
      setMembers([
        ...members.map((member) => {
          if (member.name === memberName) {
            member.point = Number(ev.target.value);
          }

          return member;
        }),
      ]);
    },
    [members, setMembers]
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>参加者</DialogTitle>
      <DialogContent>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>名前</TableCell>
              <TableCell>マッチー</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.name}>
                <TableCell>{member.name}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={member.point}
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
                    onChange={(ev) => setToAdd(ev.target.value)}
                  />
                  <Button
                    onClick={handleAddMember}
                    disabled={
                      toAdd === "" ||
                      members.map(({ name }) => name).includes(toAdd)
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
      </DialogContent>
    </Dialog>
  );
}

export default MemberDialog;
