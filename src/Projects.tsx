import { Link } from 'react-router-dom'
import { themes } from './themes'
import { urls } from './urls'
import styled from '@emotion/styled'

export const Projects = () => {
  return (
    <Div_Main>
      <H1_MainHeading>Projects</H1_MainHeading>
      <Div_ProjectContainer>
        <Link_LinkImg to={urls.jsHistory}>
          <Img_JS src={urls.images.jsHistory}></Img_JS>
        </Link_LinkImg>
        <Div_TextContainer>
          <H2_ProjectHeading>JS History</H2_ProjectHeading>
          <P_ProjectDescription>
            A simple static web application made with React classes split into 4 components. For
            styling I used Emotion Styled Components.
          </P_ProjectDescription>
        </Div_TextContainer>
      </Div_ProjectContainer>
      <Div_ProjectContainerReverse>
        <Link_LinkImg to={urls.todolist}>
          <Img_JS src={urls.images.Todo}></Img_JS>
        </Link_LinkImg>
        <Div_TextContainer>
          <H2_ProjectHeading>To-do list</H2_ProjectHeading>
          <P_ProjectDescription>
            A simple To-do list application made with React and Redux Toolkit for state management.
            You can filter between tasks via buttons above, complete or delete individual tasks,
            completed ones get a line through the text and a green tick mark. It is also possible to
            complete all at once and then delete everything that is marked as completed. For styling
            I used Emotion Styled Components.
          </P_ProjectDescription>
        </Div_TextContainer>
      </Div_ProjectContainerReverse>
      <Div_ProjectContainer>
        <Link_LinkImg to={urls.hackertyper}>
          <Img_JS src={urls.images.HackerTyper}></Img_JS>
        </Link_LinkImg>
        <Div_TextContainer>
          <H2_ProjectHeading>HackerTyper</H2_ProjectHeading>
          <P_ProjectDescription>
            A simple HackerTyper web application made with React and React hooks for state
            management. Application listens for keyDown events and according to which key was
            pressed, it either continues with slicing sample text, shows {`"Access Granted"`} on
            {`"shift"`} key press, {`"Access Denied"`} on {`"ctrl"`} key press or resets state of
            the whole application with {`"ESC"`}. For styling I used Emotion Styled Components.
          </P_ProjectDescription>
        </Div_TextContainer>
      </Div_ProjectContainer>
      <Div_ProjectContainerReverse>
        <Link_LinkImg to={urls.mortgage}>
          <Img_JS src={urls.images.Mortgage}></Img_JS>
        </Link_LinkImg>
        <Div_TextContainer>
          <H2_ProjectHeading>Mortgage Calculator</H2_ProjectHeading>
          <P_ProjectDescription>
            A simple Mortgage Calculator web application made with React, React hooks for state
            management and a composable charting library called Recharts. Depending on the user
            input, this application calculates total monthly payment, Amortization schedule
            breakdown table shows the amount of principal and interest the monthly payment is made
            of and the remaning loan. All of this is displayed on Payment charts. For styling I used
            Emotion Styled Components.
          </P_ProjectDescription>
        </Div_TextContainer>
      </Div_ProjectContainerReverse>
      <Div_ProjectContainer>
        <Link_LinkImg to={urls.memoryGame}>
          <Img_JS src={urls.images.MemoryGame}></Img_JS>
        </Link_LinkImg>
        <Div_TextContainer>
          <H2_ProjectHeading>Memory Game</H2_ProjectHeading>
          <P_ProjectDescription>
            A simple Cat Memory Game web application made with React and React hooks. For styling I
            used Emotion Styled Components.
          </P_ProjectDescription>
        </Div_TextContainer>
      </Div_ProjectContainer>
      <Div_ProjectContainerReverse>
        <Link_LinkImg to={urls.blog}>
          <Img_JS src={urls.images.Blog}></Img_JS>
        </Link_LinkImg>
        <Div_TextContainer>
          <H2_ProjectHeading>Blog app</H2_ProjectHeading>
          <P_ProjectDescription>
            Blog web application made with React, React hooks and web application framework
            Express.js for communicating with backend. User is able to create articles, if the
            conditions are met {`=>`} input fields can not be empty, click on individual articles
            from the list to look at the full version, from this point it is possible to delete or
            edit them. Due to the use of async functions and fetching, cards with {`"Loading..."`},
            or error messages are displayed. For styling I used Emotion Styled Components.
          </P_ProjectDescription>
        </Div_TextContainer>
      </Div_ProjectContainerReverse>
    </Div_Main>
  )
}

const H1_MainHeading = styled.h1`
  color: ${themes.color.dark};
  margin: ${themes.spacing.none} auto;
  width: max-content;
  font-size: 4rem;
  margin-bottom: 0.7em;
  border-top: 1px solid ${themes.color.dark};
  border-bottom: 1px solid ${themes.color.dark};
`
const Div_Main = styled.div`
  min-width: 360px;
  background-color: ${themes.color.bright};
  width: 99.1vw;
  padding-top: ${themes.spacing.m};
`

const Div_TextContainer = styled.div`
  flex: 1;
  text-align: center;
  padding: ${themes.spacing.s};
  @media (min-width: ${themes.mediaQuery.large}) {
    padding-top: ${themes.spacing.l};
  }
`

const Div_ProjectContainer = styled.div`
  border: 1px solid ${themes.color.dark};
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: ${themes.mediaQuery.medium}) {
    flex-direction: row;
  }
`
const Div_ProjectContainerReverse = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: ${themes.mediaQuery.medium}) {
    flex-direction: row-reverse;
  }
`

const H2_ProjectHeading = styled.h2`
  margin: ${themes.spacing.none};
  color: ${themes.color.dark};
  font-size: ${themes.fonts.m};
  @media (min-width: ${themes.mediaQuery.large}) {
    font-size: ${themes.fonts.xl};
  }
`

const P_ProjectDescription = styled.p`
  font-size: ${themes.fonts.s};
  color: ${themes.color.dark};
  @media (min-width: ${themes.mediaQuery.large}) {
    font-size: 1.3rem;
  }
`

const Link_LinkImg = styled(Link)`
  flex: 1;
`

const Img_JS = styled.img`
  width: 100%;
`
