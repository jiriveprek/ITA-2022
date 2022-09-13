/** @jsxImportSource @emotion/react */
import { themes } from '../../themes'
import React from 'react'
import styled from '@emotion/styled'

export class History extends React.Component {
  render() {
    return (
      <Div_Main>
        <Div_TextContainer>
          <H3_SubHeading>JavaScript History</H3_SubHeading>
          <P_Paragraph>
            It was created in 1995 by a Netscape Communication Corporation programmer, Brendan Eich.
            Apparently, it took him about 10 days to develop Mocha. Later on, the language name was
            changed to Mona and then to LiveScript. Currently, it is widely known as JavaScript. In
            1996, JavaScript was taken over by ECMA which provided JavaScript with ECMAScript
            Language Specification and ECMAScript Internationalized API specifications. Then by
            2005, Eich and Mozilla joined ECMA and the JavaScript community flourished. By 2016, 92%
            of the website made use of JavaScript, from huge tech giants like Facebook and Google to
            small start-ups.
          </P_Paragraph>
        </Div_TextContainer>
      </Div_Main>
    )
  }
}

const Div_Main = styled.div`
  padding: ${themes.spacing.l};
  background: ${themes.color.bright};
`

const Div_TextContainer = styled.div`
  max-width: 1060px;
  margin: ${themes.spacing.none} auto;
`
const P_Paragraph = styled.p`
  @media (min-width: ${themes.mediaQuery.tablet}) {
    font-size: ${themes.fonts.m};
  }
  @media (min-width: ${themes.mediaQuery.desktop}) {
    font-size: ${themes.fonts.l};
  }
`
const H3_SubHeading = styled.h3`
  @media (min-width: ${themes.mediaQuery.tablet}) {
    font-size: ${themes.fonts.xl};
  }
  @media (min-width: ${themes.mediaQuery.desktop}) {
    font-size: ${themes.fonts.xxl};
  }
`
