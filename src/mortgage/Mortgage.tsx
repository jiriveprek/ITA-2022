import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { czkFormatting, roundTwoDecimals } from '../utils/utils'
import { themes } from '../themes'
import React, { useState } from 'react'
import styled from '@emotion/styled'

const calculateMortgage = (arg: {
  principalLoanAmount: number
  interest: number
  loanTerm: number
}) => {
  const amount = arg.principalLoanAmount ? arg.principalLoanAmount : 0
  const percent = arg.interest ? arg.interest / 100 / 12 : 0
  const months = arg.loanTerm * 12

  if (amount > 0 && percent > 0 && months > 0) {
    return (
      amount * ((percent * Math.pow(1 + percent, months)) / (Math.pow(1 + percent, months) - 1))
    )
  } else if (amount > 0 && months > 0) {
    return amount / months
  }
  return 0
}

const detailedCalculation = (arg: {
  principalLoanAmount: number
  interest: number
  loanTerm: number
}) => {
  const monthlyPay = calculateMortgage(arg)
  const months = arg.loanTerm ? arg.loanTerm * 12 : 0
  const rate = arg.interest ? arg.interest / 100 / 12 : 0
  const rest = arg.principalLoanAmount ? arg.principalLoanAmount : 0

  const firstInterest = rate * rest
  const firstPrincipal = monthlyPay - firstInterest
  const firtRest = rest - firstPrincipal

  const monthlyData = [
    {
      interest: firstInterest,
      principal: firstPrincipal,
      remainingLoan: firtRest,
    },
  ]
  for (let i = 1; i < months; i++) {
    monthlyData.push({
      interest: rate * monthlyData[i - 1].remainingLoan,
      principal: monthlyPay - rate * monthlyData[i - 1].remainingLoan,
      remainingLoan:
        monthlyData[i - 1].remainingLoan - (monthlyPay - rate * monthlyData[i - 1].remainingLoan),
    })

    //The remaining value at the end shows -0
    if (i === months - 1) {
      monthlyData[i].remainingLoan = 0
    }
  }
  return monthlyData
}

const displayTime = (index: number) => {
  let year = Math.ceil((index + 1) / 12)
  const month = year > 1 ? index + 1 - 12 * (year - 1) : index + 1
  return `${year}/${month}`
}

//https://www.omnicalculator.com/finance/appreciation#how-to-calculate-appreciation
const calculatePropertyValue = (arg: {
  principalLoanAmount: number
  loanTerm: number
  inflation: number
}) => {
  const propertyValueIncrease = [{ propertyValue: arg.principalLoanAmount }]
  for (let i = 1; i <= arg.loanTerm; i++) {
    propertyValueIncrease.push({
      propertyValue: arg.principalLoanAmount * (arg.inflation / 100 + 1) ** i,
    })
  }
  return propertyValueIncrease
}

type Data = {
  interest: number
  principal: number
  remainingLoan: number
}

//https://www.financevpraxi.cz/finance-vyber-financniho-produktu
const monthlyInflation = (amount: number, month: number, yearInflation: number) =>
  amount * (1 + -yearInflation / 100) ** (month / 12) - 1

const inflatedDetailedCalc = (data: Data[], inf: number) => {
  return data.map((items, index) => ({
    interest: monthlyInflation(items.interest, index, inf),
    principal: monthlyInflation(items.principal, index, inf),
    remainingLoan: monthlyInflation(items.remainingLoan, index, inf),
  }))
}

const getChartData = (data: Data[]) =>
  data.map(items => ({
    interest: roundTwoDecimals(items.interest),
    principal: roundTwoDecimals(items.principal),
    remainingLoan: roundTwoDecimals(items.remainingLoan),
  }))

const getChartPropertyValue = (data: { propertyValue: number }[]) => {
  return data.map(items => ({
    propertyValue: roundTwoDecimals(items.propertyValue),
  }))
}

