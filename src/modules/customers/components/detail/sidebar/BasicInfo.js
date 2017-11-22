import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from 'modules/layout/components';
import { SidebarContent, QuickButton } from 'modules/layout/styles';
import { AvatarWrapper } from 'modules/activityLogs/styles';
import {
  Button,
  Icon,
  FormControl,
  FormGroup,
  NameCard
} from 'modules/common/components';
import { Alert } from 'modules/common/utils';
import {
  AboutList,
  Aboutvalues,
  NameWrapper,
  ButtonWrapper,
  AboutWrapper
} from './styles';

const propTypes = {
  customer: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired
};

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);

    this.defaultBasicinfos = {
      ...(props.customer || {})
    };

    this.state = {
      editing: false,
      basicInfo: this.defaultBasicinfos
    };

    this.toggleEditing = this.toggleEditing.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleEditing() {
    this.cancelEditing();
    this.setState({ editing: true });
  }

  cancelEditing() {
    this.setState({
      editing: false,
      basicInfo: this.defaultBasicinfos
    });
  }

  save() {
    const doc = {
      ...this.state.basicInfo
    };

    this.props.save(doc, error => {
      if (error) return Alert.error(error.message);

      this.defaultBasicinfos = this.state.basicInfo;
      this.cancelEditing();
      return Alert.success('Success');
    });
  }

  handleChange(e, inputname) {
    const { basicInfo } = this.state;
    const newinfo = {
      ...basicInfo,
      [inputname]: e.target.value
    };
    this.setState({ basicInfo: newinfo });
  }

  renderForm() {
    const { basicInfo } = this.state;

    return (
      <SidebarContent>
        <FormGroup>
          First name:
          <FormControl
            defaultValue={basicInfo.firstName}
            onChange={e => this.handleChange(e, 'firstName')}
          />
        </FormGroup>
        <FormGroup>
          Last name:
          <FormControl
            defaultValue={basicInfo.lastName}
            onChange={e => this.handleChange(e, 'lastName')}
          />
        </FormGroup>
        <FormGroup>
          Primary Email:
          <FormControl
            defaultValue={basicInfo.email}
            onChange={e => this.handleChange(e, 'email')}
          />
        </FormGroup>
        <FormGroup>
          Phone:
          <FormControl
            defaultValue={basicInfo.phone}
            onChange={e => this.handleChange(e, 'phone')}
          />
        </FormGroup>
        <ButtonWrapper>
          <Button btnStyle="success" size="small" onClick={this.save}>
            <Icon icon="checkmark" />
          </Button>
          <Button btnStyle="simple" size="small" onClick={this.cancelEditing}>
            <Icon icon="close" />
          </Button>
        </ButtonWrapper>
      </SidebarContent>
    );
  }

  renderInfo() {
    const { customer } = this.props;
    const isUser = customer.isUser;
    const { basicInfo } = this.state;
    return (
      <SidebarContent>
        <NameWrapper>
          <AvatarWrapper isUser={isUser}>
            <NameCard.Avatar customer={customer} size={50} />
            {isUser ? <Icon icon="checkmark" /> : <Icon icon="minus" />}
          </AvatarWrapper>
          <NameWrapper>
            {basicInfo.firstName || basicInfo.lastName ? (
              (basicInfo.firstName || '') + ' ' + (basicInfo.lastName || '')
            ) : (
              <a onClick={this.toggleEditing}>Edit name</a>
            )}
          </NameWrapper>
          <Sidebar.Section.QuickButtons>
            <QuickButton>
              <Icon icon="edit" onClick={this.toggleEditing} />
            </QuickButton>
          </Sidebar.Section.QuickButtons>
        </NameWrapper>
        <AboutWrapper>
          <AboutList>
            <li>
              Email:
              <Aboutvalues>
                {basicInfo.email || (
                  <a onClick={this.toggleEditing}>Add Email</a>
                )}
              </Aboutvalues>
            </li>
            <li>
              Phone:
              <Aboutvalues>
                {basicInfo.phone || (
                  <a onClick={this.toggleEditing}>Add Phone</a>
                )}
              </Aboutvalues>
            </li>
          </AboutList>
        </AboutWrapper>
      </SidebarContent>
    );
  }

  render() {
    return (
      <Sidebar.Section>
        {this.state.editing ? this.renderForm() : this.renderInfo()}
      </Sidebar.Section>
    );
  }
}

BasicInfo.propTypes = propTypes;

export default BasicInfo;
