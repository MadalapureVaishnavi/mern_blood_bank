import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoginUser } from '../actions/authdonor';
import { Input, Button, Space, Spin } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons'; // Importing Ant Design icons

const Login = ({ LoginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false); // State to handle loading animation

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    LoginUser(email, password);
    setLoading(false); // Reset loading state after form submission
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <Input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            prefix={<MailOutlined />}
            allowClear
            className="input-field"
            size="large"
            required
          />
        </div>

        <div className="form-group">
          <Input.Password
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            prefix={<LockOutlined />}
            allowClear
            className="input-field"
            size="large"
            required
          />
        </div>

        <div className="form-group">
          <Button
            type="primary"
            htmlType="submit"
            className="button-9"
            size="large"
            block
            loading={loading} // Display loading spinner while form is being submitted
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>

      <p className="my-1">
        Don't have an account? <Link to="/">Sign Up</Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  LoginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { LoginUser })(Login);
