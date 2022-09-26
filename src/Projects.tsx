import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { themes } from './themes'
import { urls } from './urls'
import styled from '@emotion/styled'

export const Projects = () => {
  return (
    <HelmetProvider>
      <Div_Main>
        <Helmet>
          <title>Jiří Vepřek | Projects</title>
        </Helmet>
        <H1_MainHeading>PROJECTS</H1_MainHeading>
        <Div_ProjectsContainer>
          <Div_Card>
            <Div_CardHeader>
              <P_CardText>JS History</P_CardText>
              <a href={urls.gitHub.jsHistory}>
                <img src={urls.images.gitHubLight}></img>
              </a>
            </Div_CardHeader>
            <Link_CardLink to={urls.jsHistory}>
              <Img_ProjectImg src={urls.images.jsHistory}></Img_ProjectImg>
            </Link_CardLink>
          </Div_Card>

          <Div_Card>
            <Div_CardHeader>
              <P_CardText>To-do list</P_CardText>
              <a href={urls.gitHub.todolist}>
                <img src={urls.images.gitHubLight}></img>
              </a>
            </Div_CardHeader>
            <Link_CardLink to={urls.todolist}>
              <Img_ProjectImg src={urls.images.Todo}></Img_ProjectImg>
            </Link_CardLink>
          </Div_Card>

          <Div_Card>
            <Div_CardHeader>
              <P_CardText>HackerTyper</P_CardText>
              <a href={urls.gitHub.hackertyper}>
                <img src={urls.images.gitHubLight}></img>
              </a>
            </Div_CardHeader>
            <Link_CardLink to={urls.hackertyper}>
              <Img_ProjectImg src={urls.images.HackerTyper}></Img_ProjectImg>
            </Link_CardLink>
          </Div_Card>

          <Div_Card>
            <Div_CardHeader>
              <P_CardText>Mortgage Calculator</P_CardText>
              <a href={urls.gitHub.mortgage}>
                <img src={urls.images.gitHubLight}></img>
              </a>
            </Div_CardHeader>
            <Link_CardLink to={urls.mortgage}>
              <Img_ProjectImg src={urls.images.Mortgage}></Img_ProjectImg>
            </Link_CardLink>
          </Div_Card>

          <Div_Card>
            <Div_CardHeader>
              <P_CardText>Memory Game</P_CardText>
              <a href={urls.gitHub.memoryGame}>
                <img src={urls.images.gitHubLight}></img>
              </a>
            </Div_CardHeader>
            <Link_CardLink to={urls.memoryGame}>
              <Img_ProjectImg src={urls.images.MemoryGame}></Img_ProjectImg>
            </Link_CardLink>
          </Div_Card>

          <Div_Card>
            <Div_CardHeader>
              <P_CardText>Blog</P_CardText>
              <a href={urls.gitHub.blog}>
                <img src={urls.images.gitHubLight}></img>
              </a>
            </Div_CardHeader>
            <Link_CardLink to={urls.blog}>
              <Img_ProjectImg src={urls.images.Blog}></Img_ProjectImg>
            </Link_CardLink>
          </Div_Card>
        </Div_ProjectsContainer>
      </Div_Main>
    </HelmetProvider>
  )
}

const Div_Main = styled.div`
  padding-top: ${themes.spacing.m};

  min-width: 360px;
`

const H1_MainHeading = styled.h1`
  margin: ${themes.spacing.none} auto;

  width: max-content;

  font-size: 4rem;
  color: ${themes.color.dark};

  border-top: 1px solid ${themes.color.dark};
  border-bottom: 1px solid ${themes.color.dark};
`

const Div_ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1em;

  padding: 2em;
  margin: 0 auto;

  max-width: 1200px;
`

const Div_Card = styled.div`
  position: relative;

  justify-self: center;

  width: 350px;

  border: 1px solid ${themes.color.dark};
  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`

const Div_CardHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  background-color: ${themes.color.dark};
`

const Img_ProjectImg = styled.img`
  filter: grayscale(60%);

  opacity: 50%;

  height: 250px;
  width: 100%;
`

const P_CardText = styled.p`
  text-align: center;

  color: ${themes.color.bright};

  font-weight: 700;
`

const Link_CardLink = styled(Link)`
  display: block;

  text-decoration: none;

  line-height: 0;
`
