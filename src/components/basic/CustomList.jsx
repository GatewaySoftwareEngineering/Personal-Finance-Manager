/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Space, Avatar, Tooltip
} from "antd";
import moment from 'moment';
import converter from 'number-to-words';

// category images
import Loan from '../../assets/icons/svg/loan.svg';
import Food from '../../assets/icons/svg/food.svg';
import Gift from '../../assets/icons/svg/gift.svg';
import Tech from '../../assets/icons/svg/tech.svg';
import Sports from '../../assets/icons/svg/sport.svg';
import Health from '../../assets/icons/svg/health.svg';
import Salary from '../../assets/icons/svg/salary.svg';

export default function CustomList({ item }) {
  
  const [avatarSrc, setAvatarSrc] = useState();
  const [isInFuture, setIsInFuture] = useState(false);
  const [avatarBg, setAvatarBg] = useState('#ffffff');
  const [customizedNote, setCustomizedNote] = useState();
  const [customizedDate, setCustomizedDate] = useState();
  const [customizedAmount, setCustomizedAmount] = useState();

  const handleAvatar = ({ category }) => {
    switch (category) {
      case 'Salary':
        setAvatarSrc(Salary);
        setAvatarBg('#faad14');
        break;
      case 'Loan':
        setAvatarSrc(Loan);
        setAvatarBg('#bae637');
        break;
      case 'Gift':
        setAvatarSrc(Gift);
        setAvatarBg('#d4b106');
        break;
      case 'Tech':
        setAvatarSrc(Tech);
        setAvatarBg('#ff7875');
        break;
      case 'Food':
        setAvatarSrc(Food);
        setAvatarBg('#73d13d');
        break;
      case 'Sports':
        setAvatarSrc(Sports);
        setAvatarBg('#13c2c2');
        break;
      case 'Health':
        setAvatarSrc(Health);
        setAvatarBg('#9254de');
        break;

      default:
      // do nothing
    }
  };

  const handleNote = ({ note }) => {
    if (note) {
      const subtractedNote = note.replace(/^(.{40}[^\s]*).*/, "$1");
      if (note.length > 40) setCustomizedNote(subtractedNote + '...');
      else setCustomizedNote(note);
    }
  }

  const handleDate = ({ date }) => {
    const dateDifference = moment().diff(date, 'hours');

    if (dateDifference < 0) {
      setIsInFuture(true)
      setCustomizedDate(moment(item.date).calendar());
    } else if (dateDifference <= 24) setCustomizedDate('Today');
    else if (dateDifference <= 48) setCustomizedDate('Yesterday');
    else setCustomizedDate(moment(date).format('lll').toString());
  }

  const handleAmount = ({ amount, type }) => {
    if (amount && type) {
      const formatter = Intl.NumberFormat('en', { notation: 'compact' });
      const formated = formatter.format(amount);
      const text = `${type === 'Expense' ? '-$' : '+$'}${formated}`
      setCustomizedAmount(text);
    }
  }

  useEffect(() => {
    handleDate(item);
    handleNote(item);
    handleAvatar(item);
    handleAmount(item);
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
        <Tooltip title={item.note}>
          <span>{customizedNote || '---'}</span>
        </Tooltip>
        {isInFuture && (
          <Tooltip title={'This Transaction is in the Future!'}>
            <span className="future_badge">Precent</span>
          </Tooltip>
        )}
      </Space>
      <div className="transaction_row_end_child">
        <span>
          <Tooltip title={moment(item.date).format('lll')}>
            {customizedDate}
          </Tooltip>
        </span>
        <div style={{
          color: item.type !== 'Expense' ? '#0EA5E9' : undefined,
          backgroundColor: item.type !== 'Expense' ? '#0EA5E926' : undefined,
        }}>
          <Tooltip
            placement="left"
            title={
              converter.toWords(item.type === 'Expense' ? -Math.abs(item.amount) : item.amount)
            }
          >
            {customizedAmount || 0}
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
