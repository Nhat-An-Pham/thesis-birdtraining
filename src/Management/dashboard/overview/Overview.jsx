import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "./components/theme";
import { mockTransactions } from "./data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "./components/Header";
import LineChart from "./components/LineChart";
import GeographyChart from "./components/GeographyChart";
import BarChart from "./components/BarChart";
import StatBox from "./components/StatBox";
import ProgressCircle from "./components/ProgressCircle";
import dashboardService from "../../../services/dashboard.service";
import addonService from "../../../services/addon.service";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Overview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [consultingData, setConsultingData] = useState(null);
  const [elearningData, setElearningData] = useState(null);
  const [workshopData, setWorkshopData] = useState(null);
  const [transactions, setTransactions] = useState(null);

  const navigate = useNavigate();

  const fetchConsultingTicketOverviewData = async () => {
    try {
      let res = await dashboardService.GetConsultingTicketOverview();
      // console.log(res.data);
      setConsultingData(res.data);
    } catch (error) {
      toast.error("An error has occured!");
    }
  };
  const fetchTransactionData = async () => {
    try {
      let params = {
        $orderby: `dateTime desc`,
      };
      let res = await dashboardService.GetTransactions(params);
      // console.log(res.data);
      setTransactions(res.data);
    } catch (error) {
      toast.error("An error has occured!");
    }
  };
  const fetchOnlineCourseOverviewData = async () => {
    try {
      let res = await dashboardService.GetOnlineCourseOverview();
      // console.log(res.data);
      setElearningData(res.data);
    } catch (error) {
      toast.error("An error has occured!");
    }
  };
  const fetchWorkshopOverviewData = async () => {
    try {
      let res = await dashboardService.GetWorkshopClassOverview();
      // console.log(res.data);
      setWorkshopData(res.data);
    } catch (error) {
      toast.error("An error has occured!");
    }
  };
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     fetchConsultingTicketOverviewData();
  //     fetchOnlineCourseOverviewData();
  //     fetchWorkshopOverviewData();
  //     fetchTransactionData();
  //   }, 1000 * 2); // in millisecondsfirst

  //   return () => intervalId;
  // }, []);
  const navTo = (route) => {
    navigate(`/management/${route}`);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchConsultingTicketOverviewData();
      fetchOnlineCourseOverviewData();
      fetchWorkshopOverviewData();
      fetchTransactionData();
    }, 1000 * 3);
    return () => intervalId;
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* *********************  ROW 1   *************************/}

        {/* Email Sent box */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => navTo("customerreq")}
          sx={{
            cursor: "pointer",
          }}
        >
          {consultingData ? (
            <StatBox
              title={`${consultingData.totalAmount} tickets`}
              subtitle="Consulting Ticket"
              progress={consultingData.handledRatio}
              increase={`${consultingData.unhandledTicket} Unchecked`}
              icon={
                <EmailIcon sx={{ color: colors.grey[100], fontSize: "26px" }} />
              }
            />
          ) : (
            <>
              <CircularProgress />
            </>
          )}
        </Box>

        {/* Sales Obtained box */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => navTo("onlinecourse")}
          sx={{
            cursor: "pointer",
          }}
        >
          {elearningData ? (
            <StatBox
              title={`${elearningData.totalAttempts} enrolled`}
              subtitle="E-learning Attempts"
              progress={elearningData.completeCourseRatio}
              increase={`${elearningData.customerCompleted} completed`}
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.grey[100], fontSize: "26px" }}
                />
              }
            />
          ) : (
            <CircularProgress />
          )}
        </Box>

        {/* New Clients boz */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => navTo("workshop")}
          sx={{
            cursor: "pointer",
          }}
        >
          {workshopData ? (
            <StatBox
              title={`${workshopData.workshopClass} classes`}
              subtitle="Workshop Enrolled"
              progress={`${workshopData.presentRatio}`}
              increase={`${workshopData.customerAttempts} enrolled`}
              icon={
                <PersonAddIcon
                  sx={{ color: colors.grey[100], fontSize: "26px" }}
                />
              }
            />
          ) : (
            <CircularProgress />
          )}
        </Box>

        {/* Traffic Received */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="0 courses"
            subtitle="Training Attempts"
            progress="1"
            increase="0"
            icon={
              <TrafficIcon sx={{ color: colors.grey[100], fontSize: "26px" }} />
            }
          />
        </Box>

        {/* **********************   ROW 2   *********************** */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="15px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                fontSize={20}
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography fontSize={28} fontWeight="bold" color={"#E3D026"}>
                $59,342.32
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-30px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/*Recent Transactions  */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          borderRadius={2}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`2px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="10px 20px"
          >
            <Typography color={colors.grey[100]} fontSize={22} fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {transactions ? (
            transactions.map((transaction, i) => (
              <Box
                key={`${transaction.paymentcCode}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`1px solid ${colors.primary[500]}`}
                p="12px"
              >
                <Box>
                  <div style={{ overflow: "hidden" }}>
                    <Typography
                      width={90}
                      color={colors.greenAccent[500]}
                      fontSize={18}
                      fontWeight="600"
                    >
                      {transaction.paymentCode}
                    </Typography>
                  </div>
                  <Typography color={colors.grey[100]}>
                    {transaction.email}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>
                  <Typography>
                    {addonService.formatDate(transaction.dateTime)}
                  </Typography>
                  <Typography>{transaction.type}</Typography>
                </Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  VND {transaction.cost}
                </Box>
              </Box>
            ))
          ) : (
            <Grid container>
              <Grid
                container
                item
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <CircularProgress />
              </Grid>
            </Grid>
          )}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle progress="0.75" size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>
              Modify: Success rate of passed birds in tranining course
            </Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Overview;
