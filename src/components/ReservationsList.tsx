import { DatePicker, Form, Input, message } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useState } from 'react';
import { Reservation } from '../models/Reservation';
import { Table } from '../models/Table';
import ActionTable from './shared/ActionTable';
import ModalForm, { useModalFormMock } from './shared/ModalForm';
import dayjs from 'dayjs';

interface Props {
  table: Table
}

const ReservationsList: React.FC<Props> = ({ table }) => {
  const [form] = Form.useForm<Reservation>();
  const [list, setList] = useState<Reservation[]>([]);
  const [modal] = useModalFormMock(form, list, setList);
  const { onEdit, onDelete } = modal.handlers;
  const { onCreateNew, onModalCancel } = modal.actions;

  const onFinish = (values: Reservation) => {
    if (!values.id) {
      const exists = list.find(x => dayjs(x.dateTime).isSame(values.dateTime, 'minute'));
      if (exists) {
        message.warn('A reservation for that hour already exists');
        return;
      }
    }
    values.tableId = table.id;
    modal.actions.onFinish(values);
  }
  const requiredRule = [{required: true}];
  const renderDate = (value: Date) => value ? dayjs(value).format('MM/DD/YYYY HH:mm') : '';

  return (
    <>
      <h1>Reservations</h1>
      <ModalForm form={form}
        modal={modal}
        entityName="Reservation"
        onCreateNew={onCreateNew}
        onFinish={onFinish}
        onCancel={onModalCancel}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="dateTime" label="Date and Time" rules={requiredRule}>
          <DatePicker showTime={{ format: "HH:mm", minuteStep: 60 }} format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item name="customerName" label="Customer Name" rules={requiredRule}>
          <Input />
        </Form.Item>
        <Form.Item name="customerPhone" label="Customer Phone" rules={requiredRule}>
          <Input type="tel" />
        </Form.Item>
        <Form.Item name="customerEmail" label="Customer Email" rules={requiredRule}>
          <Input type="email" />
        </Form.Item>
      </ModalForm>

      <ActionTable dataSource={list} onEdit={onEdit} onDelete={onDelete}>
        <Column title="Date and Time" dataIndex="dateTime" render={renderDate} />
        <Column title="Customer Name" dataIndex="customerName" />
        <Column title="Customer Phone" dataIndex="customerPhone" />
        <Column title="Customer Email" dataIndex="customerEmail" />
      </ActionTable>
    </>
  )
}

export default ReservationsList;