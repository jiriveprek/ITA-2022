import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import { themes } from './themes'
import { urls } from './urls'
import styled from '@emotion/styled'

export const Homepage = () => {
  return (
    <HelmetProvider>
      <Div_Main>
        <Helmet>
          <title>Jiří Vepřek | Home</title>
        </Helmet>
        <H1_MainHeading>MY PORTFOLIO</H1_MainHeading>
        <div>
          <div>
            <Img_ProfilePic src={urls.images.profilePic}></Img_ProfilePic>
          </div>
          <div>
            <P_WelcomeText>
              Welcome to my portfolio{' '}
              <Span_NewLine>
                made in <Span_Embolden>React</Span_Embolden>
              </Span_NewLine>
            </P_WelcomeText>
            <Div_Line></Div_Line>
            <P_Text>
              My name is <Span_Embolden>Jiří Vepřek</Span_Embolden>
            </P_Text>
            <P_Text>I am a Web Developer</P_Text>
          </div>
        </div>
      </Div_Main>
    </HelmetProvider>
  )
}
const Div_Line = styled.div`
  background-color: ${themes.color.dark};
  width: 15em;
  padding: 0.5px ${themes.spacing.none};
  margin: ${themes.spacing.none} auto;
`
const Span_Embolden = styled.span`
  font-weight: 700;
`
const Span_NewLine = styled.span`
  display: block;
`
const Div_Main = styled.div`
  min-width: 360px;
  background-color: ${themes.color.bright};
  padding-top: 2em;
  height: 110vh;
`

const H1_MainHeading = styled.h1`
  color: ${themes.color.dark};
  margin: ${themes.spacing.none} auto;

  width: max-content;
  font-size: 3rem;
  margin-bottom: 0.4em;
  border-top: 1px solid ${themes.color.dark};
  border-bottom: 1px solid ${themes.color.dark}; ;
`

const P_Text = styled.p`
  color: ${themes.color.dark};
  text-align: center;
  font-size: ${themes.fonts.xl};
  margin-bottom: -1em;
`

const P_WelcomeText = styled.p`
  color: ${themes.color.dark};
  text-align: center;
  font-size: ${themes.fonts.xl};
`

const Img_ProfilePic = styled.img`
  width: 22em;
  margin: ${themes.spacing.none} auto;
  display: block;
`
