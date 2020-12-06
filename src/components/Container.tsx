import React, { useState, useCallback } from 'react'
import { Card } from './Card'

export interface Item {
  id: number
  text: string
}

export interface ContainerState {
  cards: Item[]
}
const initCards = Array(20).fill(null).map((_,i) => ({
  id: i + 1,
  text: `# ${i + 1}`
}))

export const Container: React.FC = () => {
  const [cards, setCards] = useState(initCards)

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = cards[dragIndex]
    const hoverCard = cards[hoverIndex]
    console.log('moveCard', dragIndex, hoverIndex);
    const cardsClone = [...cards];
    cardsClone.splice(dragIndex, 1, hoverCard);
    cardsClone.splice(hoverIndex, 1, dragCard);
    setCards(cardsClone);
    // setCards(
    //   update(cards, {
    //     $splice: [
    //       [dragIndex, 1, hoverCard],
    //       [hoverIndex, 1, dragCard],
    //     ],
    //   }),
    // )
  }, [cards])

  const renderCard = (card: { id: number; text: string }, index: number) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
      />
    )
  }

  return (
    <>
      <div style={{width: 400, display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {cards.map((card, i) => renderCard(card, i))}
      </div>
    </>
  )
}

