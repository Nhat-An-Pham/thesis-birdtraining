import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Payment = () => {
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCVV] = useState('');
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Thực hiện xác nhận thanh toán ở đây (có thể là một cuộc gọi API)
        // Sau khi xác nhận thanh toán, bạn có thể cập nhật state và hiển thị thông báo
        setIsPaymentComplete(true);
    };

    return (
        <div className='paymentpage'>
            <div className="paymentApp">
                <h1 className='paymentApp-title'>Payment Page</h1>
                <div>
                    {isPaymentComplete ? (
                        <div>
                            <p>Thanh toán đã được xác nhận!</p>
                            <Link to="/home"><button className='paymentApp-button'>Back To Home</button></Link>
                        </div>
                    ) : (
                        <form className='paymentApp-form' onSubmit={handlePaymentSubmit}>
                            <div className='paymentApp-label'>
                                <label>Tên trên thẻ</label>
                                <input
                                    type="text"
                                    value={name}
                                    className="paymentApp-input"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='paymentApp-label'>
                                <label>Số thẻ</label>
                                <input
                                    type="text"
                                    value={cardNumber}
                                    className="paymentApp-input"
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='paymentApp-label'>
                                <label>Ngày hết hạn</label>
                                <input
                                    type="text"
                                    value={expiry}
                                    className="paymentApp-input"
                                    onChange={(e) => setExpiry(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='paymentApp-label'>
                                <label>CVV</label>
                                <input
                                    type="text"
                                    value={cvv}
                                    className="paymentApp-input"
                                    onChange={(e) => setCVV(e.target.value)}
                                    required
                                />
                            </div>
                            <button className='paymentApp-button' type="submit">Xác nhận thanh toán</button>
                        </form>
                    )}
                    <div>
                        <img alt='' src={require("../assets/pages/payment/cards.jpeg")}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment