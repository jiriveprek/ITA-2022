import { NewArticleContext } from './NewArticleContext'
import { themes } from '../../themes'
import React, { useContext, useState } from 'react'
import styled from '@emotion/styled'

export const NewArticle = () => {
  const logic = useContext(NewArticleContext)

  return (
    <div>
      <Div_NewArticleWrapper>
        <H2_SubHeading>Create new article</H2_SubHeading>
        {logic.loading ? (
          <Div_PostMsgContainer>Posting...</Div_PostMsgContainer>
        ) : logic.postErr ? (
          <Div_PostMsgContainer>{logic.postErr}</Div_PostMsgContainer>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault()
              logic.submitValidation(logic.title, logic.content)
            }}
          >
            <div>
              <Input_ArticleTitle
                placeholder='Your Title'
                value={logic.title}
                onChange={e => logic.setTitle(e.target.value)}
              />
              {logic.titleErr ? <Div_ErrorMsg>{logic.titleErr}</Div_ErrorMsg> : null}
              <TextAre_ArticleContent
                placeholder='Share your thoughts...'
                value={logic.content}
                onChange={e => logic.setContent(e.target.value)}
              />
              {logic.contentErr ? <Div_ErrorMsg>{logic.contentErr}</Div_ErrorMsg> : null}
            </div>
            <Button_SaveArticle type='submit'>Save article</Button_SaveArticle>
          </form>
        )}
      </Div_NewArticleWrapper>
    </div>
  )
}

const Div_NewArticleWrapper = styled.div`
  margin: 0 auto;
  padding-left: ${themes.spacing.s};
  padding-right: ${themes.spacing.s};

  max-width: 700px;
`

const Div_PostMsgContainer = styled.div`
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

  @media (max-width: ${themes.mediaQuery.tablet}) {
    width: 100%;
  }
`

const H2_SubHeading = styled.h2`
  color: ${themes.color.dark};
  width: max-content;
  margin: 0.5em auto;
  font-size: 1.75rem;
  border-bottom: 1px solid ${themes.color.dark};
`

const Input_ArticleTitle = styled.input`
  width: 100%;
  box-sizing: border-box;

  border: none;

  font-size: 1.5rem;
  background-color: transparent;
`

const TextAre_ArticleContent = styled.textarea`
  resize: none;

  box-sizing: border-box;

  width: 100%;
  height: 20em;

  border: none;

  font-size: 1rem;

  background-color: transparent;
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
