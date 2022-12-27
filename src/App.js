import { Button, Container, Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Member from "./Ohama/Member";
import RollDialog from "./Ohama/RollDialog";
import MemberDialog from "./Ohama/MemberDialog";

function App() {
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState({});
  const [dialogShown, setDialogShown] = useState(false);

  const [rolls, setRolls] = useState([]);

  const handleTurnEnd = useCallback(
    (member, log) => {
      const roll = log.slice(-1)[0];
      const existing = rolls.findIndex(
        ({ memberName }) => memberName === member.name
      );

      if (existing >= 0) {
        // 上書き
        rolls[existing] = { memberName: member.name, ...roll, log };
      } else {
        rolls.push({ memberName: member.name, ...roll, log });
      }

      setRolls([...rolls]);
    },
    [rolls, setRolls]
  );

  const [memberDialogShown, setMemberDialogShown] = useState(false);

  const handleCloseMemberDialog = useCallback(() => {
    window.localStorage.setItem("members", JSON.stringify(members));
    setMemberDialogShown(false);
  }, [setMemberDialogShown, members]);

  useEffect(() => {
    const saved = JSON.parse(window.localStorage.getItem("members"));
    if (saved) {
      setMembers(saved);
    }
  }, []);

  useEffect(() => {
    setDialogShown(member.name !== undefined);
  }, [member]);

  return (
    <Container maxWidth="xl">
      <Box textAlign="right" marginBottom={1}>
        <Button
          variant="text"
          color="inherit"
          onClick={() => setMemberDialogShown(true)}
        >
          参加者
        </Button>
        <Button variant="text" color="inherit">
          設定
        </Button>
        <MemberDialog
          open={memberDialogShown}
          onClose={handleCloseMemberDialog}
          members={members}
          setMembers={setMembers}
        />
      </Box>
      <Box
        display="grid"
        gap={1}
        sx={{
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
            xl: "repeat(5, 1fr)",
          },
        }}
      >
        {members
          .filter(({ isDealer }) => isDealer)
          .map((member) => (
            <Member
              key={member.name}
              member={member}
              roll={rolls.find(({ memberName }) => memberName === member.name)}
              onClick={() => setMember(member)}
            />
          ))}
        {members
          .filter(({ isDealer }) => !isDealer)
          .map((member) => (
            <Member
              key={member.name}
              member={member}
              roll={rolls.find(({ memberName }) => memberName === member.name)}
              onClick={() => setMember(member)}
            />
          ))}
      </Box>
      <Box textAlign="center" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ fontSize: 32, px: 7 }}
        >
          精算！
        </Button>
      </Box>
      <RollDialog
        member={member}
        open={dialogShown}
        onClose={() => setDialogShown(false)}
        onTurnEnd={handleTurnEnd}
        TransitionProps={{ onExited: () => setMember({}) }}
      />
    </Container>
  );
}

export default App;
