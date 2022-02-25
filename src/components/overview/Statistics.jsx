import React, { useState, useEffect } from 'react';
import { Tooltip } from 'antd'; 
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatstics } from '../../features/statistics/statisticSlice';

import converter from 'number-to-words';

export default function Statistics() {

  const dispatch = useDispatch();
  const { transactions }  = useSelector((state) => state.transactions); 

  const [statics, setStatics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    setLoading(true);
    setTimeout(() => {
      dispatch(fetchStatstics())
        .then((res) => {
          const { total, income, expense } = res.payload;
          setStatics({ total, income, expense });
          setLoading(false);
        }).catch(() => {
          //handle err
          setLoading(false);
        })
    }, 500);
  }, [dispatch]);

  return (
    <>
      <div className="statistics_card_container">

        <div className="statistic_card" style={{ background: 'linear-gradient(90deg, #7DD3FC 0%, #BAE6FD 102.82%)' }}>
          <div>
            <span style={{ color: '#1A74C7' }}>Income</span>
            <span style={{ background: '#38BDF8BF' }}>details</span>
          </div>
          <span>
            <Tooltip title={converter.toWords(statics.income || 0)} placement="bottom">
              {loading ?
                <LoadingOutlined />
                : `$${statics.income ? statics.income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}`}
            </Tooltip>
          </span>
        </div>

        <div className="statistic_card" style={{ background: 'linear-gradient(90deg, #D4D4D8 0%, #E4E4E7 102.82%)' }}>
          <div>
            <span style={{ color: '#71717A' }}>Balance</span>
            <span style={{ background: '#71717ABF' }}>details</span>
          </div>
          <span>
            <Tooltip title={converter.toWords(statics.total || 0)} placement="bottom">
              {loading ?
                <LoadingOutlined />
                : `$${statics.total ? statics.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}`}
            </Tooltip>
          </span>
        </div>

        <div className="statistic_card" style={{ background: 'linear-gradient(90deg, #FDA4AF 0%, #FECDD3 102.82%)' }}>
          <div>
            <span style={{ color: '#EF2A4C' }}>Expense</span>
            <span style={{ background: '#FB7185BF' }}>details</span>
          </div>
          <span>
            <Tooltip title={converter.toWords(statics.expense || 0)} placement="bottom">
              {loading ?
                <LoadingOutlined />
                : `$${statics.expense ? statics.expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}`}
            </Tooltip>
          </span>
        </div>

      </div>
    </>
  )
}
