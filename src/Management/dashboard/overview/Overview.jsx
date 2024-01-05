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
import StatBox from "./components/StatBox";
import ProgressCircle from "./components/ProgressCircle";
import dashboardService from "../../../services/dashboard.service";
import addonService from "../../../services/addon.service";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Accessibility, ConfirmationNumber } from "@mui/icons-material";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import ReactDatePicker from "react-datepicker";
import PercentChart from "./components/PercentChart";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Overview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [consultingData, setConsultingData] = useState(null);
  const [elearningData, setElearningData] = useState(null);
  const [workshopData, setWorkshopData] = useState(null);
  const [trainingData, setTrainingData] = useState(null);
  const [transactionsWorkshop, setTransactionsWorkshop] = useState([]);
  const [transactionsOnlineCourse, setTransactionsOnlineCourse] = useState([]);
  const [campaign, setCampaign] = useState(null);
  const [transactionsTrainingCourse, setTransactionsTrainingCourse] = useState(
    []
  );

  // date pikcer
  const [valueYearSelectAndMonth, setValueYearAndMonth] = useState(new Date());

  // revenue and registration
  const [valueSelectedByYear, setSelectedByYear] = useState("onlineCourse");

  // revenue and registration
  const [valueSelectedByMonth, setSelectedByMonth] = useState("onlineCourse");

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
      // console.log(res.data);
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
      setElearningData(res.data);
    } catch (error) {
      toast.error("An error has occured!");
    }
  };
  const fetchWorkshopOverviewData = async () => {
    try {
      let res = await dashboardService.GetWorkshopClassOverview();
      setWorkshopData(res.data);
    } catch (error) {
      toast.error("An error has occured!");
    }
  };

  const fetchTrainingCourseOverviewData = async () => {
    try {
      let res = await dashboardService.GetTrainingCourseOverview();
      setTrainingData(res.data);
    } catch (error) {
      toast.error("An error has occured!");
    }
  };

  // ******************************* Online Course*****************************************
  // top revenue online course
  const [topRevenueOnlineCourse, setTopRevenueOnlineCourse] = useState(null);
  const fetchTopRevenueCourseOverviewData = async () => {
    try {
      let params = {
        year: valueYearSelectAndMonth.getFullYear(),
      };
      let res = await dashboardService.TopRevenueCourseServicesData(params);
      setTopRevenueOnlineCourse(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // top revenue registration course
  const [topRegistration, setTopRegistration] = useState(null);

  const fetchTopRegistrationCourseOverviewData = async () => {
    try {
      let params = {
        year: valueYearSelectAndMonth.getFullYear(),
      };
      let res = await dashboardService.TopRegistrationCourseServicesData(
        params
      );
      setTopRegistration(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // ********************************Workshop**************************************
  // top revenue Workshop
  const [topRevenueWorkshop, setTopRevenueWorkshop] = useState(null);

  const fetchTopRevenueWorkshopOverviewData = async () => {
    try {
      let params = {
        year: valueYearSelectAndMonth.getFullYear(),
      };
      let res = await dashboardService.TopRevenueWorkshopServicesData(params);
      setTopRevenueWorkshop(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // top revenue registration workshop
  const [topRegistrationWorkshop, setTopRegistrationWorkshop] = useState(null);

  const fetchTopRegistrationWorkshopOverviewData = async () => {
    try {
      let params = {
        year: valueYearSelectAndMonth.getFullYear(),
      };
      let res = await dashboardService.TopRegistrationWorkshopServicesData(
        params
      );
      setTopRegistrationWorkshop(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // ********************************Training Course*************************************
  // top revenue Training Course
  const [topRevenueTrainingCourse, setTopRevenueTrainingCourse] =
    useState(null);

  const fetchTopRevenueTrainingCourseOverviewData = async () => {
    try {
      let params = {
        year: valueYearSelectAndMonth.getFullYear(),
      };
      let res = await dashboardService.TopRevenueTrainingCourseServicesData(
        params
      );
      setTopRevenueTrainingCourse(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // top revenue registration Training Course
  const [topRegistrationTrainingCourse, setTopRegistrationTrainingCourse] =
    useState(null);

  const fetchTopRegistrationTrainingCourseOverviewData = async () => {
    try {
      let params = {
        year: valueYearSelectAndMonth.getFullYear(),
      };
      let res =
        await dashboardService.TopRegistrationTrainingCourseServicesData(
          params
        );
      setTopRegistrationTrainingCourse(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // *********************************** consulting ***************************************
  // get-ticket-ratio-onl-off-by-year
  const [ticketRatioOnOffByYear, setTicketRatioOnOffByYear] = useState(null);

  const fetchTicketRatioOnOffByYearData = async () => {
    try {
      let params = {
        year: valueYearSelectAndMonth.getFullYear(),
      };
      console.log("dmdata nhu lol", params);
      let res = await dashboardService.TicketRatioOnOffByYear(params);
      setTicketRatioOnOffByYear(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // ************************************ get by month *************************************
  // ******************************* Online Course by month*****************************************
  // top revenue online course
  const [topRevenueOnlineCourseByMonth, setTopRevenueOnlineCourseByMonth] =
    useState(null);
  const fetchTopRevenueCourseOverviewDataByMonth = async () => {
    try {
      let params = {
        month: valueYearSelectAndMonth.getMonth() + 1,
        year: valueYearSelectAndMonth.getFullYear(),
      };
      let res = await dashboardService.TopRevenueCourseServicesDataByMonth(
        params
      );
      setTopRevenueOnlineCourseByMonth(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // top revenue registration online course
  const [topRegistrationByMonth, setTopRegistrationByMonth] = useState(null);

  const fetchTopRegistrationCourseOverviewDataByMonth = async () => {
    try {
      let params = {
        month: valueYearSelectAndMonth.getMonth() + 1,
        year: valueYearSelectAndMonth.getFullYear(),
      };
      let res = await dashboardService.TopRegistrationCourseServicesDataByMonth(
        params
      );
      setTopRegistrationByMonth(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // ******************************** Workshop by month *************************************************
  // top revenue workshop
  const [topRevenueWorkshopByMonth, setTopRevenueWorkshopByMonth] =
    useState(null);

  const fetchTopRevenueWorkshopOverviewDataByMonth = async () => {
    try {
      let params = {
        month: valueYearSelectAndMonth.getMonth() + 1,
        year: valueYearSelectAndMonth.getFullYear(),
      };
      let res = await dashboardService.TopRevenueWorkshopServicesDataByMonth(
        params
      );
      setTopRevenueWorkshopByMonth(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // top revenue registration workshop
  const [topRegistrationWorkshopByMonth, setTopRegistrationWorkshopByMonth] =
    useState(null);

  const fetchTopRegistrationWorkshopOverviewDataByMonth = async () => {
    try {
      let params = {
        month: valueYearSelectAndMonth.getMonth() + 1,
        year: valueYearSelectAndMonth.getFullYear(),
      };
      let res =
        await dashboardService.TopRegistrationWorkshopServicesDataByMonth(
          params
        );
      setTopRegistrationWorkshopByMonth(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // ******************************** training courses by month *************************************************

  // top revenue Training Course
  const [topRevenueTrainingCourseByMonth, setTopRevenueTrainingCourseByMonth] =
    useState(null);

  const fetchTopRevenueTrainingCourseOverviewDataByMonth = async () => {
    try {
      let params = {
        month: valueYearSelectAndMonth.getMonth() + 1,
        year: valueYearSelectAndMonth.getFullYear(),
      };
      let res =
        await dashboardService.TopRevenueTrainingCourseServicesDataByMonth(
          params
        );
      setTopRevenueTrainingCourseByMonth(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // top revenue registration Training Course
  const [
    topRegistrationTrainingCourseByMonth,
    setTopRegistrationTrainingCourseByMonth,
  ] = useState(null);

  const fetchTopRegistrationTrainingCourseOverviewDataByMonth = async () => {
    try {
      let params = {
        month: valueYearSelectAndMonth.getMonth() + 1,
        year: valueYearSelectAndMonth.getFullYear(),
      };
      let res =
        await dashboardService.TopRegistrationTrainingCourseServicesDataByMonth(
          params
        );
      setTopRegistrationTrainingCourseByMonth(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // *********************************** consulting ***************************************
  // get-ticket-ratio-onl-off-by-year
  const [ticketRatioOnOffByMonth, setTicketRatioOnOffByMonth] = useState(null);

  const fetchTicketRatioOnOffByMonthData = async () => {
    try {
      let params = {
        month: valueYearSelectAndMonth.getMonth() + 1,
      };
      console.log("dmdata nhu lol", params);
      let res = await dashboardService.TicketRatioOnOffByMonth(params);
      setTicketRatioOnOffByMonth(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
    }
  };

  // get-ticket-ratio-onl-off-by-year
  const [getTopTrainer, setTopTrainer] = useState(null);

  const fetchTopTrainer = async () => {
    try {
      let params = {
        month: valueYearSelectAndMonth.getMonth() + 1,
        year: valueYearSelectAndMonth.getFullYear(),
      };
      let res = await dashboardService.TopTrainer(params);
      setTopTrainer(res.data);
    } catch (error) {
      // toast.error("An error has occured!");
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
    fetchConsultingTicketOverviewData();
    fetchOnlineCourseOverviewData();
    fetchWorkshopOverviewData();
    fetchTrainingCourseOverviewData();

    // ******** get by year ****************
    // top revenue and registration online course
    fetchTopRevenueCourseOverviewData();
    fetchTopRegistrationCourseOverviewData();
    // top revenue and registration workshop
    fetchTopRevenueWorkshopOverviewData();
    fetchTopRegistrationWorkshopOverviewData();
    // top revenue and registration training course
    fetchTopRevenueTrainingCourseOverviewData();
    fetchTopRegistrationTrainingCourseOverviewData();
    // ticket ratio on off
    fetchTicketRatioOnOffByYearData();
    // ********* get by month number ********************************
    fetchTopRevenueCourseOverviewDataByMonth();
    fetchTopRegistrationCourseOverviewDataByMonth();
    fetchTopRevenueWorkshopOverviewDataByMonth();
    fetchTopRegistrationWorkshopOverviewDataByMonth();
    fetchTopRevenueTrainingCourseOverviewDataByMonth();
    fetchTopRegistrationTrainingCourseOverviewDataByMonth();
    fetchTicketRatioOnOffByMonthData();

    fetchTopTrainer();

    fetchTransactionData(type[1]);
    fetchTransactionData(type[2]);
    fetchTransactionData(type[3]);
    fetchTransactionData(type[4]);

    const intervalId = setInterval(() => {
      fetchConsultingTicketOverviewData();
      fetchOnlineCourseOverviewData();
      fetchWorkshopOverviewData();
      fetchTrainingCourseOverviewData();
      fetchTransactionData(type[1]);
      fetchTransactionData(type[2]);
      fetchTransactionData(type[3]);
      fetchTransactionData(type[4]);
    }, 1000 * 3 * 60);
    fetchCampaign();
    return () => intervalId;
  }, [valueYearSelectAndMonth]);

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
        {/* Consulting Ticket */}
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
              title="Consulting Ticket"
              unhandled={`${consultingData?.unhandledTicket} ticket(s)`}
              handled={`${consultingData?.approvedTicket} ticket(s)`}
            />
          ) : (
            <>
              <CircularProgress />
            </>
          )}
        </Box>
        {/* E-learning Attempt */}
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
              title="Online courses"
              subtitle={`${elearningData.totalAttempts} total attempt(s) `}
              completedOnline={`${elearningData.completedAttempts} attempt(s)`}
              activeCourse={`${elearningData.activeCourseAmount} course(s)`}
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
        {/* Workshop Enrolled */}
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
              title="Workshop"
              subtitle={`${workshopData.enrolledAmount} enrolled`}
              handled={`${workshopData.onGoingClassAmount} class(es)`}
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
        {/* Training Attempts */}
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
          {/* trainingData */}
          <StatBox
            title="Training Courses"
            subtitle={`${trainingData?.clientAmount} client(s)`}
            onGoingCourse={`${trainingData?.onGoingCourseAmount} course(s)`}
            unhandledCourse={`${trainingData?.unhandledAttempts} attempt(s)`}
            icon={
              <Accessibility
                sx={{ color: colors.grey[100], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>

      {/* dashboard */}
      {/* YEAR select to render */}
      <Grid
        item
        xs={3}
        sx={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          style={{
            fontWeight: 600,
            fontSize: "1.2rem",
            marginRight: 10,
          }}
        >
          Select year:
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            // minDate={dayjs(new Date())}
            label="Year"
            views={["year"]}
            value={dayjs(valueYearSelectAndMonth)}
            defaultValue={dayjs(valueYearSelectAndMonth)}
            onChange={(value) => {
              setValueYearAndMonth(new Date(value));
            }}
          />
        </LocalizationProvider>
      </Grid>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {/* THIS year over view LINE CHART */}
        {/* line chart */}
        <Box
          width="49%"
          marginRight="35px"
          marginTop="20px"
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            boxShadow:
              "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            marginTop: "25px",
          }}
        >
          <Box
            p="0 20px 20px 10px"
            display="flex "
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box width="100%">
              <LineChart getYearPickerLineChart={valueYearSelectAndMonth} />
            </Box>
          </Box>
        </Box>

        {/* pie chart */}
        <Box
          width="45%"
          marginTop="20px"
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            boxShadow:
              "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            marginTop: "25px",
          }}
        >
          <Box
            p="0 20px 20px 10px"
            display="flex "
            justifyContent="center"
            alignItems="center"
          >
            <Box width="70%">
              <PieChart getYearPickerPieChart={valueYearSelectAndMonth} />
            </Box>
          </Box>
        </Box>
      </div>

      {/* Top 5 */}
      {/* top by year */}
      <div style={{ marginTop: 15 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 600, marginRight: 10 }}>
            Top revenue by year:
          </div>
          <select
            style={{ width: "150px", height: "50px", borderRadius: "10px" }}
            defaultValue={valueSelectedByYear}
            onChange={(val) => {
              setSelectedByYear(val.target.value);
            }}
          >
            <option value="onlineCourse">Online Course</option>
            <option value="Consulting">Consulting</option>
            <option value="Workshop">Workshop</option>
            <option value="Training">Training Course</option>
          </select>
        </div>
        {valueSelectedByYear === "onlineCourse" && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* top 5 revenue */}
            <Box
              width="50%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%">
                  <BarChart getData={topRevenueOnlineCourse} />
                </Box>
              </Box>
            </Box>

            <Box
              width="50%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%">
                  <BarChart getData={topRegistration} />
                </Box>
              </Box>
            </Box>
          </div>
        )}
        {valueSelectedByYear === "Consulting" && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              width="100%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                width="100%"
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%">
                  <PercentChart data={ticketRatioOnOffByYear} />
                </Box>
              </Box>
            </Box>
          </div>
        )}
        {valueSelectedByYear === "Workshop" && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* top 5 revenue */}
            <Box
              width="50%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%">
                  <BarChart getData={topRevenueWorkshop} />
                </Box>
              </Box>
            </Box>
            {/* top 5 registration */}
            <Box
              width="50%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%">
                  <BarChart getData={topRegistrationWorkshop} />
                </Box>
              </Box>
            </Box>
          </div>
        )}
        {valueSelectedByYear === "Training" && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* top 5 revenue */}
            <Box
              width="50%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%">
                  <BarChart getData={topRevenueTrainingCourse} />
                </Box>
              </Box>
            </Box>
            {/* top resgistratiopn */}
            <Box
              width="50%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%">
                  <BarChart getData={topRegistrationTrainingCourse} />
                </Box>
              </Box>
            </Box>
          </div>
        )}
      </div>

      {/* top by month */}
      <div style={{ marginTop: 35 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 600, marginRight: 10 }}>
            Top revenue by month:
          </div>
          <select
            style={{ width: "150px", height: "50px", borderRadius: "10px" }}
            defaultValue={valueSelectedByMonth}
            onChange={(val) => {
              setSelectedByMonth(val.target.value);
            }}
          >
            <option value="onlineCourse">Online Course</option>
            <option value="Consulting">Consulting</option>
            <option value="Workshop">Workshop</option>
            <option value="Training">Training Course</option>
          </select>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginLeft: 10,
            }}
          >
            <Typography
              style={{
                fontWeight: 600,
                fontSize: "16px",
                marginRight: 10,
              }}
            >
              Select month:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Month"
                views={["month"]}
                value={dayjs(valueYearSelectAndMonth)}
                defaultValue={dayjs(valueYearSelectAndMonth)}
                onChange={(value) => {
                  setValueYearAndMonth(new Date(value));
                }}
              />
            </LocalizationProvider>
          </Grid>
        </div>
        {valueSelectedByMonth === "onlineCourse" && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              width="50%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%">
                  <BarChart getData={topRevenueOnlineCourseByMonth} />
                </Box>
              </Box>
            </Box>

            <Box
              width="50%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%">
                  <BarChart getData={topRegistrationByMonth} />
                </Box>
              </Box>
            </Box>
          </div>
        )}
        {valueSelectedByMonth === "Consulting" && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              width="100%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                width="100"
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%" sx={{ backgroundColor: "#f2f0f0" }}>
                  <PercentChart data={ticketRatioOnOffByMonth} />
                </Box>
              </Box>
            </Box>
          </div>
        )}
        {valueSelectedByMonth === "Workshop" && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              width="50%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%">
                  <BarChart getData={topRevenueWorkshopByMonth} />
                </Box>
              </Box>
            </Box>
            <Box
              width="50%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%">
                  <BarChart getData={topRegistrationWorkshopByMonth} />
                </Box>
              </Box>
            </Box>
          </div>
        )}
        {valueSelectedByMonth === "Training" && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              width="50%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%">
                  <BarChart getData={topRevenueTrainingCourseByMonth} />
                </Box>
              </Box>
            </Box>
            <Box
              width="50%"
              marginRight="35px"
              marginTop="20px"
              gridColumn="span 8"
              gridRow="span 2"
              sx={{
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginTop: "25px",
              }}
            >
              <Box
                p="0 20px 20px 10px"
                display="flex "
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box width="100%">
                  <BarChart getData={topRegistrationTrainingCourseByMonth} />
                </Box>
              </Box>
            </Box>
          </div>
        )}
        <div
          style={{
            marginTop: 25,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{ fontSize: "20px", fontWeight: 600, marginRight: "10px" }}
          >
            Top 5 hardworking trainer
          </div>
          <Box
            width="100%"
            marginRight="35px"
            marginTop="20px"
            gridColumn="span 8"
            gridRow="span 2"
            sx={{
              cursor: "pointer",
              borderRadius: "10px",
              boxShadow:
                "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
              marginTop: "25px",
            }}
          >
            <Box
              width="100"
              p="0 20px 20px 10px"
              display="flex "
              justifyContent="flex-start"
              alignItems="center"
            >
              <Box width="100%" sx={{ backgroundColor: "#f2f0f0" }}>
                <GeographyChart valueGet={getTopTrainer} />
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default Overview;
