import React from 'react'
import { useState } from 'react';
import "./certificate.scss"


const Certificate = () => {
    const [name, setName] = useState(''); // State lưu trữ tên người dùng
    const [image, setImage] = useState(null); // State lưu trữ hình ảnh đã tải lên

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file));
    };

    return (
        <div className='certificatepage'>
            <h2>Chứng chỉ ReactJS</h2>
            <div>
                <input
                    type="text"
                    placeholder="Nhập tên của bạn"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            <div>
                {image && (
                    <div>
                        <h3>Chứng chỉ của {name}</h3>
                        <img src={image} alt="Chứng chỉ" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Certificate