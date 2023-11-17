import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WorkshopService from '../services/workshop.service';
import dateFormat from 'dateformat';
import { toast } from 'react-toastify';
import OnlinecourseService from '../services/onlinecourse.service';

const Payment = () => {
    const token = localStorage.getItem("user-token")
    const [userName, setUserName] = useState("")
    useEffect(() => {
        if (token) {
            const accessToken = jwtDecode(token)
            setUserName(accessToken.name)
        }
    }, [])

    const [err, setErr] = useState(null);

    //GET PAYMENT 
    const { wclassid } = useParams();
    const { oclassid } = useParams();
    const [billingInfo, setBillingInfo] = useState(null);
    //Item
    const [item, setItem] = useState();


    //API HANDLER
    useEffect(() => {
        //GET BILL WORKSHOP
        if (wclassid) {
            WorkshopService.getBillingInformation({ wclassId: wclassid })
                .then((res) => {
                    setBillingInfo(res.data);
                    console.log("WORKSHOP", res.data)
                })
                .catch((e) => {
                    console.log("WORKSHOP", e)
                })

            WorkshopService.getClassById({ id: wclassid })
                .then((res) => {
                    setItem(res.data)
                    console.log(res.data)
                })
        }
        // GET BILL ONLINE
        if (oclassid) {
            OnlinecourseService.getBillingInformation({ oclassid: oclassid })
                .then((res) => {
                    setBillingInfo(res.data);
                    console.log("ONLINE COURSE", res.data)
                })
                .catch((e) => {
                    console.log("ONLINE COURSE", e)
                })
        }
    }, [])






    //Set For UI
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCVV] = useState('');
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);


    const navigate = useNavigate();


    //SUBMIT PAYMENT
    const handlePaymentSubmit = () => {
        if (wclassid) {
            WorkshopService.postPurchaseWsClass({ wclassId: wclassid })
                .then((res) => {
                    toast.success('Successfully Paid', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: 0,
                        theme: "colored",
                    });
                    setTimeout(() => {
                        navigate('/home')
                    }, 3000);
                })
                .catch((err) => {
                    console.log(err.response.data)
                    toast.error("FAIL TO SUBMIT ORDER")
                })
        }
        if (oclassid) {

            OnlinecourseService.postSubmitPayment(billingInfo)
                .then((res) => {
                    toast.success('Successfully Paid', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: 0,
                        theme: "colored",
                    });
                    setTimeout(() => {
                        navigate('/home')
                    }, 3000);
                })
                .catch((err) => {
                    console.log("False to submit Order: ",err.response)
                    toast.error("FAIL TO SUBMIT ORDER")
                })
        }
    };



    return (
        <div className='paymentpage'>
            {wclassid || oclassid ?
            <div className="paymentApp">
                <div class="checkout-container">
                    <div class="left-side">
                        <div class="text-box">
                            {/* <h1 class="home-heading">{item.name}</h1> */}
                            {billingInfo &&
                                <>
                                    {wclassid ? <p class="home-price">{billingInfo.workshopPrice} USD</p> : null}
                                    {oclassid ? <p class="home-price">{billingInfo.coursePrice} USD</p> : null}
                                    <p class="home-desc">
                                        {wclassid ? <em>WorkShop Start On: <span style={{color:"gold"}}>{dateFormat(item.startTime, "mmmm dS, yyyy")}</span></em> : null}
                                    </p>
                                </>}
                        </div>
                    </div>

                    <div class="right-side">
                        {billingInfo &&
                            <div class="receipt">
                                <h2 class="receipt-heading">Receipt Summary</h2>
                                <div>
                                    <table class="table">
                                        <tr>
                                            <td>Price</td>
                                            {wclassid ? <td class="price">{billingInfo.workshopPrice} USD</td> : null}
                                            {oclassid ? <td class="price">{billingInfo.coursePrice} USD</td> : null}
                                        </tr>
                                        <tr>
                                            <td>Discount</td>
                                            <td class="price">{billingInfo.discountedPrice} USD</td>
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
                        }

                        <div class="payment-info">
                            <h3 class="payment-heading">Payment Information</h3>
                            <form
                                class="form-box"
                                enctype="text/plain"
                                method="get"
                                target="_blank"
                            >
                                <div>
                                    <label for="full-name">Full Name</label>
                                    <input
                                        id="full-name"
                                        name="full-name"
                                        placeholder="Nguyen Van A"
                                        required
                                        type="text"
                                    />
                                </div>

                                <div>
                                    <label for="credit-card-num"
                                    >Card Number
                                        <span class="card-logos">
                                            <i class="card-logo fa-brands fa-cc-visa"></i>
                                            <i class="card-logo fa-brands fa-cc-amex"></i>
                                            <i class="card-logo fa-brands fa-cc-mastercard"></i>
                                            <i class="card-logo fa-brands fa-cc-discover"></i> </span
                                        ></label>
                                    <input
                                        id="credit-card-num"
                                        name="credit-card-num"
                                        placeholder="1111-2222-3333-4444"
                                        // required
                                        type="text"
                                    />
                                </div>

                                <div>
                                    <p class="expires">Expires on:</p>
                                    <div class="card-experation">
                                        <label for="expiration-month">Month: </label>
                                        <select id="expiration-month" name="expiration-month" 
                                        // required
                                        >
                                            <option value="">Month</option>
                                            <option value="">January</option>
                                            <option value="">February</option>
                                            <option value="">March</option>
                                            <option value="">April</option>
                                            <option value="">May</option>
                                            <option value="">June</option>
                                            <option value="">July</option>
                                            <option value="">August</option>
                                            <option value="">September</option>
                                            <option value="">October</option>
                                            <option value="">November</option>
                                            <option value="">Decemeber</option>
                                        </select>

                                        <label class="expiration-year">   Year: </label>
                                        <select id="experation-year" name="experation-year" 
                                        // required
                                        >
                                            <option value="">Year</option>
                                            <option value="">2023</option>
                                            <option value="">2024</option>
                                            <option value="">2025</option>
                                            <option value="">2026</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label for="cvv">CVV  </label>
                                    <input
                                        id="cvv"
                                        name="cvv"
                                        placeholder="415"
                                        type="text"
                                        required
                                    />
                                </div>

                                <button class="btn" onClick={handlePaymentSubmit}>
                                    <i class="fa-solid fa-lock"></i> Submit Payment
                                </button>
                            </form>

                            <p class="footer-text">
                                <i class="fa-solid fa-lock"></i>

                                Your credit card information is encrypted
                                <br />
                                {err && <i style={{ color: "red" }}>{err}</i>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            : null}
        </div>
    );
}

export default Payment