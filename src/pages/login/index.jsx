import React from 'react';
import { connect } from 'react-redux';
import { WingBlank, WhiteSpace, Button, InputItem, List, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from 'axios';

import './index.less';

import { loginAPI } from '../../api.config';

/* TODO:
 1. rc-form 提交phone和password -
 2. 使用react-redux来dispatch post请求
 3. 使用redux将登陆信息存储到全局store中 -
 */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInfo: null,
      data: null,
    };
  }

  loginSuccess = () => {
    setTimeout(() => {
      Toast.hide();
      this.props.router.push('/');
    }, 666);//延迟一秒跳转
  };

  handleSubmit = () => {
    Toast.loading('登录中...', 0);
    this.props.form.validateFields(['phone', 'password'], (error, value) => {
      this.setState({
        loginInfo: value,
      });
    });
    axios.post(loginAPI, this.state.loginInfo)
      .then(response => {
        if(response.data.statusCode === 200) {
          console.log(response.data);
          this.setState({
            data: response.data,
          });
          this.loginSuccess();
        }
      })
      .catch(error => {
        Toast.hide();
        console.log(error);
      });
    event.preventDefault();
  };

  render() {
    const {getFieldProps} = this.props.form;
    return (
      <div className='login'>
        <WhiteSpace size="lg" />
        <WingBlank>
          <div className='logo' />
          <div className='login-input'>
            <List>
              <InputItem { ...getFieldProps('phone') }
                         type='phone'
                         name='phone'
                         placeholder="请输入手机号" />
              <InputItem { ...getFieldProps('password') }
                         type='password'
                         name='password'
                         placeholder="请输入密码" />
            </List>
            <WhiteSpace size="lg" />
            <Button type="primary" onClick={ this.handleSubmit }>登录</Button>
          </div>

        </WingBlank>
      </div>
    );
  }
}

const WrappedLogin = createForm()(Login);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    loginSuccess: () => {
      dispatch({
        type: 'loginSuccess',
        data: this.state.data
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLogin);
