import { Button, Form, Input, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { TablesLayout } from '../components/TablesLayout';
import { Restaurant } from '../models/Restaurant';
import { Table } from '../models/Table';
import { RestaurantContext } from '../services/Contexts';
import { TableService } from '../services/TableService';

interface Props {}
const LayoutEditorTab: React.FC<Props> = () => {
  const restaurant = useContext<Restaurant>(RestaurantContext);
  const [isOpen, setIsOpen] = useState(false);
  const [tables, setTables] = useState<Table[]>([]);
  const [form] = Form.useForm<Table>();

  const loadData = async (restaurantId: string) => {
    const list = await TableService.find(restaurantId);
    setTables(list);
  }
  
  React.useEffect(() => {
    loadData(restaurant.id);
  }, [restaurant])

  const onTableClick = (position: any) => {
    setIsOpen(true);
    form.resetFields();
    const table = tables.find(x => x.position === position);
    if (table) {
      form.setFieldsValue(table);
    }
    else {
      const draftTable = { num: tables.length + 1, position };
      form.setFieldsValue(draftTable);
    }
  }
  
  const switchTable = async (dragIndex: number, hoverIndex: number) => {
    const draggedTable = tables.find(x => x.position === dragIndex);
    if (draggedTable) {
      draggedTable.position = hoverIndex;
      await TableService.update(draggedTable.id, draggedTable);
      await loadData(restaurant.id);
    }
  }
  
  const onSave = async (values: Table) => {
    setIsOpen(false);
    values.seats = values.seats | 0;
    values.restaurantId = restaurant.id;
    if (values.id) {
      await TableService.update(values.id, values);
    }
    else {
      await TableService.create(values);
    }
    await loadData(restaurant.id);
  }
  
  const onCancel = () => {
    setIsOpen(false)
  }
  
  return (
    <div className="tab-content">
      <h1>Table Layout Editor</h1>
      <p>Click on a cell to edit seats.</p>
      <TablesLayout tables={tables} onTableClick={onTableClick} switchTable={switchTable} draggable={true} />
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
          <Form.Item hidden name="id">
            <Input />
          </Form.Item>
          <Form.Item label="Table #" name="num">
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