import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { WhiteSpace, List, SegmentedControl, PullToRefresh } from 'antd-mobile';
import { Toast } from "antd-mobile/lib/index";

import { recordTakeAPI, recordTakeOffAPI } from '../../api.config';
import axios from "axios/index";

const Item = List.Item;
const Brief = Item.Brief;

import './index.less';


class RecordTake extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInfo: null,
      data: {
        data: []
      },
      segment: 0,
    };
  }

  componentDidMount() {
    this.load();
  }

  load = (api = recordTakeAPI) => {
    Toast.loading('加载中...', 0);
    axios.get(api, this.state.loginInfo)
      .then(response => {
        if(response.data.statusCode === 200) {
          this.setState({
            data: response.data,
          });
          Toast.hide();
        }
      })
      .catch(error => {
        Toast.hide();
        console.log(error);
      });
  }

  handleClickSegment = () => {
    this.setState({
      segment: this.state.segment === 0 ? 1 : 0,
    });
    this.state.segment === 0 ? this.load(recordTakeAPI): this.load(recordTakeOffAPI);
  };

  render() {
    const listShows = this.state.data.data.map((v, i) => {
      return (
        <div key={ v.attendanceDateTime }>
          <List renderHeader={ () => !i && '点名通知' }>
            <Item>{ v.child } 同学
              <span>{ v.status }</span>
            </Item>
            <Item multipleLine>
              { v.name }
              <Brief>
                点名时间：{ v.attendanceDateTime } <br />
                授课时间：{ v.date } { v.timeInterval }
                授课 1课时 <br />
                点名老师：{ v.teacher }
              </Brief>
            </Item>
            <Item>
              <div style={ {textAlign: "right", fontSize: "14px", color: "#108ee9"} }>评价  &gt;</div>
            </Item>
          </List>
          { !i && <WhiteSpace size="lg" /> }
        </div>
      );
    });
    return (
      <div>
        <WhiteSpace size="lg" />
        <SegmentedControl
          selectedIndex={ this.state.segment }
          values={ ['点名记录', '请假记录'] }
          style={ {height: '35px', width: '200px', backgroundColor: '#fff', margin: 'auto'} }
          onChange={ this.handleClickSegment }
        />
        { listShows }
      </div>
    );
  }

}

RecordTake.propTypes = {
  location: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(withRouter(RecordTake));
