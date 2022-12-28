import { Button, Container, Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import Member from "./Member";
import RollDialog from "./RollDialog";
import MemberDialog from "./MemberDialog";
import ConfigDialog from "./ConfigDialog";
import compareHands from "./compareHands";

function Board() {
  const [members, setMembers] = useState([
    { name: "まっち", point: 10000, isDealer: true },
    { name: "まちこ", point: 10000 },
  ]);
  const [config, setConfig] = useState({
    initialPoint: 10000,
    betPoint: 1000,
  });

  //
  const [member, setMember] = useState({});
  const [dialogShown, setDialogShown] = useState(false);
  const [rolls, setRolls] = useState([]);

  //
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
  const [configDialogShown, setConfigDialogShown] = useState(false);

  const handleCloseMemberDialog = useCallback(() => {
    setMemberDialogShown(false);
  }, [setMemberDialogShown]);

  const handleCloseConfigDialog = useCallback(() => {
    setConfigDialogShown(false);
  }, [setConfigDialogShown]);

  const handleSaveMembers = useCallback(
    (newMembers) => {
      setMembers(newMembers);
      window.localStorage.setItem("members", JSON.stringify(newMembers));
    },
    [setMembers]
  );
  const handleSaveConfig = useCallback(
    (newConfig) => {
      setConfig(newConfig);
      window.localStorage.setItem("config", JSON.stringify(newConfig));
    },
    [setConfig]
  );

  useEffect(() => {
    const savedMembers = JSON.parse(window.localStorage.getItem("members"));
    if (savedMembers) {
      setMembers(savedMembers);
    }

    const savedConfig = JSON.parse(window.localStorage.getItem("config"));
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, []);

  useEffect(() => {
    setDialogShown(member.name !== undefined);
  }, [member]);

  const dealerName = members.find(({ isDealer }) => isDealer)?.name;
  const dealerRoll = rolls.find(({ memberName }) => memberName === dealerName);
  const dealerRolled = Boolean(dealerRoll);

  const handleFinishGame = useCallback(() => {
    const refunded = rolls.map((roll) => {
      if (roll.memberName === dealerName) {
        return roll;
      }

      roll.refundMulti = compareHands(dealerRoll, roll);

      return roll;
    });

    setRolls([...refunded]);
  }, [dealerName, dealerRoll, rolls]);

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
        <Button
          variant="text"
          color="inherit"
          onClick={() => setConfigDialogShown(true)}
        >
          設定
        </Button>
        <MemberDialog
          open={memberDialogShown}
          onClose={handleCloseMemberDialog}
          members={members}
          setMembers={handleSaveMembers}
          config={config}
        />
        <ConfigDialog
          open={configDialogShown}
          onClose={handleCloseConfigDialog}
          config={config}
          setConfig={handleSaveConfig}
          members={members}
          setMembers={handleSaveMembers}
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
              config={config}
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
              config={config}
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
          disabled={!dealerRolled}
          onClick={handleFinishGame}
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

export default Board;
