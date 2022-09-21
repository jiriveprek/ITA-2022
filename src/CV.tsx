import { Helmet, HelmetProvider } from 'react-helmet-async'
import { themes } from './themes'
import styled from '@emotion/styled'

export const CV = () => {
  return (
    <HelmetProvider>
      <Div_Main>
        <Helmet>
          <title>Jiří Vepřek | CV</title>
        </Helmet>
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
      </Div_Main>
    </HelmetProvider>
  )
}

const Div_Main = styled.div`
  height: 200vh;
  background-color: ${themes.color.bright};
`

const Div_Content = styled.div`
  padding-left: 15%;
  @media (max-width: ${themes.mediaQuery.tablet}) {
    padding-left: 5%;
  }
  @media (max-width: ${themes.mediaQuery.tabletNav}) {
    padding-left: 10%;
  }
`

const H1_MainHeading = styled.h1`
  margin-top: ${themes.spacing.none};
  margin-bottom: ${themes.spacing.none};

  font-size: 2.5rem;

  color: ${themes.color.dark};

  @media (max-width: ${themes.mediaQuery.tablet}) {
    font-size: ${themes.fonts.xl};
  }
`
const H2_SubHeading = styled.h2`
  margin-bottom: ${themes.spacing.none};
  margin-top: ${themes.spacing.xs};

  font-size: ${themes.fonts.xl};

  color: ${themes.color.dark};

  @media (max-width: ${themes.mediaQuery.tablet}) {
    font-size: ${themes.fonts.m};
  }
`

const H3_SectionSubHeading = styled.h3`
  margin-bottom: ${themes.spacing.none};
  margin-left: ${themes.spacing.s};

  font-size: ${themes.fonts.m};

  color: ${themes.color.dark};

  @media (max-width: ${themes.mediaQuery.tablet}) {
    font-size: ${themes.fonts.s};
  }
`

const P_SectionText = styled.p`
  margin-left: 1.5em;

  font-size: 1.3rem;

  color: ${themes.color.dark};

  @media (max-width: ${themes.mediaQuery.tablet}) {
    font-size: ${themes.fonts.s};
  }
`
const A_Link = styled.a`
  font-size: 1.3rem;
  margin-left: 1.5em;
  @media (max-width: ${themes.mediaQuery.tablet}) {
    font-size: ${themes.fonts.s};
  }
`
