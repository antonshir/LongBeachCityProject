import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
    Button,
    Menu,
    Dropdown,
    Icon,
    Row,
    Col,
    Steps,
    Card,
    Popover,
    Badge,
    Table,
    Tooltip,
    Divider,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import classNames from 'classnames';
import DescriptionList from '@/components/DescriptionList';
import styles from './AdvancedProfile.less';



const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const description = (

    <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="Business Name">Something</Description>
        <Description term="Rating?">Something</Description>
        <Description term="?">Something</Description>
        <Description term="?">
        </Description>
        <Description term="?">Placeholder</Description>
        <Description term="?">Placeholder</Description>
    </DescriptionList>
);

class AdvancedProfile extends Component {

  componentDidMount() {
  }
    render()
    {
        return (
            <PageHeaderWrapper
            title = "Business Name"
            content = {description}
            >
            </PageHeaderWrapper>

        );
    }
}




export default AdvancedProfile;