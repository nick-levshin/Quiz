import React from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

class Drawer extends React.Component {
  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact.toString()}
            className={(navData) => (navData.isActive ? classes.active : '')}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = [classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    const links = [{ to: '/', label: 'List', exact: true }];

    if (this.props.isAuthenticated) {
      links.push({ to: '/quiz-creator', label: 'Create a test', exact: false });
      links.push({ to: '/logout', label: 'Log out', exact: false });
    } else {
      links.push({ to: '/auth', label: 'Authorization', exact: false });
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>

        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
