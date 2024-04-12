import { Typography, Box, useTheme} from "@mui/material";
import { tokens } from "../context/theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m={"0px 5px"}>
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
        >
          {title}
        </Typography>
    
    </Box>
  );
};

export default Header;
