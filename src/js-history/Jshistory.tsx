/** @jsxImportSource @emotion/react */
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { History } from './components/History'
import { HistoryFlex } from './components/History-flex'
import { HistoryLogo } from './components/History-logo'
import { ThemeProvider } from '@emotion/react'
import { themes } from '../themes'
import React from 'react'
import icon from './JS.png'
import styled from '@emotion/styled'

export class JSHistory extends React.Component {
  render() {
    return (
      <HelmetProvider>
        <ThemeProvider theme={themes}>
          <Helmet>
            <title>Jiří Vepřek | JS History</title>
          </Helmet>
          <Body>
            <Header>
              <h1 css={{ marginTop: themes.spacing.none }}>
                History of <Accent>JavaScript</Accent>
              </h1>
              <img src={icon} css={{ width: '10em' }} />
            </Header>

            <History />
            <HistoryLogo />
            <HistoryFlex />
          </Body>
        </ThemeProvider>
      </HelmetProvider>
    )
  }
}

const Body = styled.div`
  min-width: 360px;
  text-align: center;
`
const Header = styled.header`
  padding: ${themes.spacing.l} ${themes.spacing.xs};
  background: ${themes.color.dark};
  color: ${themes.color.bright};
  font-size: ${themes.fonts.xl};
`
const Accent = styled.span`
  color: ${themes.color.yellow};
  display: inline;
`
