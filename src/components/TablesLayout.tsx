import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from './Container'

interface Props {
  onTableClick: (table: any) => void
}

export const TablesLayout: React.FC<Props> = ({onTableClick}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container onTableClick={onTableClick} />
    </DndProvider>
  )
}
