import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './index.less';

const Item = TabBar.Item;
const TabBarConfig = [
  {
    title: '家校沟通',
    icon: `<div className='iconfont'>&#xe69c;</div>`,
    selectedIcon: `<div className='iconfont'>&#xe69c;</div>`,
    pathname: '/communication',
  }, {
    title: '机构',
    icon: `<div className='iconfont'>&#xe604;</div>`,
    selectedIcon: `<div className='iconfont'>&#xe604;</div>`,
    pathname: '/organization',
  }, {
    title: '我的',
    icon: `<div className='iconfont'>&#xe658;</div>`,
    selectedIcon: `<div className='iconfont'>&#xe658;</div>`,
    pathname: '/home',
  },
];

function Footer({dispatch, childrens, location, router}) {
  return (
    <div className='normal'>
      { console.log(location) }
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={ false }
      >
        <Item
          title="家校沟通"
          key="家校沟通"
          icon={
            <div className='iconfont'>&#xe69c;</div>
          }
          selectedIcon={
            <div className='iconfont'>&#xe69c;</div>
          }
          selected={ location.pathname === '/communication' }
          onPress={ () => router.push('/communication') }
        >
          { childrens }
        </Item>
        <Item
          title="机构"
          key="机构"
          icon={
            <div className='iconfont'>&#xe604;</div>
          }
          selectedIcon={
            <div className='iconfont'>&#xe604;</div>
          }
          selected={ location.pathname === '/organization' }
          onPress={ () => router.push('/organization') }
        >
          { childrens }
        </Item>
        <Item
          title="我的"
          key="我的"
          icon={
            <div className='iconfont'>&#xe658;</div>
          }
          selectedIcon={
            <div className='iconfont'>&#xe658;</div>
          }
          selected={ location.pathname === '/home' }
          onPress={ () => router.push('/home') }
        >
          { childrens }
        </Item>
      </TabBar>
    </div>
  );
}

Footer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  childrens: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(withRouter(Footer));
