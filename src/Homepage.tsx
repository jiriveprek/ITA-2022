import { themes } from './themes'
import { urls } from './urls'
import styled from '@emotion/styled'

export const Homepage = () => {
  return (
    <Div_Main>
      <H1_MainHeading>My Portfolio</H1_MainHeading>
      <div>
        <div>
          <Img_ProfilePic src={urls.images.profilePic}></Img_ProfilePic>
        </div>
        <div>
          <P_Text>
            Welcome to my portfolio made in <Span_Embolden>React</Span_Embolden>
          </P_Text>
          <P_Text>
            My name is <Span_Embolden>Jiří Vepřek</Span_Embolden>
          </P_Text>
          <P_Text>I am a Web Developer</P_Text>
        </div>
      </div>
    </Div_Main>
  )
}

const Span_Embolden = styled.span`
  font-weight: 700;
`

const Div_Main = styled.div`
  min-width: 360px;
  background-color: ${themes.color.bright};
  padding-top: 2em;
  height: 87.8vh;
`

const H1_MainHeading = styled.h1`
  color: ${themes.color.dark};
  margin: ${themes.spacing.none} auto;
  width: max-content;
  font-size: 3rem;
  margin-bottom: 0.2em;
  border-top: 1px solid ${themes.color.dark};
  border-bottom: 1px solid ${themes.color.dark}; ;
`

const P_Text = styled.p`
  color: ${themes.color.dark};
  text-align: center;
  font-size: ${themes.fonts.xl};
  margin: 0.3em;
`

const Img_ProfilePic = styled.img`
  width: 15em;
  margin: ${themes.spacing.none} auto;
  display: block;
`
