import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useConfig } from "./Store/useConfig";
import { useMembers } from "./Store/useMembers";

function ConfigDialog({ open, onClose }) {
  const { members, saveMembers } = useMembers();
  const { config, saveConfig } = useConfig();

  const [tmpConfig, setTmpConfig] = useState({ ...config });
  useEffect(() => {
    setTmpConfig({ ...config });
  }, [setTmpConfig, config]);

  //
  const handleSaveConfig = useCallback(() => {
    saveConfig(tmpConfig);
    onClose();
  }, [saveConfig, onClose, tmpConfig]);

  //
  const handleChangeConfig = useCallback(
    (key) => (ev) => {
      setTmpConfig({
        ...tmpConfig,
        [key]: Number(ev.target.value),
      });
    },
    [setTmpConfig, tmpConfig]
  );

  //
  const handleEntering = useCallback(() => {
    setTmpConfig({ ...config });
  }, [setTmpConfig, config]);
  const handleClose = useCallback(
    (ev, reason) => {
      if (reason === "escapeKeyDown" || reason === "backdropClick") {
        onClose();

        return;
      }

      saveConfig(tmpConfig);
      onClose();
    },
    [saveConfig, onClose, tmpConfig]
  );

  //
  const handleResetPoint = useCallback(() => {
    saveMembers([
      ...members.map((member) => ({ ...member, point: config.initialPoint })),
    ]);
  }, [members, saveMembers, config]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      TransitionProps={{
        onEntering: handleEntering,
      }}
    >
      <DialogTitle>設定</DialogTitle>
      <DialogContent>
        <Box display="grid" gridTemplateColumns="1fr" gap={2} mt={2}>
          <Box>
            <TextField
              label="初期持ちマチー"
              fullWidth
              type="number"
              value={tmpConfig.initialPoint}
              onChange={handleChangeConfig("initialPoint")}
            />
          </Box>
          <Box>
            <TextField
              label="賭けマチー"
              fullWidth
              type="number"
              value={tmpConfig.betPoint}
              onChange={handleChangeConfig("betPoint")}
            />
          </Box>
          <Box textAlign="right">
            <Button color="primary" onClick={handleSaveConfig}>
              保存
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box display="grid" gridTemplateColumns="1fr" gap={2} mt={2}>
          <Box textAlign="left">
            <Button color="error" onClick={handleResetPoint}>
              全員のマチーをリセットする
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ConfigDialog;
