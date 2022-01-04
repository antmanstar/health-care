import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filter, includes, lowerCase, isEmpty } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import styled from 'styled-components';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import { Transition } from 'react-transition-group';
import history from '../../../../utils/history';
import defaultTheme from '../../../../style/themes';
import MobileActionButton from './MobileActionButton';
import MobileButton from './MobileButton';
import searchData from '../../../containers/shared/mobile/static-search-data';
import actions from '@evry-member-app/shared/store/actions';

const { openNewSupportRequestModal } = actions;
const { MobileListTitle, MobileFixedBottomButton, TrimmedHeader } = defaultTheme.components;

// Bottom Search input in footer of every mobile view

const InputWrapper = styled.div`
  outline: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 50%;
  top: calc(100% - 47px);
  left: auto;
  position: fixed;
  transition: all ease-in-out 150ms;
  z-index: 112;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.shades.white};
  height: 46px;

  i {
    margin-right: 15px;
    margin-left: 5px;
    font-size: 24px;
    color: ${props => props.theme.colors.shades.blue};
  }

  form {
    width: 100%;
    line-height: 28px;
  }

  input {
    width: 100%;
    background: none;
    color: ${props => props.theme.colors.shades.blue};
    caret-color: ${props => props.theme.colors.shades.pinkOrange};
    font-size: 16px;
    font-weight: 300;
    border: none;

    ::placeholder {
      color: ${props => props.theme.colors.shades.gray};
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  &.open {
    position: fixed;
    top: 5px;
    width: 90%;
    left: 5%;
    padding: 10px;
    height: 48px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    outline: none;
    border: none;
    margin: 22px auto 16px;
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
    justify-content: flex-end;
    i {
      margin-top: 3px;
    }
  }
`;

const TrimmedHeaderWithColor = styled(TrimmedHeader)`
  background-color: ${props => props.theme.colors.shades.tealBlue};
  position: relative;
`;

const TransitionWrapper = styled.div`
  width: 100%;
`;

const SearchWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  background-color: ${props => props.theme.colors.shades.nearlyWhite};
  z-index: 111;
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
`;

const MobileFixedBottomButtonAdapted = styled(MobileFixedBottomButton)`
  box-sizing: border-box;
  width: 100%;
  position: relative;

  button {
    max-width: 420px;
    cursor: pointer;
  }
`;

const Results = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 80px 5%;
  color: ${props => props.theme.colors.shades.black};
  .resultButton {
    margin: 20px 0;
  }
  .no-search {
    padding-top: 180px;
    i {
      font-size: 72px;
      display: block;
      margin: 30px auto;
      color: ${props => props.theme.colors.shades.mediumGray};
    }
    color: ${props => props.theme.colors.shades.gray};
    text-align: center;
    display: block;
    width: 80%;
    margin-left: 10%;
    font-style: italic;
    line-height: 1.5em;
  }
`;

const duration = 150;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

