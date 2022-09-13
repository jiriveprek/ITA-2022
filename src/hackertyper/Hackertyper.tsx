import { HackerText } from './HackerText'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { themes } from '../themes'
import React, { useState } from 'react'
import styled from '@emotion/styled'

export const Hackertyper = () => {
  const [textPosition, setTextPosition] = useState(0)
  const [accessVerdict, setAccessVerdict] = useState<'Access Granted' | 'Access Denied' | null>(
    null
  )

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (e.shiftKey) {
      setAccessVerdict('Access Granted')
    } else if (e.ctrlKey) {
      setAccessVerdict('Access Denied')
    } else if (e.key === 'Escape') {
      setAccessVerdict(null)
    }
  }

  return (
    <HelmetProvider>
      <Div_Main>
        <Helmet>
          <title>Jiří Vepřek | Hacker Typer</title>
        </Helmet>
        <Textarea_Wrapper
          spellCheck={false}
          autoFocus={true}
          value={
            textPosition === 0
              ? 'Start typing to initiate coding... Press "Shift" to gain access, "Ctrl" to be denied and "ESC" to clear state'
              : HackerText.slice(0, textPosition)
          }
          onChange={() => setTextPosition(textPosition >= HackerText.length ? 0 : textPosition + 5)}
          onKeyDown={keyDownHandler}
        />
        {accessVerdict && (
          <Div_StateContainer accessVerdict={accessVerdict}>
            <h2>{accessVerdict === 'Access Granted' ? accessVerdict : accessVerdict}</h2>
          </Div_StateContainer>
        )}
      </Div_Main>
    </HelmetProvider>
  )
}

const Div_Main = styled.div`
  overflow: hidden;

  position: relative;

  min-width: 360px;
  height: 100vh;

  background-color: ${themes.color.dark};
`

const Textarea_Wrapper = styled.textarea`
  resize: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  &:focus {
    outline: none;
  }

  padding: ${themes.spacing.s};

  border: none;

  width: 98.5%;
  height: 88.9vh;
  min-width: 360px;

  background-color: inherit;
  color: ${themes.color.green};
`

const Div_StateContainer = styled.div<{ accessVerdict: string }>`
  position: absolute;
  top: 30%;
  left: 45%;

  padding: ${themes.spacing.s};

  border-radius: 5%;

  background-color: ${props =>
    props.accessVerdict === 'Access Granted' ? `${themes.color.green}` : `${themes.color.darkred}`};
`
