import React, { Component } from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { browserHistory } from 'react-router'
import { signOut } from '../actions'
import { connect } from 'react-redux' 

class NavBar extends Component{
  render() {
    const { dispatch } = this.props
    return (
    <div>
    <Navbar>
    	<Navbar.Header>
	      	<Navbar.Brand>
	        	<a>Voting App</a>
	      	</Navbar.Brand>
   		</Navbar.Header>
	    <Nav>
	      	<NavItem onClick = {()=>browserHistory.push('/login')} >Sign In</NavItem>
	      	<NavItem onClick = {()=>browserHistory.push('/polls')} >All Polls</NavItem>
	      	<NavItem onClick = {()=>browserHistory.push('/mypolls')} >My Polls</NavItem>
	      	<NavItem onClick = {()=>browserHistory.push('/newpoll')} >Create New Poll</NavItem>
          <NavItem onClick = {()=> {
            dispatch(signOut())
            browserHistory.push('/login')
          }}>Sign Out
          </NavItem>
	    </Nav>
  	</Navbar>
  	        {this.props.children}
  	</div>
    );
  }
};

NavBar = connect(
)(NavBar)
export default NavBar