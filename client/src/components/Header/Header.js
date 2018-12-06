import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Header.css';


class Header extends Component {

	renderLinks() {
		console.log('this.props: ', this.props);

		if (this.props.authenticated) {

			return (
				<div>
					{this.props.user.firstname ? <Link to="/feature" className={styles.firstname}>{this.props.user.firstname}</Link> : null}
					<Link to="/signout">Signout</Link>
					<Link to="/feature" className={styles.right}>></Link>
				</div>
			)
		} else {
				return (
					<div>
						<Link to="/signup">Signup</Link>
						<Link to="/signin" className={styles.right}>Signin</Link>
					</div>
				)
		}
	}

	render() {
		console.log('this.props: ', this.props);

		return (
			<div className={styles.header}>
				<Link to="/" className={styles.left}>Madeleine's React/Redux Practice Website</Link>
				{this.renderLinks()}
			</div>
		)
	}
}

function mapStateToProps(state) {
	console.log('state: ', state);
	console.log('state.auth.user: ', state.auth.user);
	// console.log('state.user.firstname: ', state.auth.user.firstname);
	return { authenticated: state.auth.authenticated, user: state.auth.user };
}

export default connect(mapStateToProps)(Header);