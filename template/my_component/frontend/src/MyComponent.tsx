import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode, useState } from "react"
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

interface State {
  numClicks: number
  isFocused: boolean
  is_hovering: number
  is_selected: number
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */

// export function TestRN() {
//   return <RoughNotation> 
// }


class MyRoughNotation extends React.Component<{}, { is_hovering: boolean, is_selected:boolean }> {
  constructor(props:any) {
    super(props);
    this.state = { is_hovering: false, is_selected: false };
    // this.onMouseLeave = onMouseLeave;
  }
  get_state() {
    return this.state;
  }
  render() {
    const props:any = this.props;
    const {
      value: value,
      index: index,
      // show: show,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      ...rest
    } = props;

    const is_hovering = this.state.is_hovering;
    // };
    return (<span>
      <RoughNotation {...rest} onMouseEnter={() => { this.setState({ is_hovering: true }); onMouseEnter(index); }}
        onMouseLeave={() => { this.setState({ is_hovering: false }); onMouseLeave(index)}
      }
        show={is_hovering}>
        {value} 
      </RoughNotation> &nbsp; </span>
    ) 
  }
}




class MyComponent extends StreamlitComponentBase<State> {
  public state = { numClicks: 0, isFocused: false, is_hovering: -1 , is_selected: -1 }; 

  public render = (): ReactNode => {
    // Arguments that are passed to the plugin in Pytho/document/d/1X1-NT4sYQ1Xe6WXMoayxrLQuWKuzjUCypvJu7wYM62E/editn are accessible
    // via `this.props.args`. Here, we access the "name" arg.
    const name = this.props.args["name"]

    // Streamlit sends us a theme object via props that we can use to ensure
    // that our component has visuals that match the active theme in a
    // streamlit app.
    const { theme } = this.props
    const style: React.CSSProperties = {}

    // Maintain compatibility with older versions of Streamlit that don't send
    // a theme object.
    if (theme) {
      // Use the theme object to style our button border. Alternatively, the
      // theme style is defined in CSS vars.
      const borderStyling = `1px solid ${
        this.state.isFocused ? theme.primaryColor : "gray"
      }`
      style.border = borderStyling
      style.outline = borderStyling
    }
    
    const values: any = ["hi","bye","mu"];
    // this.state = 
    const props = {
      animate: false,
      strokeWidth: 10,
      iterations:5,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      
      // value: name,

    };
    const func = (value: string, index: any) => 
    {
      const rest = {
         value: value, index: index,...props 
      };
      return (
        <MyRoughNotation {...rest} />
    )}
    return values.map(func);
  }
  //   return {

  //     )}
  // };

  /** Click handler for our "Click Me!" button. */
  private onMouseEnter = (i:any) => {
    // Increment state.numClicks, and pass the new value back to
    // Streamlit via `Streamlit.setComponentValue`.
    this.setState(
      prevState => ({ is_hovering: i }),
      () => Streamlit.setComponentValue(this.state.is_hovering)
    )
  }

  private onMouseLeave = (i:any) => {
    // Increment state.numClicks, and pass the new value back to
    // Streamlit via `Streamlit.setComponentValue`.
    this.setState(
      prevState => ({ is_hovering: -1 }),
      () => Streamlit.setComponentValue(this.state.is_hovering)
    )
  }

  private onClicked = (): void => {
    // Increment state.numClicks, and pass the new value back to
    // Streamlit via `Streamlit.setComponentValue`.
    this.setState(
      prevState => ({ numClicks: prevState.numClicks + 1 }),
      () => Streamlit.setComponentValue(this.state.numClicks)
    )
  }

  /** Focus handler for our "Click Me!" button. */
  private _onFocus = (): void => {
    this.setState({ isFocused: true })
  }

  /** Blur handler for our "Click Me!" button. */
  private _onBlur = (): void => {
    this.setState({ isFocused: false })
  }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(MyComponent)
