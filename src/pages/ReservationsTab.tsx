import { Button, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import ReservationsList from '../components/ReservationsList';
import { TablesLayout } from '../components/TablesLayout';
import { Restaurant } from '../models/Restaurant';
import { Table } from '../models/Table';
import { RestaurantContext } from '../services/Contexts';
import { TableService } from '../services/TableService';

interface Props {
}

const ReservationsTab: React.FC<Props> = () => {
  const restaurant = useContext<Restaurant>(RestaurantContext);
  const [isOpen, setIsOpen] = useState(false);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table>();

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