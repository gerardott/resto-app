import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { TablesLayout } from '../components/TablesLayout';

interface Props {}
const LayoutEditorTab: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const onTableClick = (table: any) => {
    setIsOpen(true);
    console.log(table);
    form.setFieldsValue({seats: table.text});
  }
  
  const onSave = (values: any) => {
    setIsOpen(false);
    alert(JSON.stringify(values));
  }
  
  const onCancel = () => {
    setIsOpen(false)
  }
  
  return (
    <div className="tab-content">
      <h1>Table Layout Editor</h1>
      <p>Click on a cell to edit seats.</p>
      <TablesLayout onTableClick={onTableClick} />
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
          <Form.Item label="Seats" name="seats">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" >Save</Button>
        </Form>
      </Modal>
    </div>
  )
}

export default LayoutEditorTab;