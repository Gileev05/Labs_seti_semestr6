import React from "react";

class CreateRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [props.firstNumber] };
        this.next = props.firstNumber + props.step;
    }

    addNext = () => {
        this.setState({ items: [...this.state.items, this.next] });
        this.next += this.props.step;
    };

    render() {
        return (
            <>
                {this.state.items.map((item, i) => (
                    <span key={i}>{item}{i < this.state.items.length - 1 && ", "}</span>
                ))}
                <span onClick={this.addNext}>...</span>
            </>
        );
    }
}