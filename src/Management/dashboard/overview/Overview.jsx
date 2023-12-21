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
  const [transactionsWorkshop, setTransactionsWorkshop] = useState([]);
  const [transactionsOnlineCourse, setTransactionsOnlineCourse] = useState([]);
  const [campaign, setCampaign] = useState(null);
  const [transactionsTrainingCourse, setTransactionsTrainingCourse] = useState(
    []
  );
  // const [transactionsConsultant, setTransactionsConsultant] = useState([]);

  const type = [
    "Others",
    "AdviceConsulting",
    "WorkshopClass",
    "OnlineCourse",
    "TrainingCourse",
    "Topup",
  ];
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
  const fetchCampaign = async () => {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let year = dateObj.getUTCFullYear();
    try {
      let res = await dashboardService.GetCampaignRevenue(month, year);
      setCampaign(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTransactionData = async (typeQuery) => {
    try {
      let params = {
        $orderby: `dateTime desc`,
        type: typeQuery,
      };
      let res = await dashboardService.GetTransactions(params);
      // console.log(res.data);
      if (typeQuery === type[0]) {
      } else if (typeQuery === type[1]) {
        // setTransactionsConsultant(res.data);
      } else if (typeQuery === type[2]) {
        setTransactionsWorkshop(res.data);
      } else if (typeQuery === type[3]) {
        setTransactionsOnlineCourse(res.data);
      } else if (typeQuery === type[4]) {
        setTransactionsTrainingCourse(res.data);
      } else {
      }
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
  const navTo = (route) => {
    navigate(`/management/${route}`);
  };
  // useEffect(() => {
  //   fetchConsultingTicketOverviewData();
  //   fetchOnlineCourseOverviewData();
  //   fetchWorkshopOverviewData();
  //   fetchTransactionData(type[1]);
  //   fetchTransactionData(type[2]);
  //   fetchTransactionData(type[3]);
  //   fetchTransactionData(type[4]);
  // }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchConsultingTicketOverviewData();
      fetchOnlineCourseOverviewData();
      fetchWorkshopOverviewData();
      fetchTransactionData(type[1]);
      fetchTransactionData(type[2]);
      fetchTransactionData(type[3]);
      fetchTransactionData(type[4]);
    }, 1000 * 3);
    fetchCampaign();
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
        gap="30px"
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
            borderRadius: "10px",
            boxShadow:
              "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            padding: "10px 0",
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
            borderRadius: "10px",
            boxShadow:
              "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            padding: "10px 0",
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
            borderRadius: "10px",
            boxShadow:
              "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            padding: "10px 0",
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
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            boxShadow:
              "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            padding: "10px 0",
          }}
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
        {/* LAST year over view LINE CHART */}
        <Box
          marginTop="20px"
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            boxShadow:
              "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Box
            mt="15px"
            p="0 0 0 30px"
            display="flex "
            // justifyContent="space-between"
            alignItems="center"
          >
            <Box marginTop="-20%">
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
            <Box width="525px" height="250px">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
        </Box>

        {/* THIS year over view LINE CHART */}
        <Box
          marginTop="20px"
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            boxShadow:
              "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Box
            mt="15px"
            p="0 0 0 30px"
            display="flex "
            // justifyContent="space-between"
            alignItems="center"
          >
            <Box marginTop="-20%">
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
            <Box width="525px" height="250px">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
        </Box>

        {/*Recent Transactions  */}

        {/* ROW 3 */}

        {/* <Box
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
        </Box> */}
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

      {/* bottom row */}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          backgroundColor={colors.primary[400]}
          overflow="auto"
          borderRadius={2}
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            boxShadow:
              "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            width: "48%",
            height: "300px",
            marginTop: "25px",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="10px 20px"
          >
            <Typography color={colors.grey[100]} fontSize={22} fontWeight="600">
              Recent Transactions (Online Course)
            </Typography>
          </Box>
          {transactionsOnlineCourse ? (
            transactionsOnlineCourse.map((transaction, i) => (
              <Box
                key={`${transaction.paymentcCode}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderTop={`1px solid ${colors.primary[500]}`}
                p="12px"
              >
                <Box>
                  <div
                    style={{
                      width: "250px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography
                      width="100%"
                      color={colors.greenAccent[500]}
                      fontSize={18}
                      fontWeight="600"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
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
                  VND {addonService.formatCurrency(transaction.cost)}
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

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            boxShadow:
              "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            padding: "15px 20px 5px 20px",
            width: "48%",
            height: "300px",
            marginTop: "25px",
          }}
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          {campaign ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle
                progress={campaign.percentRevenueFromLastMonth}
                size="125"
              />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "20px", fontSize: "1.3rem" }}
              >
                {addonService.formatCurrency(campaign.revenueInMonth)} VND
                revenue (this month)
              </Typography>
              <Typography>
                {addonService.formatCurrency(campaign.revenueInYear)} VND Total
                revenue in year
              </Typography>
            </Box>
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
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          borderRadius={2}
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            boxShadow:
              "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            width: "48%",
            height: "300px",
            marginTop: "25px",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="10px 20px"
          >
            <Typography color={colors.grey[100]} fontSize={22} fontWeight="600">
              Recent Transactions (Training Course)
            </Typography>
          </Box>
          {transactionsTrainingCourse ? (
            transactionsTrainingCourse.map((transaction, i) => (
              <Box
                key={`${transaction.paymentcCode}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderTop={`1px solid ${colors.primary[500]}`}
                p="12px"
              >
                <Box>
                  <div
                    style={{
                      width: "250px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography
                      width="100%"
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
                  VND {addonService.formatCurrency(transaction.cost)}
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

        <Box
          backgroundColor={colors.primary[400]}
          overflow="auto"
          borderRadius={2}
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            boxShadow:
              "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            width: "48%",
            height: "300px",
            marginTop: "25px",
          }}
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
              Recent Transactions (Workshop)
            </Typography>
          </Box>
          {transactionsWorkshop ? (
            transactionsWorkshop.map((transaction, i) => (
              <Box
                key={`${transaction.paymentcCode}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`1px solid ${colors.primary[500]}`}
                p="12px"
              >
                <Box>
                  <div
                    style={{
                      width: "250px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography
                      width="100%"
                      color={colors.greenAccent[500]}
                      fontSize={18}
                      fontWeight="600"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
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
                  VND {addonService.formatCurrency(transaction.cost)}
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
      </div>
    </Box>
  );
};

export default Overview;
