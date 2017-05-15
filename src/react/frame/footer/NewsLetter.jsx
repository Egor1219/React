import * as React from 'react';

export const NewsLetter = React.createClass({
    getInitialState() {
        return {
            email: "",
            message: "",
            status: "none"
        };
    },
    componentDidMount() {
    },
    componentWillUnmount() {
    },
    handleSubmit(e){
        e.preventDefault();
        if(this.state.status=="sended")
            return;

        if(!this.validateEmail(this.state.email))
            return;

        this.setState({
            status: "sended",
            email: "Thanks for subscribing!",
            message: ""
        });

        $.ajax({
            url: 'http://api.upreal.dev.redlg.ru/newsletter/add',
            type: 'POST',
            dataType: 'json',
            data:{
                email: this.state.email
            }
        })
        .done(function(response) {
        });

    },
    handleChange(e){
        if(this.state.status=="none"){
            this.setState({email: e.target.value});
            if(!this.validateEmail(e.target.value)){
                this.setState({message: "Please enter a valid email"});
            }else{
                this.setState({message: ""});
            }
        }else{
            this.setState({
                email: "Thanks for subscribing",
                message: ""
            });
        }

    },
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    render() {
        return (
            <div className="">
                <span className="footer__title">Newsletter</span>
                <form className="footer__form" onSubmit={this.handleSubmit}>
    				<i className="fa fa-envelope"></i>
    				<input className="footer__input"
                        type="email"
                        placeholder="Enter your email"
                        value={this.state.email}
                        onChange={this.handleChange}/>
    				<input className="footer__submit" type="submit" value="Submit"/>
    			</form>
                <span className="footer__title" style={{position: "absolute", marginTop:"4px"}}>{this.state.message}</span>
            </div>
        );
    }
});
