import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// This is the Pagination Controls

// TODO: Props (for Paul, to create standardized hook-up for pagination controls to store)

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.button`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  background: ${props => props.theme.colors.shades.white};
  border: none;
  border-radius: 4px;
  height: 40px;
  width: 40px;

  i {
    color: ${props => props.theme.colors.shades.blue};
  }

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const Pages = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  background: ${props => props.theme.colors.shades.white};
  border: none;
  border-radius: 4px;
  height: 40px;
  margin: 0 8px;
  padding: 0 16px;
`;

const PageLink = styled.a`
  padding: 0 4px;
  color: ${props =>
    props.active ? props.theme.colors.shades.blue : props.theme.colors.shades.gray};
  font-weight: ${props => (props.active ? '700' : '400')};

  &:hover {
    cursor: pointer;
  }
`;

const Ellipsis = styled.span`
  padding: 0 4px;
  color: ${props => props.theme.colors.shades.gray};
  font-weight: 400;
`;

const Pagination = React.memo(({ paginator }) => {
  const [pageList, setPageList] = useState([]);
  useEffect(() => {
    let pageListArray = [];
    Array(paginator.totalPages)
      .fill(null)
      .map((value, index) => {
        if (paginator.totalPages <= 10) {
          pageListArray.push({
            elementType: 'NUMBER',
            element: (
              <PageLink
                active={paginator.currentPage === index + 1}
                onClick={() => {
                  paginator.goTo(index + 1);
                }}
              >
                {index + 1}
              </PageLink>
            )
          });
        } else {
          if (paginator.currentPage < 5) {
            if (index + 1 <= 5) {
              pageListArray.push({
                elementType: 'NUMBER',
                element: (
                  <PageLink
                    active={paginator.currentPage === index + 1}
                    onClick={() => {
                      paginator.goTo(index + 1);
                    }}
                  >
                    {index + 1}
                  </PageLink>
                )
              });
            } else if (index + 1 === paginator.totalPages) {
              pageListArray.push({
                elementType: 'NUMBER',
                element: (
                  <PageLink
                    active={paginator.currentPage === index + 1}
                    onClick={() => {
                      paginator.goTo(index + 1);
                    }}
                  >
                    {index + 1}
                  </PageLink>
                )
              });
            } else {
              try {
                pageListArray[index - 1].elementType === 'NUMBER'
                  ? pageListArray.push({
                      elementType: 'ELLIPSIS',
                      element: <Ellipsis active="false">...</Ellipsis>
                    })
                  : null;
              } catch (error) {}
            }
          } else if (paginator.totalPages - paginator.currentPage < 4) {
            if (index === 0) {
              pageListArray.push({
                elementType: 'NUMBER',
                element: (
                  <PageLink
                    active={paginator.currentPage === index + 1}
                    onClick={() => {
                      paginator.goTo(index + 1);
                    }}
                  >
                    {index + 1}
                  </PageLink>
                )
              });
            } else if (paginator.totalPages - (index + 1) < 5) {
              pageListArray.push({
                elementType: 'NUMBER',
                element: (
                  <PageLink
                    active={paginator.currentPage === index + 1}
                    onClick={() => {
                      paginator.goTo(index + 1);
                    }}
                  >
                    {index + 1}
                  </PageLink>
                )
              });
            } else {
              try {
                pageListArray[pageListArray.length - 1].elementType === 'NUMBER'
                  ? pageListArray.push({
                      elementType: 'ELLIPSIS',
                      element: <Ellipsis active="false">...</Ellipsis>
                    })
                  : null;
              } catch (error) {}
            }
          } else {
            if (index === 0 || paginator.totalPages === index + 1) {
              pageListArray.push({
                elementType: 'NUMBER',
                element: (
                  <PageLink
                    active={paginator.currentPage === index + 1}
                    onClick={() => {
                      paginator.goTo(index + 1);
                    }}
                  >
                    {index + 1}
                  </PageLink>
                )
              });
            } else if (
              paginator.currentPage - (index + 1) <= 2 &&
              paginator.currentPage - (index + 1) >= -2
            ) {
              pageListArray.push({
                elementType: 'NUMBER',
                element: (
                  <PageLink
                    active={paginator.currentPage === index + 1}
                    onClick={() => {
                      paginator.goTo(index + 1);
                    }}
                  >
                    {index + 1}
                  </PageLink>
                )
              });
            } else {
              try {
                if (pageListArray[pageListArray.length - 1].elementType === 'NUMBER') {
                  pageListArray.push({
                    elementType: 'ELLIPSIS',
                    element: <Ellipsis active="false">...</Ellipsis>
                  });
                }
              } catch (error) {}
            }
          }
        }
      });
      if(pageListArray.length === 0){
        pageListArray.push({elementType: 'NUMBER', element: (<PageLink
          active='true'
        >
          1
        </PageLink>)})
      }
    setPageList(pageListArray);
  }, [paginator]);

  return (
    <Fragment>
      {/* {paginator && // TODO: remove, once this component is always called with a paginator
        paginator.totalPages > 1 && (
          <Fragment>
            <Container className="pagination-controls">
              <Button disabled={!paginator.hasPrev} onClick={paginator.prev}>
                <i className="material-icons">keyboard_arrow_left</i>
              </Button>
              <Pages>
                {Array(paginator.totalPages)
                  .fill(null)
                  .map((value, index) => {
                    return (
                      <PageLink
                        active={paginator.currentPage === index + 1}
                        onClick={() => {
                          paginator.goTo(index + 1);
                        }}
                      >
                        {index + 1}
                      </PageLink>
                    );
                  })}
              </Pages>
              <Button disabled={!paginator.hasNext} onClick={paginator.next}>
                <i className="material-icons">keyboard_arrow_right</i>
              </Button>
            </Container>
          </Fragment>
        )} */}
      <Container>
        <Button disabled={!paginator.hasPrev} onClick={paginator.prev}>
          <i className="material-icons">keyboard_arrow_left</i>
        </Button>
        <Pages>{pageList.map(page => page.element)}</Pages>
        <Button disabled={!paginator.hasNext} onClick={paginator.next}>
          <i className="material-icons">keyboard_arrow_right</i>
        </Button>
      </Container>
    </Fragment>
  );
});

Pagination.propTypes = {
  paginator: PropTypes.shape({}).isRequired
};

export default Pagination;
