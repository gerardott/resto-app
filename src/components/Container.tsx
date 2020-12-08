import React, { useState, useCallback } from 'react'
import { Table } from '../models/Table';
import { Card } from './Card'

// Item width by number of items in row
const width = 60 * 15;

export interface Item {
  id: number
  text: string
  hasReservation: boolean
}

export interface ContainerState {
  cards: Item[]
}
const initCards = Array(150).fill(null).map((_, i) => ({
  id: i + 1,
  text: '-',
  hasReservation: false
}))

interface Props {
  tables: Table[]
  onTableClick: (table: any) => void
}

export const Container: React.FC<Props> = ({tables, onTableClick}) => {
  const [cards, setCards] = useState(initCards)
  
  React.useEffect(() => {
    const updated = cards.map((item, idx) => {
      const table = tables.find(x => x.position === idx);
      if (table) {
        item.text = table?.seats + ' s';
        item.hasReservation = true;
      }
      return item;
    });
    setCards(updated);
  }, [tables])

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = cards[dragIndex]
    const hoverCard = cards[hoverIndex]

    const cardsClone = [...cards];
    cardsClone.splice(dragIndex, 1, hoverCard);
    cardsClone.splice(hoverIndex, 1, dragCard);
    setCards(cardsClone);
  }, [cards])

  const onCardClick = (idx: number) => {
    // const card = cards[idx];
    onTableClick(idx);
  }

  return (
    <div style={{ fontSize: 12 }}>
      <div style={{ width: width, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {cards.map((card, idx) =>
          <Card
            key={card.id}
            index={idx}
            id={card.id}
            text={card.text}
            draggable={true}
            hasReservation={card.hasReservation}
            moveCard={moveCard}
            onClick={onCardClick}
          />
        )}
      </div>
    </div>
  )
}

