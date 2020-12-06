import React, { useRef } from 'react'
import { useDrag, useDrop, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'
import { XYCoord } from 'dnd-core'

const style = {
  width: 80,
  border: '1px dashed gray',
  padding: '1.0rem 0',
  marginBottom: '.5rem',
  marginRight: '.5rem',
  backgroundColor: 'green',
  cursor: 'move',
}

export interface CardProps {
  id: any
  text: string
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}
export const Card: React.FC<CardProps> = ({ id, text, index, moveCard }) => {
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
      const dragIndex = item.index
      const hoverIndex2 = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex2) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      ref.current.style.backgroundColor = 'red';

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      console.log({hoverClientY, hoverMiddleY});

      // Dragging downwards
      if (dragIndex < hoverIndex2 && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex2 && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id, index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  
  return (
    <div ref={ref} style={{ ...style, opacity }}>
      {text}
    </div>
  )
}