const StyledLink = styled(RouterLink)`
  display: block;
  &,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

class BottomBarSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isTrimDown: false,
      searchQuery: '',
      results: '',
      haveResults: false
    };

    this.searchFormRef = React.createRef();

    this.handlers = {
      onClose: this.handleToggle.bind(this, false),
      handleKeyPress: this.handleKeyPress.bind(this),
      onOpen: this.handleToggle.bind(this, true),
      onEntering: this.handleEntering.bind(this),
      onExit: this.handleExit.bind(this),
      onReset: this.handleReset.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      handleSubmit: this.handleSubmit.bind(this)
    };
  }

  handleInputChange(event) {
    const { isOpen } = this.state;
    const { value } = event.target;
    if (!isOpen || value) {
      this.setState({ isOpen: true });
    }
    let results = '';
    const lowerCaseValue = lowerCase(value);
    if (value.length > 2) {
      const filteredResults = this.filterResults(lowerCaseValue);

      results = filteredResults.map(el => (
        <StyledLink to="#" onClick={obj => this[el.onClick](obj)} key={uuidv4()}>
          <MobileButton text={el.text} />
        </StyledLink>
      ));
    }
    if (isEmpty(results)) {
      this.setState({ haveResults: false });
      results = '';
    } else {
      this.setState({ haveResults: true });
    }
    this.setState({ results, searchQuery: value });
  }

  filterResults(value) {
    return filter(searchData, o => includes(lowerCase(o.searchTerms), value));
  }

  handleExit() {
    this.handlers.onReset();
    this.setState({ isTrimDown: false, searchQuery: '' });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleToggle(visible) {
    this.setState({ isOpen: visible });
  }

  handleKeyPress(event) {
    if (event.key === 'Escape') {
      handleToggle(false);
    }
  }

  handleReset() {
    this.searchFormRef.current.reset();
  }

  handleEntering() {
    this.searchInput.focus();
    this.setState({ isTrimDown: true });
  }

  articlesClick() {
    history.push('/articles-and-resources');
    this.handleToggle(false);
  }

  benefitsClick() {
    alert('Understand my benefits now!');
  }

  careGuideClick() {
    const { openNewSupportRequestModal } = this.props;
    openNewSupportRequestModal('CARE_GUIDE_START');
  }

  claimsClick() {
    history.push('/claims');
    this.handleToggle(false);
  }

  coverageClick() {
    history.push('/coverage');
    this.handleToggle(false);
  }

  contactDoctorClick() {
    alert('Contact my doc!');
  }

  downloadMembershipCardClick() {
    alert('Download Membership Card');
  }

  findADoctorClick() {
    alert('Find a Doctor');
  }

  followUpOnClaimClick() {
    history.push('/claims');
    this.handleToggle(false);
  }

  goalsClick() {
    history.push('/meet-your-goals');
    this.handleToggle(false);
  }

  memberToolsClick() {
    history.push('/member-tools');
    this.handleToggle(false);
  }

  passwordClick() {
    alert('Update Password!');
  }

  personalInformationClick() {
    history.push('/account');
    this.handleToggle(false);
  }

  replaceCardClick() {
    alert('Get me a new card!');
  }

  requestInformationClick() {
    const { openNewSupportRequestModal } = this.props;
    openNewSupportRequestModal('REQUEST_INFORMATION');
  }

  requestMembershipCardClick() {
    alert('Request Membership Card');
  }

  scheduleAppointmentClick() {
    const { openNewSupportRequestModal } = this.props;
    openNewSupportRequestModal('SCHEDULE_APPOINTMENT');
  }

  schedulePhoneCallClick() {
    const { openNewSupportRequestModal } = this.props;
    openNewSupportRequestModal('SCHEDULE_PHONE_CALL');
  }

  sendMessageClick() {
    const { openNewSupportRequestModal } = this.props;
    openNewSupportRequestModal('SEND_A_MESSAGE');
  }

  submitRequestClick() {
    const { openNewSupportRequestModal } = this.props;
    openNewSupportRequestModal('STANDARD_SUPPORT_REQUEST_START');
  }

  updateSurveyClick() {
    history.push('/health-assessment');
    this.handleToggle(false);
  }

  uploadDocumentClick() {
    alert('Here is my new document!');
  }

  renderResults() {
    const { searchQuery, results, haveResults } = this.state;

    if (!searchQuery) {
      return (
        <span className="no-search">
          <i className="material-icons">search</i>
          {`Try "find a doctor", "update password", or "membership card", etc ...`}
        </span>
      );
    }

    if (!results) {
      return (
        <span className="no-search">
          {`No search results for '`}
          {searchQuery}
          {`'.`}
        </span>
      );
    }

    return (
      <>
        <MobileListTitle>Results</MobileListTitle>
        <Transition in={haveResults} appear timeout={duration}>
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              {results}
            </div>
          )}
        </Transition>
      </>
    );
  }

  render() {
    const { isOpen, isTrimDown } = this.state;

    return (
      <>
        <InputWrapper onClick={this.handlers.onOpen} className={isOpen ? 'open' : ''}>
          <i className="material-icons">search</i>
          <form autoComplete="false" ref={this.searchFormRef} onSubmit={this.handlers.handleSubmit}>
            <input
              type="text"
              name="search"
              placeholder="Search for anything..."
              autoComplete="off"
              onKeyDown={this.handlers.handleKeyPress}
              onChange={this.handlers.handleInputChange}
              ref={input => {
                this.searchInput = input;
              }}
            />
          </form>
        </InputWrapper>
        <TransitionWrapper>
          <Slide
            direction="up"
            in={isOpen}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 150, exit: 150 }}
            onEntering={this.handlers.onEntering}
            onExited={this.handlers.onExit}
          >
            <SearchWrapper>
              <FixedHeader>
                <Fade in={isTrimDown} timeout={{ enter: 150, exit: 0 }}>
                  <TrimmedHeaderWithColor className="short" />
                </Fade>
              </FixedHeader>
              <Results>{this.renderResults()}</Results>
              <MobileFixedBottomButtonAdapted>
                <MobileActionButton
                  text="Cancel"
                  type="negative"
                  onKey={this.handlers.handleKeyPress}
                  onClick={this.handlers.onClose}
                />
              </MobileFixedBottomButtonAdapted>
            </SearchWrapper>
          </Slide>
        </TransitionWrapper>
      </>
    );
  }
}

BottomBarSearch.propTypes = {
  openNewSupportRequestModal: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  openNewSupportRequestModal: content => {
    dispatch(openNewSupportRequestModal(content));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(BottomBarSearch);
