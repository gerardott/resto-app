import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Table } from '../models/Table'
import { Container } from './Container'

interface Props {
  tables: Table[]
  onTableClick: (table: any) => void
  switchTable?: (dragIndex: number, hoverIndex: number) => void
  draggable: boolean;
}

export const TablesLayout: React.FC<Props> = ({tables, onTableClick, switchTable, draggable}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container tables={tables} onTableClick={onTableClick} switchTable={switchTable} draggable={draggable} />
    </DndProvider>
  )
}
