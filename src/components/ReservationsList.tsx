import { Table } from 'antd';
import React from 'react';
import { Reservation } from '../models/Reservation';
const { Column } = Table;

interface Props {

}
const ReservationsList: React.FC<Props> = (props) => {
  const list: Reservation[] = [
    { dateTime: new Date(), customerName: 'John Smith', customerEmail: 'asdasd@asd.com', customerPhone: '' }
  ]

  return (
    <div>
      <Table dataSource={list} size="small">
        <Column title="Date and Time" dataIndex="dateTime" />
        <Column title="Customer Name" dataIndex="customerName" />
        <Column title="Customer Email" dataIndex="customerEmail" />
      </Table>
    </div>
  )
}

export default ReservationsList;