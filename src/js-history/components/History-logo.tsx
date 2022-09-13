/** @jsxImportSource @emotion/react */
import { themes } from '../../themes'
import React from 'react'
import styled from '@emotion/styled'

export class HistoryLogo extends React.Component {
  render() {
    return (
      <Div_Main>
        <Div_SectionHeading>
          <h2>
            The <Span_Accent>JS</Span_Accent> logo
          </h2>
        </Div_SectionHeading>

        <Section_Design>
          <Div_Divider>
            <H3_SubHeading>Design</H3_SubHeading>
            <P_Paragraph>
              The visual identity of the JavaScript logo is simple yet unique and easily
              recognizable by all. It is made up of a yellow shield with a bold monogram above it.
              This makes the JavaScript logo strong and highly professional. There are two shades of
              yellow used for the shield. This adds depth, volume, and dynamics to the JavaScript
              logo. left part of the shield makes use of a darker tint. On the other hand, the right
              is in a lighter tone of yellow.
            </P_Paragraph>
          </Div_Divider>

          <Div_DesignHistory>
            <H3_SubHeading>Design History</H3_SubHeading>
            <P_Paragraph>
              The JavaScript Logo which is currently being used was designed in 2011 and has a
              similar style as HTML and CSS logos. This was done as they are part of one company and
              only differ in color combinations and lettering. The color palette used for the
              JavaScript Logo provides a sense of progress and dynamicity while being friendly and
              pleasant at the same time. The logo shines upon the quality, loyalty, and reliability
              you will get from using JavaScript.
            </P_Paragraph>
          </Div_DesignHistory>
        </Section_Design>
      </Div_Main>
    )
  }
}

const Div_Main = styled.div`
  background: ${themes.color.bright};
  padding-bottom: ${themes.spacing.m};
`

const Div_SectionHeading = styled.div`
  padding: ${themes.spacing.s} ${themes.spacing.none};
  margin-bottom: ${themes.spacing.m};

  background: ${themes.color.dark};
  color: ${themes.color.bright};

  font-size: ${themes.fonts.xl};
`
const Div_DesignHistory = styled.div`
  padding: ${themes.spacing.none} ${themes.spacing.l};
`
const H3_SubHeading = styled.h3`
  @media (min-width: ${themes.mediaQuery.tablet}) {
    font-size: ${themes.fonts.xl};
  }
  @media (min-width: ${themes.mediaQuery.desktop}) {
    font-size: ${themes.fonts.xxl};
  }
`
const Span_Accent = styled.span`
  color: ${themes.color.yellow};
  display: inline;
`
const Section_Design = styled.section`
  @media (min-width: ${themes.mediaQuery.desktop}) {
    display: flex;
    max-width: 1600;
    margin: ${themes.spacing.none} auto;
  } ;
`
const P_Paragraph = styled.p`
  @media (min-width: ${themes.mediaQuery.tablet}) {
    font-size: ${themes.fonts.m};
  }
  @media (min-width: ${themes.mediaQuery.desktop}) {
    font-size: ${themes.fonts.l};
  }
`
const Div_Divider = styled.div`
  padding: ${themes.spacing.none} ${themes.spacing.l};
  @media (min-width: ${themes.mediaQuery.desktop}) {
    border-right: 2px solid ${themes.color.dark};
  }
`
