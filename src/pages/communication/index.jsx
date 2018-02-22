import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { WingBlank, WhiteSpace, Grid } from 'antd-mobile';

import TabBarLayOut from '../../layout/tabBarLayOut';

import take_record_IMG from './images/take_record.png';
import home_work_IMG from './images/home_work.png';
import comment_IMG from './images/comment.png';
import notification_IMG from './images/notification.png';

import './index.less';


const data = [{
  icon: take_record_IMG,
  text: '到课/请假',
  url: '/record/take',
}, {
  icon: home_work_IMG,
  text: '课后作业',
  url: '/homework',
}, {
  icon: comment_IMG,
  text: '师生互评',
  url: '/comment/fromme',
}, {
  icon: notification_IMG,
  text: '机构通知',
  url: '/notification',
},
];

// import Main from '../../layouts/main.jsx';

function Index({dispatch, location, router}) {
  return (
    <TabBarLayOut location={ location }>
      <div className='communication'>
        <WhiteSpace size="lg" />
        <WingBlank>
          <div className='logo' />
          <div className='gird'>
            <Grid data={ data } columnNum={ 2 }
                  onClick={ _e => router.push(_e.url) }
                  renderItem={ dataItem => (
                    <div style={ {padding: '5px'} }>
                      <img src={ dataItem.icon } alt="icon" />
                      <span>{ dataItem.text }</span>
                    </div>
                  ) }
            />
          </div>
        </WingBlank>
      </div>
    </TabBarLayOut>
  );
}

Index.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(withRouter(Index));
