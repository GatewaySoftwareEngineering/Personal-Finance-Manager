import React from 'react'

export default function Statistics() {
  return (
    <>
      <div className="statistics_card_container">

        <div className="statistic_card" style={{ background: 'linear-gradient(90deg, #7DD3FC 0%, #BAE6FD 102.82%)'}}>
          <div>
            <span style={{ color: '#1A74C7'}}>Income</span>
            <span style={{ background: '#38BDF8BF'}}>details</span>
          </div>
          <span>$1000</span>
        </div>

        <div className="statistic_card" style={{ background: 'linear-gradient(90deg, #D4D4D8 0%, #E4E4E7 102.82%)'}}>
          <div>
            <span style={{ color: '#71717A'}}>Balance</span>
            <span style={{ background: '#71717ABF'}}>details</span>
          </div>
          <span>$25000</span>
        </div>

        <div className="statistic_card" style={{ background: 'linear-gradient(90deg, #FDA4AF 0%, #FECDD3 102.82%)'}}>
          <div>
            <span style={{ color: '#EF2A4C'}}>Expense</span>
            <span style={{ background: '#FB7185BF'}}>details</span>
          </div>
          <span>$4520</span>
        </div>

      </div>
    </>
  )
}
