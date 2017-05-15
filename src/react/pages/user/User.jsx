import * as React from 'react';
import { browserHistory } from 'react-router';

import { UserStore } from '../../stores/UserStore.jsx';

export const User = React.createClass({
    getInitialState() {
        return {
            agency: '',
            public: '',
            name: '',
            location: '',
            email: '',
            website: '',
            bio: '',
            photo_id: '',
            photo_path: '',
            logo_id: '',
            logo_path: '',
        };
    },
    componentDidMount() {
        this.getProfile();
    },
    getProfile(){
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/profile/user/',
            type: 'POST',
            dataType: 'json',
            data: {
                token: UserStore.token,
                public_id: this.props.params.publicId
            }
        })
        .done(function(response) {
            if(response.status=="error")
                browserHistory.push("/");
            else
                this.setState({
                    agency: response.agency,
                    name: response.name,
                    public: response.public,
                    location: response.location,
                    email: response.email,
                    website: response.website,
                    bio: response.bio,
                    photo_id: response.photo_id,
                    photo_path: response.photo_path,
                    logo_id: response.logo_id,
                    logo_path: response.logo_path,
                });
        }.bind(this));
    },
    render() {
        return (
            <div className="profile">
                <div className="profile__left">
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Agency Name:</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <div className="profile__text">{this.state.agency}</div>
                        </div>
                    </div>
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Full Name:</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <div className="profile__text">{this.state.name}</div>
                        </div>
                    </div>
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Public profile:</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <div className="profile__text">{this.state.public}</div>
                        </div>
                    </div>
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Location:</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <div className="profile__text">{this.state.location}</div>
                        </div>
                    </div>
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Email:</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <div className="profile__text">{this.state.email}</div>
                        </div>
                    </div>
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Website:</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <div className="profile__text">{this.state.website}</div>
                        </div>
                    </div>
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Bio:</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <div className="profile__text">{this.state.bio}</div>
                        </div>
                    </div>
                </div>
                <div className="profile__right">
                    <div className="profile__row">
                        <div className="profile__column profile__column_6">
                            <div className="profile__row">
                                <div className="profile__text">Profile photo</div>
                            </div>
                            <div className="profile__image" style={{backgroundImage: (this.state.photo_path) ? "url(http://idsrealty-api.fgeekdemos.org"+this.state.photo_path+")" :""}}></div>
                        </div>
                        <div className="profile__column profile__column_6">
                            <div className="profile__row">
                                <div className="profile__text">Agency Logo</div>
                            </div>
                            <div className="profile__image" style={{backgroundImage: (this.state.logo_path) ? "url(http://idsrealty-api.fgeekdemos.org"+this.state.logo_path+")" :""}}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})
