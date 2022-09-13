import { ArticleDetailsContext } from './ArticleDetailsContext'
import { BlogContext } from '../articles/BlogContext'
import { hold } from '../../utils/utils'
import { services } from '../../utils/serviceLayer'
import { themes } from '../../themes'
import { urls } from '../../urls'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import styled from '@emotion/styled'

export const Details = () => {
  const logic = useContext(ArticleDetailsContext)
  const navigate = useNavigate()

  return (
    <div>
      {logic.loading ? (
        <Div_DetailMsgContainer>Loading...</Div_DetailMsgContainer>
      ) : logic.errMsg ? (
        <Div_ErrorDetailsMsg>{logic.errMsg}</Div_ErrorDetailsMsg>
      ) : logic.updateErr ? (
        <Div_DetailMsgContainer>{logic.updateErr}</Div_DetailMsgContainer>
      ) : logic.deleteErr ? (
        <Div_DetailMsgContainer>{logic.deleteErr}</Div_DetailMsgContainer>
      ) : logic.editing ? (
        <Div_NewArticleWrapper>
          <H2_SubHeading>Editing article</H2_SubHeading>
          <form
            onSubmit={async e => {
              e.preventDefault()
              logic.submitValidation(logic.title, logic.content)
            }}
          >
            <div>
              <Input_ArticleTitle
                placeholder='Your New Title'
                value={logic.title}
                onChange={e => logic.setTitle(e.target.value)}
              />
              {logic.titleErr ? <Div_ErrorMsg>{logic.titleErr}</Div_ErrorMsg> : null}
              <TextArea_ArticleContent
                placeholder='Your new thoughts...'
                value={logic.content}
                onChange={e => logic.setContent(e.target.value)}
              />
              {logic.titleErr ? <Div_ErrorMsg>{logic.contentErr}</Div_ErrorMsg> : null}
            </div>

            <Button_SaveArticle type='submit'>Save article</Button_SaveArticle>
          </form>
        </Div_NewArticleWrapper>
      ) : logic.updateErr ? (
        <Div_DetailMsgContainer>{logic.updateErr}</Div_DetailMsgContainer>
      ) : (
        <Div_ArticleDetails>
          <H2_DetailedSubHeading>{logic.detailedArticle.title}</H2_DetailedSubHeading>
          <div>
            {logic.detailedArticle && (
              <ReactMarkdown>{logic.detailedArticle.content}</ReactMarkdown>
            )}
          </div>
          <Div_ButtonsContainer>
            <Button_EditArticle onClick={() => logic.setEditing(true)}>Update</Button_EditArticle>
            <Button_DeleteArticle
              onClick={async () => {
                await logic.deleteArticle()
                await hold(2000)
                navigate(urls.blog)
              }}
            >
              Delete
            </Button_DeleteArticle>
          </Div_ButtonsContainer>
        </Div_ArticleDetails>
      )}
    </div>
  )
}

const Div_DetailMsgContainer = styled.div`
  margin: 0 auto;
  margin-top: 5em;
  padding: 2em;

  box-sizing: border-box;

  width: max-content;

  font-size: 1rem;

  background-color: ${themes.color.dark};

  @media (min-width: 560px) {
    font-size: 2rem;
  }
`

const Div_NewArticleWrapper = styled.div`
  margin: 0 auto;
  padding-left: ${themes.spacing.s};
  padding-right: ${themes.spacing.s};

  max-width: 700px;
`

const Div_ArticleDetails = styled.div`
  padding: ${themes.spacing.none} ${themes.spacing.s};

  color: ${themes.color.dark};
`
const H2_SubHeading = styled.h2`
  color: ${themes.color.dark};
  width: max-content;
  margin: 0.5em auto;
  font-size: 1.75rem;
  border-bottom: 1px solid ${themes.color.dark};
`

const H2_DetailedSubHeading = styled.h2`
  color: ${themes.color.dark};
`
const Input_ArticleTitle = styled.input`
  width: 100%;
  box-sizing: border-box;

  border: none;

  font-size: 1.5rem;
  background-color: transparent;
`
const TextArea_ArticleContent = styled.textarea`
  resize: none;

  box-sizing: border-box;

  width: 100%;
  height: 20em;

  border: none;

  font-size: 1rem;

  background-color: transparent;
`

const Div_ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 560px) {
    flex-direction: row;
  }
`

const Div_ErrorDetailsMsg = styled.div`
  margin: 0 auto;
  margin-top: 5em;
  padding: 2em;

  box-sizing: border-box;

  width: max-content;

  font-size: 1rem;

  background-color: ${themes.color.dark};

  @media (min-width: 560px) {
    font-size: 2rem;
  }
`

const Div_ErrorMsg = styled.div`
  padding: ${themes.spacing.xs} ${themes.spacing.none};
  margin: ${themes.spacing.none} ${themes.spacing.none};

  box-sizing: border-box;

  width: max-content;

  font-weight: 700;

  color: ${themes.color.darkred};
  background-color: ${themes.color.bright};
`

const Button_SaveArticle = styled.button`
  display: block;
  padding: ${themes.spacing.s} ${themes.spacing.xs};
  margin: ${themes.spacing.s} auto;

  transition: color 0.5s, background-color 0.5s;

  border: 1px solid transparent;

  width: 10em;

  font-weight: 700;

  color: ${themes.color.bright};
  background-color: ${themes.color.dark};

  &:active,
  :hover {
    transition: ease-out;
    color: ${themes.color.dark};
    border: 1px solid ${themes.color.dark};
    background-color: ${themes.color.bright};
  }
  @media (max-width: ${themes.mediaQuery.tablet}) {
    width: 100%;
  }
`

const Button_EditArticle = styled.button`
  display: block;
  padding: ${themes.spacing.s} ${themes.spacing.xs};
  margin: ${themes.spacing.s} auto;

  transition: color 0.5s, background-color 0.5s;

  border: 2px solid transparent;

  width: 10em;

  font-weight: 700;

  color: ${themes.color.bright};
  background-color: ${themes.color.dark};

  &:active,
  :hover {
    transition: ease-out;
    color: ${themes.color.dark};
    border: 2px solid ${themes.color.dark};
    background-color: ${themes.color.green};
  }
  @media (max-width: ${themes.mediaQuery.tablet}) {
    width: 100%;
    margin-bottom: ${themes.spacing.none};
  }
`

const Button_DeleteArticle = styled.button`
  display: block;
  padding: ${themes.spacing.s} ${themes.spacing.xs};
  margin: ${themes.spacing.s} auto;

  transition: color 0.5s, background-color 0.5s;

  border: 2px solid transparent;

  width: 10em;

  font-weight: 700;

  color: ${themes.color.bright};
  background-color: ${themes.color.dark};

  &:active,
  :hover {
    transition: ease-out;
    border: 2px solid ${themes.color.dark};
    background-color: ${themes.color.darkred};
  }
  @media (max-width: ${themes.mediaQuery.tablet}) {
    width: 100%;
  }
`
