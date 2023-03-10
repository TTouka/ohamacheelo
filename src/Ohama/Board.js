import { Button, Container, Box } from "@mui/material";
import { useEffect, useState } from "react";

import Member from "./Member";
import RollDialog from "./RollDialog";
import MemberDialog from "./MemberDialog";
import ConfigDialog from "./ConfigDialog";
import { useMembers } from "./Store/useMembers";
import { useConfig } from "./Store/useConfig";
import { useGame } from "./Store/useGame";
import XlButton from "./XlButton";

function Board() {
  const { members, dealer, applyWon } = useMembers();
  const { config } = useConfig();
  const {
    rolls,
    closeGame,
    openNewGame,
    game: { isOpen: isGameOpen },
  } = useGame();

  //
  const [rollingMember, setRollingMember] = useState({});

  //
  const [rollDialogShown, setRollDialogShown] = useState(false);
  const [memberDialogShown, setMemberDialogShown] = useState(false);
  const [configDialogShown, setConfigDialogShown] = useState(false);
  useEffect(() => {
    setRollDialogShown(rollingMember.name !== undefined);
  }, [rollingMember]);

  //
  const dealerName = dealer?.name;
  const dealerRoll = rolls.find(({ memberName }) => memberName === dealerName);

  return (
    <Container maxWidth="xl">
      <Box textAlign="right" marginBottom={1} position="sticky" top={0} zIndex={20}>
        <Button
          variant="text"
          color="inherit"
          href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQJ_BqmPGmMc6R9VirLqKB8CIrLNkmX4gzSQioqej9Vy5osVn11qE8ie5ExX03XJh5f3dGwwuPwTdRz/pubhtml?gid=0&single=true"
          target="_blank"
        >
          勝敗と倍率
        </Button>
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
          onClose={() => setMemberDialogShown(false)}
          config={config}
        />
        <ConfigDialog
          open={configDialogShown}
          onClose={() => setConfigDialogShown(false)}
        />
      </Box>
      <Box
        display="grid"
        overflow="auto"
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
        {dealer && (
          <Member
            member={dealer}
            onClick={() => setRollingMember(dealer)}
            disabled={!isGameOpen}
          />
        )}
        {members
          .filter(({ isDealer }) => !isDealer)
          .map((member) => (
            <Member
              key={member.name}
              member={member}
              onClick={() => setRollingMember(member)}
              disabled={!isGameOpen}
            />
          ))}
      </Box>
      <Box textAlign="center" sx={{ py: 2 }} position="sticky" bottom={0} zIndex={20}>
        {isGameOpen && (
          <XlButton
            variant="contained"
            color="primary"
            disabled={!Boolean(dealerRoll)}
            onClick={() => closeGame(dealerName, applyWon)}
          >
            精算！
          </XlButton>
        )}
        {!isGameOpen && (
          <XlButton variant="contained" color="primary" onClick={openNewGame}>
            次のゲームを始める
          </XlButton>
        )}
        <RollDialog
          member={rollingMember}
          open={rollDialogShown}
          onClose={() => setRollDialogShown(false)}
          TransitionProps={{ onExited: () => setRollingMember({}) }}
        />
      </Box>
    </Container>
  );
}

export default Board;
