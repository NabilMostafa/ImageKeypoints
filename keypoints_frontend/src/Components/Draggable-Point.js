import React from 'react';

class Draggable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            relX: 0,
            relY: 0,
            x: props.x,
            y: props.y,
            maxWidth: props.width - 25,
            maxHeight: props.height - 25
        };
        this.gridX = props.gridX || 1;
        this.gridY = props.gridY || 1;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }


    onMove(e) {
        const x = Math.trunc((e.pageX - this.state.relX) / this.gridX) * this.gridX;
        const y = Math.trunc((e.pageY - this.state.relY) / this.gridY) * this.gridY;
        if (x !== this.state.x || y !== this.state.y) {
            if (x > this.state.maxWidth || y > this.state.maxHeight) {
                this.setState({
                    x: this.state.x,
                    y: this.state.y
                });
            } else {
                this.setState({
                    x,
                    y
                });
            }
            this.props.onMove && this.props.onMove(this.state.x, this.state.y);
        }
    }

    onMouseDown(e) {
        if (e.button !== 0) return;
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        e.preventDefault();
    }

    onMouseUp(e) {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        this.props.onStop && this.props.onStop(this.state.x, this.state.y);
        // console.log(this.state.x, this.state.y)
        fetch(`http://127.0.0.1:8000/api-v1/update-points/`, {
            method: 'PUT',
            body: JSON.stringify({
                    'id': this.props.id,
                    'xPoint': this.state.x,
                    'yPoint': this.state.y

                }
            )
        }).then(response => response.json())
            .then((result) => {
                let msg = `You changed the position of point number ${this.props.id} it has been saved to database at new position ${this.state.x}, ${this.state.y} !`
                this.props.changeMessege(msg)
            })
        e.preventDefault();
    }

    onMouseMove(e) {
        this.onMove(e);
        e.preventDefault();
    }

    onTouchStart(e) {
        document.addEventListener('touchmove', this.onTouchMove, {passive: false});
        document.addEventListener('touchend', this.onTouchEnd, {passive: false});
        e.preventDefault();
    }

    onTouchMove(e) {
        this.onMove(e.touches[0]);
        e.preventDefault();
    }

    onTouchEnd(e) {
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
        this.props.onStop && this.props.onStop(this.state.x, this.state.y);
        e.preventDefault();
    }

    render() {
        return <div
            onMouseDown={this.onMouseDown}
            onTouchStart={this.onTouchStart}
            style={{
                position: 'absolute',
                left: this.state.x,
                top: this.state.y,
                touchAction: 'none'
            }}
            ref={(div) => {
                this.handle = div;
            }}
        >
            {this.props.children}
        </div>;
    }
}

export default Draggable;