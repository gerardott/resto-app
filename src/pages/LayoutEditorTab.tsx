import { Button, Form, Input, Row } from 'antd';
import React, { useContext, useState } from 'react';
import ModalForm, { useModalForm } from '../components/shared/ModalForm';
import { TablesLayout } from '../components/TablesLayout';
import { Restaurant } from '../models/Restaurant';
import { Table } from '../models/Table';
import { RestaurantContext } from '../services/Contexts';
import { TableService } from '../services/TableService';

interface Props {}
const LayoutEditorTab: React.FC<Props> = () => {
  const restaurant = useContext<Restaurant>(RestaurantContext);
  const [tables, setTables] = useState<Table[]>([]);
  const [form] = Form.useForm<Table>();
  const [modal] = useModalForm(form);
  const { onModalCancel } = modal.actions;
  
  const loadData = async (restaurantId: string) => {
    const list = await TableService.find(restaurantId);
    setTables(list);
  }
  
  React.useEffect(() => {
    loadData(restaurant.id);
  }, [restaurant])

  const onTableClick = (position: any) => {
    const table = tables.find(x => x.position === position);
    if (table) {
      modal.handlers.onEdit(table);
    }
    else {
      const draftTable = { num: tables.length + 1, position };
      modal.actions.onCreateNew();
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
    modal.close();
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
  
  return (
    <div className="tab-content">
      <h1>Table Layout Editor</h1>
      <p>Click on a cell to edit seats.</p>
      <TablesLayout tables={tables} onTableClick={onTableClick} switchTable={switchTable} draggable={true} />
      <ModalForm form={form}
        modal={modal}
        entityName="Table"
        onFinish={onSave}
        onCancel={onModalCancel}
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
          <Form.Item label="Seats" name="seats" rules={[{required: true}]}>
            <Input type="number" />
          </Form.Item>
          <Row>
          </Row>
      </ModalForm>
    </div>
  )
}

export default LayoutEditorTab;