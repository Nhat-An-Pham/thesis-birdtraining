import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({
  title,
  subtitle,
  icon,
  progress,
  unhandled,
  handled,
  unhandledCourse,
  onGoingCourse,
  completedOnline,
  activeCourse,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" height="100%">
      <Typography
        flexWrap={1}
        fontSize={22}
        sx={{ color: colors.grey[100] }}
        fontWeight="700"
      >
        {title}
      </Typography>
      {/* icon and subtitle */}
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <span style={{ marginLeft: 10, marginTop: "3px" }}>{icon}</span>
          <Typography
            marginLeft="10px"
            flexWrap={1}
            fontSize={20}
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {subtitle}
          </Typography>
        </Box>
        {progress && (
          <Box>
            <ProgressCircle progress={progress} />
          </Box>
        )}
      </Box>

      <Box display="flex" alignItems={"flex-start"} flexDirection={"column"}>
        {/* consulting and workshop */}
        {handled && (
          <Typography
            marginTop={2}
            flexWrap={1}
            fontSize={16}
            sx={{ color: colors.grey[200] }}
          >
            <span
              style={{
                marginLeft: 10,
                flexWrap: 1,
                fontSize: 16,
                color: colors.grey[200],
                fontWeight: 700,
                marginRight: 10,
              }}
            >
              On-going:
            </span>
            {handled}
          </Typography>
        )}
        {unhandled && (
          <Typography
            marginTop={2}
            flexWrap={1}
            fontSize={16}
            sx={{ color: colors.grey[200] }}
          >
            <span
              style={{
                flexWrap: 1,
                marginLeft: 10,
                fontSize: 16,
                color: colors.grey[200],
                fontWeight: 700,
                marginRight: 10,
              }}
            >
              Un-handled:
            </span>
            {unhandled}
          </Typography>
        )}
        {/* online course */}
        {completedOnline && (
          <Typography
            marginTop={1}
            flexWrap={1}
            fontSize={16}
            sx={{ color: colors.grey[200] }}
          >
            <span
              style={{
                marginLeft: 10,
                flexWrap: 1,
                fontSize: 16,
                color: colors.grey[200],
                fontWeight: 700,
                marginRight: 10,
              }}
            >
              Completed:
            </span>
            {completedOnline}
          </Typography>
        )}
         {activeCourse && (
          <Typography
            flexWrap={1}
            fontSize={16}
            sx={{ color: colors.grey[200] }}
          >
            <span
              style={{
                marginLeft: 10,
                flexWrap: 1,
                fontSize: 16,
                color: colors.grey[200],
                fontWeight: 700,
                marginRight: 10,
              }}
            >
              Active:
            </span>
            {activeCourse}
          </Typography>
        )}
        {/* training coures props */}
        {onGoingCourse && (
          <Typography
            marginLeft={1}
            marginTop={1}
            flexWrap={1}
            fontSize={16}
            sx={{ color: colors.grey[200] }}
          >
            <span
              style={{
                marginLeft: 10,
                flexWrap: 1,
                fontSize: 16,
                color: colors.grey[200],
                fontWeight: 700,
                marginRight: 10,
              }}
            >
              On-going:
            </span>
            {onGoingCourse}
          </Typography>
        )}
        {unhandledCourse && (
          <Typography
            marginLeft={1}
            flexWrap={1}
            fontSize={16}
            sx={{ color: colors.grey[200] }}
          >
            <span
              style={{
                flexWrap: 1,
                marginLeft: 10,
                fontSize: 16,
                color: colors.grey[200],
                fontWeight: 700,
                marginRight: 10,
              }}
            >
              Un-handled:
            </span>
            {unhandledCourse}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default StatBox;
