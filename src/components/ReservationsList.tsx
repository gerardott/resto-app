import { DatePicker, Form, Input, message } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useState } from 'react';
import { Reservation } from '../models/Reservation';
import { Table } from '../models/Table';
import ActionTable from './shared/ActionTable';
import ModalForm, { useModalForm } from './shared/ModalForm';
import { ReservationService } from '../services/ReservationService';
import dayjs from 'dayjs';

interface Props {
  table: Table
}

const ReservationsList: React.FC<Props> = ({ table }) => {
  const [form] = Form.useForm<Reservation>();
  const [list, setList] = useState<Reservation[]>([]);
  const [modal] = useModalForm(form);
  const { onEdit } = modal.handlers;
  const { onCreateNew, onModalCancel } = modal.actions;

  const loadData = async (tableId: string) => {
    const list = await ReservationService.find(tableId);
    setList(list);
  }
  
  React.useEffect(() => {
    loadData(table.id);
  }, [table])

  const isValid = (entity: Reservation) => {
    if (!entity.id) {
      const exists = list.find(x => dayjs(x.dateTime).isSame(entity.dateTime, 'minute'));
      if (exists) {
        message.warn('A reservation for that hour already exists');
        return false;
      }
    }
    return true;
  }

  const onFinish = async (values: Reservation) => {
    if (!isValid(values)) return;

    values.tableId = table.id;
    if (values.id) {
      ReservationService.update(values.id, values);
    }
    else {
      ReservationService.create(values);
    }
    await loadData(table.id);
    modal.close();
  }

  const onDelete = async (record: Reservation) => {
    ReservationService.remove(record.id);
    await loadData(table.id)
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