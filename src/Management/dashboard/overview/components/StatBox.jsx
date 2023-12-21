import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Typography
        flexWrap={1}
        fontSize={18}
        sx={{ color: colors.grey[100] }}
        fontWeight="bold"
      >
        {subtitle}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {icon}
          <Typography
            marginLeft="10px"
            flexWrap={1}
            fontSize={20}
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

      <Box
        display="flex"
        justifyContent="space-between"
        mt="2px"
        alignItems={"flex-start"}
      >
        <Typography
          marginTop={2}
          flexWrap={1}
          fontSize={16}
          sx={{ color: colors.grey[200] }}
        >
          <span
            style={{
              flexWrap: 1,
              fontSize: 16,
              color: colors.grey[100],
              fontWeight: 700,
              marginRight: 10,
            }}
          >
            Status:{" "}
          </span>
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
