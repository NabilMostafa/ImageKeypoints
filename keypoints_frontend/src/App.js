import React from 'react';
import batImage from '../src/Minimalist-wallpapers-HD.png'
import './App.css';
import Draggable from "../src/Components/Draggable-Point";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: null,
            error: null,
            points: []

        }
        this.handleMsgChange = this.handleMsgChange.bind(this);
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:8000/api-v1/points/`)
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result)
                    this.setState({
                        points: result
                    })
                },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )
    }

    handleMsgChange(val) {
        // console.log('here')
        // console.log(val)
        this.setState({
            msg: val
        });
    }

    render() {

        return (
            <div>
                <div>
                    <img src={batImage} width={500} height={500} alt={'Batman'}/>
                </div>
                <pre className="message">
						{this.state.msg ? this.state.msg : null}
                </pre>
                <pre>{this.state.moveMsg ? this.state.moveMsg : null}</pre>
                {this.state.points.map(i =>
                    <Draggable key={i['id']} x={parseInt(i['xPoint'])} y={parseInt(i['yPoint'])} height={500}
                               width={500} changeMessege={this.handleMsgChange} id={i['id']}>
                        <div className={'draggable'}>
                        </div>
                    </Draggable>
                )}

            </div>
        );
    }
}

export default App;
