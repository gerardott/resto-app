import React, { useContext, useState } from 'react';
import BasicTable from '../../components/shared/BasicTable';
import Column from 'antd/lib/table/Column';
import { DatePicker } from '../../components/shared/dates';
import { getReportData } from '../../services/firebase';
import { Restaurant } from '../../models/Restaurant';
import { RestaurantContext } from '../../services/Contexts';
import { ReportItem } from '../../models/ReportItem';
import dayjs from 'dayjs';

const ReportTab: React.FC = () => {
  const restaurant = useContext<Restaurant>(RestaurantContext);
  const [list, setList] = useState<ReportItem[]>([]);
  
  const onPickerChange = async (value: any) => {
    const startDate = dayjs(value).startOf('day').toDate();
    const endDate = dayjs(value).endOf('day').toDate();
    const list = await getReportData(restaurant.id, startDate, endDate);
    setList(list);
  }
  
  return (
    <div className="tab-content">
      <h1>Reservation Management</h1>
      <p>Select a date to view all reservations</p>
      <div style={{marginBottom: 16}}>
        <span>Select date: </span>
        <DatePicker onChange={onPickerChange} format="MM/DD/YYYY" />
      </div>
      <BasicTable key="key" dataSource={list} size="small" bordered>
        <Column title="Table" dataIndex="tableNum" />
        <Column title="Reservation Time" dataIndex="reservationTime" />
        <Column title="Customer Name" dataIndex="customerName" />
        <Column title="Customer Phone" dataIndex="customerPhone" />
        <Column title="Customer Email" dataIndex="customerEmail" />
      </BasicTable>
    </div>
  )
}

export default ReportTab;