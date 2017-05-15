import * as React from 'react';
import { browserHistory, Link } from 'react-router';

import { UserStore } from '../../stores/UserStore.jsx';
import { MapStore } from '../../stores/MapStore.jsx';

export const Profile = React.createClass({
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
        MapStore.hide();

        var dropzoneLogo = new Dropzone(".profile__upload_logo", {
    		url: 'http://upreal-api.develop.redlg.ru/file/upload/',
    		previewTemplate: "<i></i>",
    		maxFilesize: 5,
            method: 'post',
    		acceptedFiles: "image/*"
    	});
        dropzoneLogo.on("success", function(file) {
    		var file = JSON.parse(file.xhr.response);
            this.setState({
                logo_id: file.file_id,
                logo_path: file.file_path,
            });
    	}.bind(this));
        var dropzonePhoto = new Dropzone(".profile__upload_photo", {
    		url: 'http://upreal-api.develop.redlg.ru/file/upload/',
    		previewTemplate: "<i></i>",
    		maxFilesize: 5,
            method: 'post',
    		acceptedFiles: "image/*"
    	});
        dropzonePhoto.on("success", function(file) {
    		var file = JSON.parse(file.xhr.response);
            this.setState({
                photo_id: file.file_id,
                photo_path: file.file_path,
            });
    	}.bind(this));
        this.getProfile();
    },
    getProfile(){
        if(!UserStore.token){
            browserHistory.push("/");
            return;
        }
        $.ajax({
            url: 'http://upreal-api.develop.redlg.ru/profile/',
            type: 'POST',
            dataType: 'json',
            data: {
                token: UserStore.token,
            }
        })
        .done(function(response) {
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
    handleSave(){
        $.ajax({
            url: 'http://upreal-api.develop.redlg.ru/profile/save',
            type: 'POST',
            dataType: 'json',
            data: {
                token: UserStore.token,
                profile: this.state
            }
        })
        .done(function(response) {

        });
    },
    render() {
        return (
            <div className="profile">
                <div className="profile__left">
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Agency Name</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <input className="profile__input"
                                type="text"
                                placeholder="Your agency name"
                                value={this.state.agency}
                                onChange={ (e) => this.setState({agency: e.target.value})}/>
                            <div className="profile__desc">
                                Your agency name
                            </div>
                        </div>
                    </div>
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Full Name</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <input className="profile__input"
                                type="text"
                                placeholder="Your first and last name"
                                value={this.state.name}
                                onChange={ (e) => this.setState({name: e.target.value})}/>
                            <div className="profile__desc">
                                Your first and last name
                            </div>
                        </div>
                    </div>
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Public profile</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <input className="profile__input"
                                type="text"
                                placeholder="Your public profile http://upreal.develop.redlg.ru/user/publicprofile"
                                value={this.state.public}
                                onChange={ (e) => this.setState({public: e.target.value})}/>
                            <div className="profile__desc">
                                <Link to={"/user/" + this.state.public}>{"Your public profile " + window.location.origin + "/user/" + this.state.public}</Link>
                            </div>
                        </div>
                    </div>
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Location</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <input className="profile__input" type="text" value={this.state.location} onChange={ (e) => this.setState({location: e.target.value})}/>
                            <div className="profile__desc">
                                Your publicly displayed location
                            </div>
                        </div>
                    </div>
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Email</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <input className="profile__input" type="text" value={this.state.email} onChange={ (e) => this.setState({email: e.target.value})}/>
                        </div>
                    </div>
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Website</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <input className="profile__input" type="text" value={this.state.website} onChange={ (e) => this.setState({website: e.target.value})}/>
                        </div>
                    </div>
                    <div className="profile__row">
                        <div className="profile__column profile__column_2">
                            <div className="profile__label">Bio</div>
                        </div>
                        <div className="profile__column profile__column_10">
                            <textarea className="profile__textarea" value={this.state.bio} onChange={ (e) => this.setState({bio: e.target.value})}/>
                            <div className="profile__desc">
                                Your profile lets others learn a little about you.
                            </div>
                        </div>
                    </div>
                    <div className="profile__btns">
                        <div className="profile__btn" onClick={this.handleSave}>
                            Save Changes
                        </div>
                    </div>
                </div>
                <div className="profile__right">
                    <div className="profile__row">
                        <div className="profile__column profile__column_6">
                            <div className="profile__row">
                                <div className="profile__text">Your photo</div>
                            </div>
                            <div className="profile__image" style={{backgroundImage: (this.state.photo_path) ? "url(http://upreal-api.develop.redlg.ru"+this.state.photo_path+")" :""}}></div>
                            <div className="profile__upload profile__upload_photo">Upload</div>
                        </div>
                        <div className="profile__column profile__column_6">
                            <div className="profile__row">
                                <div className="profile__text">Agency Logo</div>
                            </div>
                            <div className="profile__image" style={{backgroundImage: (this.state.logo_path) ? "url(http://upreal-api.develop.redlg.ru"+this.state.logo_path+")" :""}}></div>
                            <div className="profile__upload profile__upload_logo">Upload</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})
