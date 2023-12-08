import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-around" mt="2px">
        <Typography fontSize={22} sx={{ color: colors.grey[100] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="bold"
          sx={{ color: colors.grey[100] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
