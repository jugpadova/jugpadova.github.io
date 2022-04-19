import * as React from "react"
import styled from "styled-components"
import { theme } from "./theme"

const Alert = styled.div`
    position: relative;
    padding: 1rem 1rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    color: ${props => props.theme[props.type].color};
    background-color: ${props => props.theme[props.type].backgroundColor};
    border-color: ${props => props.theme[props.type].borderColor};
`

Alert.defaultProps = {
    theme: theme,
    type: "primary"
}

export default Alert