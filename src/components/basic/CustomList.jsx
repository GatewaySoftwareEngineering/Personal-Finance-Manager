import React, { useEffect, useState } from 'react'
import {
  Space, Avatar,
} from "antd";

// gategory images
import Loan from '../../assets/icons/svg/loan.svg';
import Food from '../../assets/icons/svg/food.svg';
import Gift from '../../assets/icons/svg/gift.svg';
import Tech from '../../assets/icons/svg/tech.svg';
import Sports from '../../assets/icons/svg/sport.svg';
import Health from '../../assets/icons/svg/health.svg';
import Salary from '../../assets/icons/svg/salary.svg';

export default function CustomList({ item }) {
  const [avatarSrc, setAvatarSrc] = useState()
  const [avatarBg, setAvatarBg] = useState('#ffffff')

  const handleAvatar = (item) => {
    switch (item.category) {
      case 'Salary':
        setAvatarSrc(Salary);
        break;
      case 'Loan':
        setAvatarSrc(Loan);;
        break;
      case 'Gift':
        setAvatarSrc(Gift);;
        break;
      case 'Tech':
        setAvatarSrc(Tech);;
        break;
      case 'Food':
        setAvatarSrc(Food);;
        break;
      case 'Sports':
        setAvatarSrc(Sports);;
        break;
      case 'Health':
        setAvatarSrc(Health);;
        break;

      default:
      // do nothing
    }
  }

  const handleAvatarBg = (item) => {
    switch (item.category) {
      case 'Salary':
        setAvatarBg('#faad14');
        break;
      case 'Loan':
        setAvatarBg('#bae637');
        break;
      case 'Gift':
        setAvatarBg('#d4b106');
        break;
      case 'Tech':
        setAvatarBg('#ff7875');
        break;
      case 'Food':
        setAvatarBg('#73d13d');
        break;
      case 'Sports':
        setAvatarBg('#13c2c2');
        break;
      case 'Health':
        setAvatarBg('#9254de');
        break;

      default:
      // do nothing
    }
  }

  useEffect(() => {
    handleAvatar(item);
    handleAvatarBg(item)
  }, [item])

  return (
    <div className="transaction_row">
      <Space>
        <Avatar
          className="transaction_img"
          src={(
            <img src={avatarSrc} alt="" />
          )}
          style={{ backgroundColor: avatarBg }}
        />
        <p>12 Rules for life by Jordan Peterson signed by himself...</p>
      </Space>
      <div className="transaction_row_end_child">
        <span>Today</span>
        <div>-$45</div>
      </div>
    </div>
  )
}
