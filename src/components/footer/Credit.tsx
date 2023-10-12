import { Stack, StackProps, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import { CreditText } from "./CreditText";

export function Credit(props: StackProps) {
  return (
    <Stack direction="row" justifyContent="space-between" {...props}>
      <CreditText>
        Made with 💖 by{" "}
        <Link
          href="https://github.com/jordiyapz"
          target="_blank"
          color="inherit"
          rel="noopener"
        >
          Jordi Yaputra <GitHubIcon fontSize="inherit" color="action" />
        </Link>
      </CreditText>
      <CreditText>Version: {APP_VERSION}</CreditText>
    </Stack>
  );
}
