import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import ReservationsList from '../components/ReservationsList';
import { TablesLayout } from '../components/TablesLayout';
import { Table } from '../models/Table';

const initTables: Table[] = [
  {id: 1, position: 2, seats: 2},
  {id: 2, position: 10, seats: 4},
  {id: 3, position: 50, seats: 8},
]

interface Props {}
const ReservationsTab: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tables] = useState<Table[]>(initTables);

  const onTableClick = (position: any) => {
    const table = tables.find(x => x.position === position);
    if (table) {
      setIsOpen(true);
    }
  }
  
  const onCancel = () => {
    setIsOpen(false)
  }
  
  return (
    <div className="tab-content">
      <h1>Reservation Management</h1>
      <p>Click on a cell to manage reservations.</p>
      <TablesLayout tables={tables} onTableClick={onTableClick} draggable={false} />
      <Modal
        title="Reservations"
        visible={isOpen}
        centered={true}
        width={800}
        onCancel={onCancel}
        footer={[
          <Button type="default" onClick={onCancel}>Close</Button>
        ]}
      >
        <ReservationsList />
      </Modal>
    </div>
  )
}

export default ReservationsTab;