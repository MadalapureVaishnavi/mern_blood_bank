import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { authdonor } from '../actions/authdonor';
import { Link, Navigate } from 'react-router-dom';
import { Input, Radio, Tooltip } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, HeartOutlined } from '@ant-design/icons'; // Ant Design icons
import PropTypes from 'prop-types';

export const DonorSignup = ({ setAlert, authdonor, isAuthenticated }) => {
  const [formData, setFormdata] = useState({
    name: '',
    email: '',
    bloodgroup: '',
    city: '',
    sex: '',
    password: '',
    password2: '',
    phone: ''
  });

  const { name, email, bloodgroup, city, password, password2, phone } = formData;

  const onChange = e => setFormdata({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      authdonor(formData);
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
              placeholder="Name"
              name="name"
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
            <label>Blood Group:</label>
            <br />
            <Radio.Group onChange={onChange} name="bloodgroup" value={bloodgroup}>
              <Tooltip title="A+">
                <Radio value={'A+'}>A+</Radio>
              </Tooltip>
              <Tooltip title="A-">
                <Radio value={'A-'}>A-</Radio>
              </Tooltip>
              <Tooltip title="AB+">
                <Radio value={'AB+'}>AB+</Radio>
              </Tooltip>
              <Tooltip title="AB-">
                <Radio value={'AB-'}>AB-</Radio>
              </Tooltip>
              <Tooltip title="B+">
                <Radio value={'B+'}>B+</Radio>
              </Tooltip>
              <Tooltip title="B-">
                <Radio value={'B-'}>B-</Radio>
              </Tooltip>
              <Tooltip title="O+">
                <Radio value={'O+'}>O+</Radio>
              </Tooltip>
              <Tooltip title="O-">
                <Radio value={'O-'}>O-</Radio>
              </Tooltip>
            </Radio.Group>
          </div>

          <div className="form-group">
            <Input
              type="text"
              placeholder="City"
              name="city"
              value={city}
              onChange={e => onChange(e)}
              prefix={<HeartOutlined />}
              allowClear
            />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <br />
            <Radio.Group onChange={e => setFormdata({ ...formData, sex: e.target.value })} name="sex" value={formData.sex}>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
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
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>

        <p className="text-danger">
          Already have an account? <Link to="/login" className="text-danger">Sign In</Link>
        </p>
      </section>
    </div>
  );
};

DonorSignup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  authdonor: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, authdonor })(DonorSignup);
