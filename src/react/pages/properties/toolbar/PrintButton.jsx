import * as React from 'react';

export const PrintButton = React.createClass({
    handleClick(e){
        e.preventDefault();
        window.print();
    },
    render() {
        return (
            <div className="toolbar__block">
                <div onClick={this.handleClick} className="toolbar__button">
                    <i className="fa fa-print" style={{marginRight: '0px'}}></i>
                </div>
            </div>
        );
    }
})
