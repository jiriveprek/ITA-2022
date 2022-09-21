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
              <H1_MainHeading>
                History of <Span_Accent>JavaScript</Span_Accent>
              </H1_MainHeading>
              <Img_JsLogo src={icon} />
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
`

const H1_MainHeading = styled.h1`
  margin-top: ${themes.spacing.none};

  font-size: 3rem;

  color: ${themes.color.bright};
`

const Img_JsLogo = styled.img`
  width: 10em;
`

const Span_Accent = styled.span`
  color: ${themes.color.yellow};
`