export const MortgageCalculator = () => {
  const [principalLoanAmount, setPrincipalLoanAmount] = useState(1_000_000)
  const [interest, setInterest] = useState(5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [inflation, setInflation] = useState(5)

  const details = detailedCalculation({ principalLoanAmount, interest, loanTerm })
  const inflatedDetails = inflatedDetailedCalc(details, inflation)
  const chartData = getChartData(details)
  const inflatedChartData = getChartData(inflatedDetails)

  const propertyValueIncrease = calculatePropertyValue({
    principalLoanAmount,
    loanTerm,
    inflation,
  })
  const propertyValueChartData = getChartPropertyValue(propertyValueIncrease)

  return (
    <HelmetProvider>
      <Div_Main>
        <Helmet>
          <title>Jiří Vepřek | Mortgage Calculator</title>
        </Helmet>
        <H1_Heading>Mortgage calculator</H1_Heading>
        <Div_InputsContainer>
          <P_InputTitle>Loan amount (CZK):</P_InputTitle>
          <Input_InputField
            required
            step={1000}
            placeholder='Loan amount'
            value={principalLoanAmount}
            min={1000}
            type='number'
            onChange={e => {
              setPrincipalLoanAmount(parseInt(e.target.value))
            }}
          />
          <P_InputTitle>Interest (%):</P_InputTitle>
          <Input_InputField
            required
            step={0.1}
            placeholder='Interest'
            value={interest}
            min={0.1}
            type='number'
            onChange={e => {
              setInterest(parseFloat(e.target.value))
            }}
          />
          <P_InputTitle>Number of years (years):</P_InputTitle>
          <Input_InputField
            required
            step={1}
            placeholder='Number of years'
            value={loanTerm}
            min={1}
            type='number'
            onChange={e => {
              setLoanTerm(parseInt(e.target.value))
            }}
          />
          <P_InputTitle>Inflation (%):</P_InputTitle>
          <Input_InputField
            required
            step={0.1}
            placeholder='Inflation'
            value={inflation}
            min={0.1}
            type='number'
            onChange={e => {
              setInflation(parseInt(e.target.value))
            }}
          />
        </Div_InputsContainer>
        <Div_MonthlyPayment>
          Total monthly payment
          <Span_Amount>
            {czkFormatting(calculateMortgage({ principalLoanAmount, interest, loanTerm }))}
          </Span_Amount>
        </Div_MonthlyPayment>
        <Div_TableChartContainer>
          <div>
            <H2_Subheadings>Amortization schedule breakdown</H2_Subheadings>
            <Table_StyledTable>
              <thead>
                <tr>
                  <th>Year / Month</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {details?.map((tableRow, index) => (
                  <tr key={index}>
                    <Td_StyledTd>{displayTime(index)}.</Td_StyledTd>
                    <Td_StyledTd>{czkFormatting(tableRow.principal)}</Td_StyledTd>
                    <Td_StyledTd>{czkFormatting(tableRow.interest)}</Td_StyledTd>
                    <Td_StyledTd>{czkFormatting(tableRow.remainingLoan)}</Td_StyledTd>
                  </tr>
                ))}
              </tbody>
            </Table_StyledTable>
          </div>
          <Div_PaymentCharts>
            <H2_Subheadings>Payment charts</H2_Subheadings>
            <LineChart width={360} height={300} data={chartData}>
              <XAxis dataKey=' ' />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke={themes.color.bright} strokeDasharray='5 5' />
              <Line type='monotone' dataKey='remainingLoan' stroke={themes.color.darkred} />
            </LineChart>

            <LineChart width={360} height={300} data={chartData}>
              <XAxis dataKey=' ' />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke={themes.color.bright} strokeDasharray='5 5' />
              <Line type='monotone' dataKey='principal' stroke={themes.color.jazzberryJam} />
              <Line type='monotone' dataKey='interest' stroke={themes.color.dukeBlue} />
            </LineChart>
          </Div_PaymentCharts>
        </Div_TableChartContainer>

        <H2_Subheadings>Payment charts with inflation</H2_Subheadings>
        <Div_InflatedCharts>
          <LineChart width={360} height={300} data={inflatedChartData}>
            <XAxis dataKey=' ' />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke={themes.color.bright} strokeDasharray='5 5' />
            <Line type='monotone' dataKey='remainingLoan' stroke={themes.color.darkred} />
          </LineChart>

          <LineChart width={360} height={300} data={inflatedChartData}>
            <XAxis dataKey=' ' />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke={themes.color.bright} strokeDasharray='5 5' />
            <Line type='monotone' dataKey='principal' stroke={themes.color.jazzberryJam} />
            <Line type='monotone' dataKey='interest' stroke={themes.color.dukeBlue} />
          </LineChart>
        </Div_InflatedCharts>

        <H2_Subheadings>Yearly property value increase</H2_Subheadings>
        <Div_PropertyValueChart>
          <LineChart width={360} height={300} data={propertyValueChartData}>
            <XAxis dataKey=' ' />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke={themes.color.bright} strokeDasharray='5 5' />
            <Line type='monotone' dataKey='propertyValue' stroke={themes.color.darkred} />
          </LineChart>
        </Div_PropertyValueChart>
      </Div_Main>
    </HelmetProvider>
  )
}

const Div_Main = styled.div`
  padding-top: ${themes.spacing.l};

  width: 100%;
  height: 240vh;
  min-width: 360px;

  background-color: ${themes.color.bright};
  @media (max-width: ${themes.mediaQuery.extraLarge}) {
    height: 290vh;
  }
  @media (max-width: ${themes.mediaQuery.large}) {
    height: 330vh;
  }
`

const H1_Heading = styled.h1`
  margin-left: auto;
  margin-right: auto;
  margin-top: ${themes.spacing.none};

  width: fit-content;

  border-top: 2px solid ${themes.color.dark};
  border-bottom: 2px solid ${themes.color.dark};

  color: ${themes.color.dark};
`

const Div_InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themes.spacing.xs};

  margin-left: auto;
  margin-right: auto;

  min-width: 360px;
  max-width: 560px;

  font-size: ${themes.fonts.l};
