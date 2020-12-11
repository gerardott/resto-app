import React from 'react'
import { Table } from '../models/Table';
import { Card } from './Card'

// Item width by number of items in row
const width = 70 * 15;

export interface Item {
  id: number
  text: string
  hasReservation: boolean
}

interface Props {
  tables: Table[]
  onTableClick: (table: any) => void
  switchTable?: (dragIndex: number, hoverIndex: number) => void
  draggable: boolean
}

export const Container: React.FC<Props> = ({tables, onTableClick, switchTable, draggable}) => {
  const cards = Array(150).fill(null).map((_, idx) => {
    let item: any = { id: idx + 1 };
    const table = tables.find(x => x.position === idx);
    if (table) {
      item.text = `${table.seats} seats`;
      item.hasReservation = true;
    }
    else {
      item.text = '-';
      item.hasReservation = false;
    }
    return item;
  });

  const onCardClick = (idx: number) => {
    // const card = cards[idx];
    onTableClick(idx);
  }

  const switchCard = (dragIndex: number, hoverIndex: number) => {
    if (draggable && switchTable) {
      switchTable(dragIndex, hoverIndex);
    }
  }

  return (
    <div style={{ fontSize: 12 }}>
      <div style={{ width: width, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', textAlign: 'center' }}>
        {cards.map((card, idx) =>
          <Card
            key={card.id}
            index={idx}
            id={card.id}
            text={card.text}
            draggable={draggable}
            hasReservation={card.hasReservation}
            switchCard={switchCard}
            onClick={onCardClick}
          />
        )}
      </div>
    </div>
  )
}

