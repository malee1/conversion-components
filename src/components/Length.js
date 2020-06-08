import React, { Component } from 'react'

function toInches(centimeters) {
    return centimeters / 2.54;
}

function toCentimeters(inches) {
    return inches * 2.54;
}

function tryConvert(length, convert) {
    const input = parseFloat(length);
    if(Number.isNaN(input)) {
        return '';
    }
    const conversion = convert(input);
    const round = Math.round(conversion * 1000) / 1000;
    return round.toString();
}

const scaleNames = {
    cm: 'Centimeters',
    in: 'Inches'
};

class Convert extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onLengthChange(e.target.value);
    }

    render() {
        const scale = this.props.scale;
        const length = this.props.length;
        return (
            <fieldset>
                <legend>Enter Length in {scaleNames[scale]}:</legend>
                <input 
                    value={length}
                    onChange={this.handleChange}/>
            </fieldset>
        );
    }
}

export class Length extends Component {
    constructor(props) {
        super(props);
        this.handleCentimeterChange = this.handleCentimeterChange.bind(this);
        this.handleInchChange = this.handleInchChange.bind(this);
        this.state = {
            length: '',
            scale: 'cm'
        }
    }

    handleCentimeterChange(length) {
        this.setState({
            scale: 'cm',
            length
        });
    }

    handleInchChange(length) {
        this.setState({
            scale: 'in',
            length
        });
    }

    render() {
        const scale = this.state.scale;
        const length = this.state.length;
        const inch = scale === 'cm' ? tryConvert(length, toInches) : length;
        const centimeters = scale === 'in' ? tryConvert(length, toCentimeters) : length;
        return (
            <div>
                <Convert 
                    scale="cm"
                    length={centimeters}
                    onLengthChange={this.handleCentimeterChange}
                />
                <Convert
                    scale="in"
                    length={inch}
                    onLengthChange={this.handleInchChange}
                />
                
            </div>
        )
    }
}

export default Length
