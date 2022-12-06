import { withFormsy } from 'formsy-react';
import React from 'react';

// noinspection JSUnusedGlobalSymbols,JSValidateTypes
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        this.props.setValue(event.currentTarget.value);
    }

    render() {
        const errorMessage = this.props.errorMessage;

        return (
            <div>
                <label>
                    {this.props.title}:
                    <input onChange={this.changeValue} type={this.props.name} value={this.props.value || ''} />
                    <p style={{fontSize: '10px', color: 'darkred'}}>{errorMessage}</p>
                </label>

            </div>
        );
    }
}

export default withFormsy(Input);