import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import ReservationsList from '../components/ReservationsList';
import { TablesLayout } from '../components/TablesLayout';
import { Table } from '../models/Table';
import { TableService } from '../services/TableService';

interface Props {
}

const ReservationsTab: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table>();

  const loadData = async () => {
    const list = await TableService.find();
    setTables(list);
  }
  
  React.useEffect(() => {
    loadData();
  }, [])

  const onTableClick = (position: any) => {
    const table = tables.find(x => x.position === position);
    if (table) {
      setSelectedTable(table);
      setIsOpen(true);
    }
  }
  
  const onCancel = () => {
    setIsOpen(false)
    setTimeout(() => {
      setSelectedTable(undefined);
    }, 500);
  }
  
  return (
    <div className="tab-content">
      <h1>Reservation Management</h1>
      <p>Click on a cell to manage reservations.</p>
      <TablesLayout tables={tables} onTableClick={onTableClick} draggable={false} />
      {selectedTable && 
        <Modal
          title={`Reservation of table #${selectedTable.num}`}
          visible={isOpen}
          centered={true}
          width={800}
          onCancel={onCancel}
          footer={[
            <Button type="default" onClick={onCancel}>Close</Button>
          ]}
        >
          <ReservationsList table={selectedTable} />
        </Modal>
      }
    </div>
  )
}

export default ReservationsTab;