`

const P_InputTitle = styled.p`
  margin: ${themes.spacing.none};
  margin-left: ${themes.spacing.s};
  margin-bottom: -0.4em;
`

const Input_InputField = styled.input`
  margin: ${themes.spacing.none} 1.1em;
  padding: ${themes.spacing.xs};

  border: 2px solid ${themes.color.dark};

  font-size: ${themes.fonts.m};
  text-align: center;
`

const Div_MonthlyPayment = styled.div`
  margin-bottom: 0.2em;
  margin-top: 1.5em;

  text-align: center;

  font-size: ${themes.fonts.l};
  font-weight: 500;
`

const Span_Amount = styled.span`
  margin-left: auto;
  margin-right: auto;
  margin-top: ${themes.spacing.none};
  padding: ${themes.spacing.xs} 2em;

  display: block;

  border: 2px solid ${themes.color.dark};

  width: 8.7em;
  text-align: center;

  font-size: ${themes.fonts.m};
  font-weight: 600;

  color: ${themes.color.dark};
`

const Div_TableChartContainer = styled.div`
  display: flex;
  gap: 10em;

  margin: ${themes.spacing.l} auto;

  width: max-content;

  text-align: center;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 2em;
  }
`

const Div_PaymentCharts = styled.div`
  margin: ${themes.spacing.none} auto;

  width: max-content;
`

const Div_InflatedCharts = styled.div`
  display: flex;
  gap: 2em;

  margin: ${themes.spacing.m} auto;
  margin-top: 2em;

  width: max-content;

  @media (max-width: ${themes.mediaQuery.large}) {
    flex-direction: column;
  }
`

const Div_PropertyValueChart = styled.div`
  margin: ${themes.spacing.none} auto;
  margin-top: 2em;

  width: max-content;
`

const H2_Subheadings = styled.h2`
  margin: 0 auto;
  margin-bottom: 1em;

  width: max-content;

  border-top: 2px solid ${themes.color.dark};
  border-bottom: 2px solid ${themes.color.dark};

  font-size: ${themes.fonts.l};
  font-weight: 700;
  color: ${themes.color.dark};

  @media (max-width: 560px) {
    font-size: 1.2rem;
  }
`

const Table_StyledTable = styled.table`
  display: block;
  overflow: auto;

  margin: 0 auto;

  width: max-content;
  height: 550px;

  border: 1px solid ${themes.color.dark};

  text-align: center;
  color: ${themes.color.dark};
  @media (max-width: 560px) {
    width: 360px;
  }
`

const Td_StyledTd = styled.td`
  padding: ${themes.spacing.none} 15px;

  @media (min-width: ${themes.mediaQuery.tablet}) {
    padding: ${themes.spacing.none} 30px;
  }
`
