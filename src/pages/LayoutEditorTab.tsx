import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { TablesLayout } from '../components/TablesLayout';
import { Table } from '../models/Table';

interface Props {}
const LayoutEditorTab: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tables, setTables] = useState<Table[]>([]);
  const [form] = Form.useForm();

  const onTableClick = (position: any) => {
    setIsOpen(true);
    const table = tables.find(x => x.position === position);
    if (table) {
      form.setFieldsValue(table);
    }
    else {
      const draftTable = { id: tables.length + 1, position };
      form.setFieldsValue(draftTable);
    }
  }
  
  const onSave = (values: any) => {
    setIsOpen(false);
    const newTable: Table = values;
    setTables([...tables, newTable]);
    form.resetFields();
  }
  
  const onCancel = () => {
    setIsOpen(false)
  }
  
  return (
    <div className="tab-content">
      <h1>Table Layout Editor</h1>
      <p>Click on a cell to edit seats.</p>
      <TablesLayout tables={tables} onTableClick={onTableClick} />
      <Modal
        title="Edit Table"
        visible={isOpen}
        centered={true}
        onCancel={onCancel}
        footer={[]}
      >
        <Form form={form}
          layout="horizontal"
          size="middle"
          onFinish={onSave}
        >
          <Form.Item label="Table #" name="id">
            <Input disabled />
          </Form.Item>
          <Form.Item hidden name="position">
            <Input />
          </Form.Item>
          <Form.Item label="Seats" name="seats">
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit" >Save</Button>
        </Form>
      </Modal>
    </div>
  )
}

export default LayoutEditorTab;