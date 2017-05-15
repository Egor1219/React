import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { Frame } from './frame/Frame.jsx'

import { Index } from './pages/index/Index.jsx';
import { About } from './pages/about/About.jsx';
import { Membership } from './pages/membership/Membership.jsx';
import { Contact } from './pages/contact/Contact.jsx';
import { Realto} from './pages/realto/Realto.jsx';
import { Properties } from './pages/properties/Properties.jsx';
import { Property } from './pages/property/Property.jsx';
import { Profile } from './pages/profile/Profile.jsx';
import { User } from './pages/user/User.jsx';

require('../scss/app.scss');

ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path='/' component={ Frame }>
        
            <IndexRoute component={ Index } />
            <Route path='properties' component={ Properties }/>
            <Route path='property/:propertyId' component={ Property }/>

            <Route path='about' component={ About }/>
            <Route path='contact' component={ Contact }/>
            <Route path='membership' component={ Membership }/>
            

            <Route path='profile' component={ Profile }/>
            <Route path='user/:publicId' component={ User }/>

            <Route path="*" component={ Index } />
        </Route>
    </Router>,
    document.getElementById('app')
)
