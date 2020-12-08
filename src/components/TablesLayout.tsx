import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Table } from '../models/Table'
import { Container } from './Container'

interface Props {
  tables: Table[]
  onTableClick: (table: any) => void
}

export const TablesLayout: React.FC<Props> = ({tables, onTableClick}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container tables={tables} onTableClick={onTableClick} />
    </DndProvider>
  )
}
