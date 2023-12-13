import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkshopService from "../services/workshop.service";
import OnlinecourseService from "../services/onlinecourse.service";
import dateFormat from "dateformat";
import StripeCheckout from "../paymentCheckout/stripePayment";
import Loader from "../paymentCheckout/Loader";
import { toast } from "react-toastify";

const Payment = () => {
  const token = localStorage.getItem("user-token");
  const [userName, setUserName] = useState("");

  const [err, setErr] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  //GET PAYMENT
  const { wclassid } = useParams();
  const { oclassid } = useParams();
  const [billingInfo, setBillingInfo] = useState(null);
  //Item
  const [item, setItem] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!wclassid && !oclassid) {
      navigate("/home");
    }
  }, []);

  //API HANDLER
  useEffect(() => {
    if (token) {
      const accessToken = jwtDecode(token);
      setUserName(accessToken);
    }
    //GET BILL WORKSHOP
    if (wclassid) {
      setIsLoading(true);
      WorkshopService.getBillingInformation({ wclassId: wclassid })
        .then((res) => {
          setBillingInfo(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });

      WorkshopService.getClassById({ id: wclassid })
        .then((res) => {
          setItem(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // GET BILL ONLINE
    if (oclassid) {
      setIsLoading(true);
      OnlinecourseService.getBillingInformation({ oclassid: oclassid })
        .then((res) => {
          setBillingInfo(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  //SUBMIT PAYMENT
  const handlePaymentSubmit = () => {
    // if (wclassid) {
    //     WorkshopService.postPurchaseWsClass({ wclassId: wclassid })
    //         .then((res) => {
    //             toast.success('Successfully Paid', {
    //                 position: "top-right",
    //                 autoClose: 2000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: 0,
    //                 theme: "colored",
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err.response.data)
    //             toast.error("FAIL TO SUBMIT ORDER")
    //         })
    // }
    // if (oclassid) {
    //     OnlinecourseService.postSubmitPayment(billingInfo)
    //         .then((res) => {
    //             toast.success('Successfully Paid', {
    //                 position: "top-right",
    //                 autoClose: 2000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: 0,
    //                 theme: "colored",
    //             });
    //         })
    //         .catch((err) => {
    //             console.log("False to submit Order: ", err.response)
    //             toast.error("FAIL TO SUBMIT ORDER")
    //         })
    // }
  };

  return (
    <div className="paymentpage">
      {wclassid || oclassid ? (
        <div className="paymentApp">
          <div class="checkout-container">
            <div class="left-side">
              <div class="text-box">
                {/* <h1 class="home-heading">{item.name}</h1> */}
                {billingInfo && (
                  <>
                    {wclassid ? (
                      <p class="home-price">{billingInfo.workshopPrice} USD</p>
                    ) : null}
                    {oclassid ? (
                      <p class="home-price">{billingInfo.coursePrice} USD</p>
                    ) : null}
                    <p class="home-desc">
                      {wclassid ? (
                        <em>
                          WorkShop Start On:{" "}
                          <span style={{ color: "gold" }}>
                            {dateFormat(item.startTime, "mmmm dS, yyyy")}
                          </span>
                        </em>
                      ) : null}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div class="right-side">
              <div>
                {billingInfo && (
                  <div class="receipt">
                    <div class="receipt-heading">Receipt Summary</div>
                    <div>
                      <table
                        class="table"
                        style={{ border: "none", padding: "0px" }}
                      >
                        <tr>
                          <td>Price</td>
                          {wclassid ? (
                            <td class="price">
                              {billingInfo.workshopPrice} USD
                            </td>
                          ) : null}
                          {oclassid ? (
                            <td class="price">{billingInfo.coursePrice} USD</td>
                          ) : null}
                        </tr>
                        <tr>
                          <td>Discount</td>
                          <td class="price">
                            {billingInfo.discountedPrice} USD
                          </td>
                        </tr>
                        <tr>
                          <td>Discounted Rate</td>
                          <td class="price">{billingInfo.discountRate} USD</td>
                        </tr>
                        <tr>
                          <td>Membership Name</td>
                          <td class="price">{billingInfo.membershipName}</td>
                        </tr>

                        <tr class="total">
                          <td>Total Price</td>
                          <td class="price">{billingInfo.totalPrice} USD</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                )}

                <div class="payment-info">
                  <p class="footer-text">
                    <i class="fa-solid fa-lock"></i>
                    Your credit card information is encrypted
                    <br />
                    {err && <i style={{ color: "red" }}>{err}</i>}
                  </p>
                </div>
              </div>

              <div>
                <StripeCheckout
                  wclassid={wclassid}
                  oclassid={oclassid}
                  billAmount={billingInfo?.totalPrice}
                  customerName={userName?.name}
                  customerEmail={userName?.email}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {isLoading ? <Loader /> : null}
    </div>
  );
};

export default Payment;
