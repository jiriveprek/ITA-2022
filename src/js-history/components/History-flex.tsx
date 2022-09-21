import { themes } from '../../themes'
import React from 'react'
import styled from '@emotion/styled'

export class HistoryFlex extends React.Component {
  render() {
    return (
      <Div_Main>
        <Div_SectionHeading>
          <h2>Flexbox Graph</h2>
        </Div_SectionHeading>

        <Div_FlexContainer>
          <Div_FlexItem value='100%'></Div_FlexItem>
          <Div_FlexItem value='85%'></Div_FlexItem>
          <Div_FlexItem value='49%'></Div_FlexItem>
          <Div_FlexItem value='78%'></Div_FlexItem>
          <Div_FlexItem value='10%'></Div_FlexItem>
        </Div_FlexContainer>

        <Footer_Footer></Footer_Footer>
      </Div_Main>
    )
  }
}

const Div_Main = styled.div`
  background: ${themes.color.bright};
`

const Div_SectionHeading = styled.div`
  padding: ${themes.spacing.s} ${themes.spacing.none};
  margin-bottom: ${themes.spacing.m};

  background: ${themes.color.dark};
  color: ${themes.color.bright};

  font-size: ${themes.fonts.m};
`

const Div_FlexContainer = styled.div`
  max-width: 1060;
  margin: ${themes.spacing.none} auto;
  padding: ${themes.spacing.none} ${themes.spacing.l};

  background-color: ${themes.color.bright};

  width: 50%;
  height: 300px;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: ${themes.spacing.xs};

  border-bottom: 5px solid ${themes.color.yellow};
`
type HeightValue = {
  value: string
}

const Div_FlexItem = styled.div<HeightValue>`
  width: 14%;
  background-color: ${themes.color.dark};
  height: ${props => props.value};
`

const Footer_Footer = styled.footer`
  margin-top: ${themes.spacing.m};
  padding: ${themes.spacing.m};

  background: ${themes.color.dark};
`
