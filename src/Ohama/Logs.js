import { List, ListItem, ListItemText } from "@mui/material";

function Logs({ logs }) {
  return (
    <List>
      {logs.map((log, idx) => (
        <ListItem key={idx}>
          <ListItemText
            primaryTypographyProps={{ textAlign: "center" }}
            secondaryTypographyProps={{ textAlign: "center" }}
            primary={log.name}
            secondary={log.dice}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default Logs;
