import React, { useRef } from 'react'
import { useDrag, useDrop, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'

const style = {
  width: 50,
  border: '1px dashed gray',
  padding: '10px 0',
  marginBottom: 8,
  marginRight: 8,
}

export interface CardProps {
  id: any
  text: string
  draggable: boolean
  hasReservation?: boolean
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  onClick?: (index: number) => void
}

interface DragItem {
  type: string
  id: string
  index: number
  hasReservation: boolean
}
export const Card: React.FC<CardProps> = ({ id, text, index, draggable, hasReservation, moveCard, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const hoverIndex = useRef<number>(0);

  const [, drop] = useDrop({
    accept: 'card',
    drop(item: DragItem, monitor: DropTargetMonitor) {
      console.log('drop', item.index, hoverIndex.current);
      moveCard(item.index, hoverIndex.current);
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      hoverIndex.current = index;
    },
    canDrop(item: DragItem, monitor: DropTargetMonitor) {
      return !hasReservation;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id, index, hasReservation },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag() {
      return hasReservation!;
    }
  })
  const hndClick = () => onClick && onClick(index);

  const opacity = isDragging ? 0.1 : 1.0;
  const backgroundColor = hasReservation ? 'lightgreen' : undefined;
  if (draggable) {
    drag(drop(ref))
  }
  
  return (
    <div ref={ref} style={{ ...style, opacity, backgroundColor }} onClick={hndClick}>
      {text}
    </div>
  )
}
