import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);
    console.error(errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box padding={1}>
          <Typography variant="h2">エラーが発生しました。</Typography>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h3">対処法</Typography>
            <Typography variant="h4">ブラウザをリロードする</Typography>
            <Typography variant="body">
              メンバーリストと設定を再読み込みします。
              <br />
              入力したベット額やダイス目は失われます。
            </Typography>
            <Typography variant="h4">設定を削除する</Typography>
            <Typography variant="body">
              メンバーリストと設定をリセットします。
              <br />
              全ての情報が失われます。
              <br />
              <ResetButton />
            </Typography>
          </Paper>
          <Paper sx={{ padding: 2, mt: 1 }}>
            <Typography variant="h3">作者に問題を伝える</Typography>
            <Typography variant="body">
              以下の内容を作者までお伝えください。
            </Typography>
            <Paper
              sx={{ padding: 2, mt: 1 }}
              contenteditable="true"
              onCut={(ev) => ev.preventDefault()}
              onPaste={(ev) => ev.preventDefault()}
              onKeyDown={(ev) => !ev.metaKey && ev.preventDefault()}
            >
              <Typography variant="h4">{this.state.error?.message}</Typography>
              <Typography variant="body" sx={{ whiteSpace: "pre-line" }}>
                {this.state.errorInfo?.componentStack}
              </Typography>
              <Typography variant="h4">members</Typography>
              <Typography variant="body" sx={{ whiteSpace: "pre-line" }}>
                {window.localStorage.getItem("members")}
              </Typography>
              <Typography variant="h4">config</Typography>
              <Typography variant="body" sx={{ whiteSpace: "pre-line" }}>
                {window.localStorage.getItem("config")}
              </Typography>
            </Paper>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

function ResetButton() {
  const handle = () => {
    localStorage.clear();
  };

  return (
    <Button variant="contained" color="error" onClick={handle}>
      初期化する
    </Button>
  );
}
