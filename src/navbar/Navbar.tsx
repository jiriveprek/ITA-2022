import { Link, Outlet } from 'react-router-dom'
import { themes } from '../themes'
import { urls } from '../urls'
import React from 'react'
import styled from '@emotion/styled'

type Props = {}
type State = { isExtended: boolean }

export class Navbar extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = { isExtended: false }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState(prevState => ({
      isExtended: !prevState.isExtended,
    }))
  }

  render() {
    return (
      <NavbarContainer isExtended={this.state.isExtended}>
        <NavbarInnerContainer>
          <RightContainer>
            <NavbarLinkContainer>
              <NavbarLink to={urls.homepage}>Home</NavbarLink>
              <NavbarLink to={urls.projects}>Projects</NavbarLink>
              <NavbarLink to={urls.cv}>CV</NavbarLink>
              <OpenLinksButton onClick={this.handleClick}>
                {this.state.isExtended ? <>&#10005;</> : <>&#8801;</>}
              </OpenLinksButton>
            </NavbarLinkContainer>
          </RightContainer>
        </NavbarInnerContainer>
        {this.state.isExtended && (
          <NavbarExtendedContainer>
            <NavbarLinkExtended onClick={this.handleClick} to={urls.homepage}>
              Home
            </NavbarLinkExtended>
            <NavbarLinkExtended onClick={this.handleClick} to={urls.projects}>
              Projects
            </NavbarLinkExtended>
            <NavbarLinkExtended onClick={this.handleClick} to={urls.cv}>
              CV
            </NavbarLinkExtended>
          </NavbarExtendedContainer>
        )}
        <Outlet />
      </NavbarContainer>
    )
  }
}

type isExtendedNav = {
  isExtended: boolean
}

const NavbarContainer = styled.nav<isExtendedNav>`
  opacity: 99%;
  position: ${props => (props.isExtended ? 'absolute' : 'relative')};

  min-width: 360px;
  width: 100%;
  height: ${props => (props.isExtended ? 'max-content' : '80px')};

  border-bottom: 1px solid ${themes.color.bright};

  display: flex;
  flex-direction: column;
  z-index: 1000;
  background-color: ${themes.color.dark};

  @media (min-width: ${themes.mediaQuery.tabletNav}) {
    height: 80px;
    position: relative;
  }
`

const RightContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;

  padding-right: 50px;
  justify-content: flex-end;
`

const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`

const NavbarLinkContainer = styled.div`
  display: flex;
`

const NavbarLink = styled(Link)`
  color: ${themes.color.bright};
  font-size: ${themes.fonts.m};
  text-decoration: none;
  margin: 10px;

  @media (max-width: ${themes.mediaQuery.tabletNav}) {
    display: none;
  }
`

const NavbarLinkExtended = styled(Link)`
  color: ${themes.color.bright};
  font-size: x-large;
  text-decoration: none;
  margin: 10px;
`

const OpenLinksButton = styled.button`
  width: 70px;
  height: auto;
  background: none;
  border: none;
  color: ${themes.color.bright};
  font-size: 45px;
  cursor: pointer;

  @media (min-width: ${themes.mediaQuery.tabletNav}) {
    display: none;
  }
`

const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${themes.mediaQuery.tabletNav}) {
    display: none;
  }
`
