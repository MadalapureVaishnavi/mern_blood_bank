import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import PropTypes from 'prop-types';
import authHospital from '../actions/authHospital';
import { Navigate, Link } from 'react-router-dom';
import { Input, Tooltip, Form } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, PlusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons'; // Ant Design icons

export const Hospitalsignup = ({ setAlert, authHospital, isAuthenticated }) => {
  const [formData, setFormdata] = useState({
    name: '',
    email: '',
    ABC: '',
    city: '',
    password: '',
    password2: '',
    phone: '',
    M_S_C: ''
  });

  const { name, email, ABC, city, password, password2, M_S_C, phone } = formData;

  const onChange = e => setFormdata({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      authHospital(formData);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <section className="container">
        <h1 className="large text-danger">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <Input
              type="text"
              placeholder="Hospital Name"
              name="name"
              required
              value={name}
              onChange={e => onChange(e)}
              prefix={<UserOutlined />}
              allowClear
            />
          </div>

          <div className="form-group">
            <Input
              type="email"
              placeholder="Email Address"
              name="email"
              required
              value={email}
              onChange={e => onChange(e)}
              prefix={<MailOutlined />}
              allowClear
            />
          </div>

          <div className="form-group">
            <Input
              type="text"
              placeholder="Contact Number"
              name="phone"
              value={phone}
              onChange={e => onChange(e)}
              prefix={<PhoneOutlined />}
              allowClear
            />
          </div>

          <div className="form-group">
            <Input
              type="number"
              placeholder="Available Blood Package Count"
              name="ABC"
              required
              value={ABC}
              onChange={e => onChange(e)}
              prefix={<PlusCircleOutlined />}
              allowClear
            />
          </div>

          <div className="form-group">
            <Input
              type="number"
              placeholder="Maximum Storage Capacity"
              name="M_S_C"
              required
              value={M_S_C}
              onChange={e => onChange(e)}
              prefix={<UnorderedListOutlined />}
              allowClear
            />
          </div>

          <div className="form-group">
            <Input
              type="text"
              placeholder="Location"
              name="city"
              value={city}
              onChange={e => onChange(e)}
              allowClear
            />
          </div>

          <div className="form-group">
            <Input.Password
              placeholder="Password"
              name="password"
              value={password}
              minLength={6}
              onChange={e => onChange(e)}
              prefix={<LockOutlined />}
            />
          </div>

          <div className="form-group">
            <Input.Password
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              minLength={6}
              onChange={e => onChange(e)}
              prefix={<LockOutlined />}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-danger">Register</button>
          </div>
        </form>

        <p className="text-danger">
          Already have an account? <Link to="/login" className="text-danger">Sign In</Link>
        </p>
      </section>
    </div>
  );
};

Hospitalsignup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  authHospital: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, authHospital })(Hospitalsignup);
