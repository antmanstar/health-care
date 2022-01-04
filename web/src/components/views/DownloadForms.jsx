import React, { Component } from 'react';
import styled from 'styled-components';
import defaultTheme from '../../style/themes';
import { Mobile } from '../layouts';
import SearchAndFilterBar from '../presentation/shared/desktop/SearchAndFilterBar';
import MobileSectionHeader from '../presentation/shared/mobile/MobileSectionHeader';
import DocumentListItem from '../presentation/documents/mobile/DocumentListItem';

// MOBILE: Documents - Downloadable Forms List
// TODO: Bring in real forms to create list
// TODO: Wire Up Search / Filters
// TODO: Wire Up Download Document Action

const { MobileContentWrapper, MobileListTitle, TrimmedHeader } = defaultTheme.components;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

const Background = styled(TrimmedHeader)`
  margin-bottom: -40px;
  background: ${props => props.theme.gradients.main};
  z-index: 0;
`;

const Spacer = styled.div`
  padding-top: 108px;
`;

class DownloadForms extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;

    return (
      <>
        <FixedHeader>
          <Background />
          <MobileContentWrapper>
            <SearchAndFilterBar placeholder="Search Forms" bigShadow dateButton />
          </MobileContentWrapper>
        </FixedHeader>
        <Spacer />
        <MobileContentWrapper>
          <MobileSectionHeader subtitle="Tap on a form to download it." />
          <MobileListTitle>HIPAA Authorizations</MobileListTitle>
          <DocumentListItem title="HIPAA Authorizaiton Form" />
          <MobileListTitle>Appeals & Grievances</MobileListTitle>
          <DocumentListItem title="Grievance Form" />
          <DocumentListItem title="External Appeals Form" />
        </MobileContentWrapper>
      </>
    );
  }
}

const reflection = {
  component: DownloadForms,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: 'Download Forms',
      permanentTitle: true,
      noBg: true
    }
  },
  route: '/download-forms',
  forAuthorized: true
};

export default DownloadForms;

export { reflection };
