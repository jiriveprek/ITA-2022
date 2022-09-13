import { themes } from './themes'
import styled from '@emotion/styled'

export const CV = () => {
  return (
    <Div_Main>
      <Div_Content>
        <H1_MainHeading>Jiří Vepřek</H1_MainHeading>
        <H2_SubHeading>Contacts</H2_SubHeading>
        <P_SectionText>Uničov, Czech Republic</P_SectionText>
        <P_SectionText>+420 731 038 599</P_SectionText>
        <A_Link href='mailto: veprekj.jiri@outlook.com'>veprekj.jiri@outlook.com</A_Link>
        <H2_SubHeading>Skills</H2_SubHeading>
        <P_SectionText>
          React.js, Node.js, JavaScript,TypeScript, HTML, CSS, Styled Components, Git
        </P_SectionText>
        <H2_SubHeading>Education</H2_SubHeading>
        <H3_SectionSubHeading>Univerzita Palackého v Olomouci</H3_SectionSubHeading>
        <P_SectionText>2020-2022</P_SectionText>
        <H3_SectionSubHeading>
          Vyšší odborná škola a Střední průmyslová škola, Šumperk
        </H3_SectionSubHeading>
        <P_SectionText>2016 - 2020</P_SectionText>
        <H2_SubHeading>Courses</H2_SubHeading>
        <H3_SectionSubHeading>SmartBrains IT absolvent</H3_SectionSubHeading>
        <P_SectionText>6/2022 - 9/2022</P_SectionText>
        <P_SectionText>Frontend development mainly focused on React and TypeScript</P_SectionText>
        <H3_SectionSubHeading>The Frontend Developer Career Path, Scrimba</H3_SectionSubHeading>
        <P_SectionText>2022</P_SectionText>
        <H2_SubHeading>Language skills</H2_SubHeading>
        <P_SectionText>Czech - native language</P_SectionText>
        <P_SectionText>English - B2</P_SectionText>
      </Div_Content>
      <Footer_Footer></Footer_Footer>
    </Div_Main>
  )
}

const Div_Content = styled.div`
  padding-left: 15%;
  @media (max-width: ${themes.mediaQuery.tablet}) {
    padding-left: 5%;
  }
  @media (max-width: ${themes.mediaQuery.tabletNav}) {
    padding-left: 10%;
  }
`

const Div_Main = styled.div`
  width: 99.1vw;
  background-color: ${themes.color.bright};
`
const H1_MainHeading = styled.h1`
  margin-top: ${themes.spacing.none};
  margin-bottom: ${themes.spacing.none};
  font-size: 4rem;
  color: ${themes.color.dark};
  @media (max-width: ${themes.mediaQuery.tablet}) {
    font-size: 3rem;
  }
`
const H2_SubHeading = styled.h2`
  font-size: 3rem;
  margin-bottom: ${themes.spacing.none};
  margin-top: ${themes.spacing.xs};
  color: ${themes.color.dark};
  @media (max-width: ${themes.mediaQuery.tablet}) {
    font-size: ${themes.fonts.xl};
  }
`

const H3_SectionSubHeading = styled.h3`
  font-size: ${themes.fonts.xl};
  margin-bottom: ${themes.spacing.none};
  margin-left: ${themes.spacing.s};
  color: ${themes.color.dark};
  @media (max-width: ${themes.mediaQuery.tablet}) {
    font-size: ${themes.fonts.m};
  }
`

const P_SectionText = styled.p`
  font-size: ${themes.fonts.m};
  margin-left: 1.5em;
  color: ${themes.color.dark};
  @media (max-width: ${themes.mediaQuery.tablet}) {
    font-size: 1.3rem;
  }
`
const A_Link = styled.a`
  font-size: ${themes.fonts.m};
  margin-left: 1.5em;
  @media (max-width: ${themes.mediaQuery.tablet}) {
    font-size: 1.3rem;
  }
`
const Footer_Footer = styled.footer`
  margin-top: ${themes.spacing.m};
  padding: ${themes.spacing.m};

  background: ${themes.color.dark};
`
