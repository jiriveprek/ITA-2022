import { Helmet, HelmetProvider } from 'react-helmet-async'
import { generateId } from '../utils/utils'
import { hold } from '../utils/utils'
import { shuffleArray } from '../utils/utils'
import { themes } from '../themes'
import React, { useState } from 'react'
import styled from '@emotion/styled'

type Cards = {
  id: number
  picture: string
  inactive: boolean
  isFlipped: boolean
}

const cardEmojis = ['🐱‍👤', '🐱‍💻', '🐱‍👓', '🐱‍🚀', '🐱‍🏍', '🐱‍🐉', '😼', '🙀']

const createBoard = () =>
  shuffleArray(
    [...cardEmojis, ...cardEmojis].map(
      card =>
        ({
          id: generateId(),
          picture: card,
          inactive: false,
          isFlipped: false,
        } as Cards)
    )
  )

export const MemoryGame = () => {
  const [cards, setCards] = useState(createBoard())
  const [openCard, setOpenCard] = useState(undefined as undefined | Cards)

  const handleClick = (pickedCard: Cards) => {
    if (!pickedCard.inactive) evaluate(pickedCard)
  }

  const evaluate = async (pickedCard: Cards) => {
    setCards(
      cards.map(card =>
        card.id === pickedCard.id ? { ...card, inactive: true, isFlipped: true } : card
      )
    )
    if (!openCard) {
      setOpenCard(pickedCard)
      return
    } else if (pickedCard.picture === openCard.picture) {
      setOpenCard(undefined)
      return
    } else if (pickedCard.picture !== openCard.picture) {
      await hold(600)
      setCards(
        cards.map(card =>
          card.id === pickedCard.id ? { ...card, inactive: false, isFlipped: false } : card
        )
      )
      setCards(
        cards.map(card =>
          card.id === openCard.id ? { ...card, inactive: false, isFlipped: false } : card
        )
      )
      setOpenCard(undefined)
    }
  }

  const resetGame = () => {
    setCards(createBoard())
  }
  return (
    <HelmetProvider>
      <Div_Main>
        <Helmet>
          <title>Jiří Vepřek | Memory Game</title>
        </Helmet>
        <Div_MemoryGameContainer>
          <Div_HeadingBorder>
            <H1_MainHeading>Memory Game</H1_MainHeading>
          </Div_HeadingBorder>
          <Div_CardBoardBorder>
            <Div_CardBoard>
              {cards.map(card => (
                <Card key={card.id} onClick={() => handleClick(card)}>
                  {card.isFlipped ? card.picture : '❔'}
                </Card>
              ))}
            </Div_CardBoard>
          </Div_CardBoardBorder>
          <Div_ButtonWrapper>
            <Button onClick={resetGame}>Reset game</Button>
          </Div_ButtonWrapper>
        </Div_MemoryGameContainer>
      </Div_Main>
    </HelmetProvider>
  )
}

const Div_Main = styled.div`
  min-width: 360px;
  height: 100vh;
  width: 100%;
  background: ${themes.color.dark};
  text-align: center;
`
const Div_MemoryGameContainer = styled.div`
  margin: ${themes.spacing.none} auto;
  padding-top: ${themes.spacing.l};
  width: 100%;
`

const Div_CardBoardBorder = styled.div`
  max-width: 700px;
  background: ${themes.color.gradient};
  padding: 3px;
  margin: ${themes.spacing.none} auto;
  border-radius: 1em;
`

const Div_CardBoard = styled.div`
  background: ${themes.color.dark};
  max-width: 700px;
  margin: ${themes.spacing.none} auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  border-radius: 1em;
`

const Div_HeadingBorder = styled.div`
  background: ${themes.color.gradient};
  width: max-content;
  padding: 3px ${themes.spacing.none};
  margin: ${themes.spacing.none} auto;
  margin-bottom: 1em;
`

const H1_MainHeading = styled.h1`
  margin: ${themes.spacing.none};
  background-color: ${themes.color.dark};
  color: ${themes.color.bright};
`

const Card = styled.div`
  font-size: 3em;
  padding: ${themes.spacing.xs} ${themes.spacing.none};
`

const Div_ButtonWrapper = styled.div`
  background: ${themes.color.gradient};
  border: none;
  width: 8em;
  height: 3em;
  border-radius: 1em;

  margin: ${themes.spacing.none} auto;
  margin-top: ${themes.spacing.s};
  padding: 3px;
`

const Button = styled.button`
  background: ${themes.color.gradient};
  border: none;
  width: 8em;
  height: 3em;
  font-size: ${themes.fonts.s};
  font-weight: 900;
  color: ${themes.color.bright};
  border-radius: 1em;
  &:hover {
    background: ${themes.color.black};
  }
`
