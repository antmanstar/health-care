import React, { Component } from 'react';
import styled from 'styled-components';
import defaultTheme from '../../style/themes';
import { Mobile } from '../layouts';
import SearchAndFilterBar from '../presentation/shared/desktop/SearchAndFilterBar';
import MobileSectionHeader from '../presentation/shared/mobile/MobileSectionHeader';
import DocumentListItem from '../presentation/documents/mobile/DocumentListItem';

// MOBILE: Documents - Received Documents List
// TODO: Bring in real forms to create list
// TODO: Wire Up Search / Filters
// TODO: Wire Up Download Document Action

const { MobileContentWrapper, TrimmedHeader } = defaultTheme.components;

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

class ReceivedDocuments extends Component {
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
            <SearchAndFilterBar placeholder="Search Documents" dateButton bigShadow />
          </MobileContentWrapper>
        </FixedHeader>
        <Spacer />
        <MobileContentWrapper>
          <MobileSectionHeader subtitle="Tap on a document to download it." />
          <DocumentListItem title="Document Name" dateReceived="04/18/2018" downloadLink="/" />
          <DocumentListItem title="Document Name" dateReceived="04/18/2018" downloadLink="/" />
          <DocumentListItem title="Document Name" dateReceived="04/18/2018" downloadLink="/" />
        </MobileContentWrapper>
      </>
    );
  }
}

const reflection = {
  component: ReceivedDocuments,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: "EOB's & Letters",
      permanentTitle: true,
      noBg: true
    }
  },
  route: '/received-documents',
  forAuthorized: true
};

export default ReceivedDocuments;

export { reflection };
