import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import images from '../../../../utils/images';

// Feedback Submission

const { FormLabel } = defaultTheme.components;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const FeedbackButton = styled.button`
  width: 32%;
  padding: 8px 0;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  background: ${props => props.theme.colors.shades.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

  img {
    background: #fff;
    border: 2px solid transparent;
    border-radius: 50%;
    transition: all 200 ease-in-out;
  }

  @media ${props => props.theme.device.tablet} {
    border: 1px solid ${props => props.theme.colors.roles.warning};
    box-shadow: none;

    &:hover {
      background: ${props => props.theme.colors.roles.warning};
    }

    &.active {
      background: ${props => props.theme.colors.roles.warning};
    }

    &:first-child {
      border-color: ${props => props.theme.colors.roles.success};
      &:hover {
        background: ${props => props.theme.colors.roles.success};
      }

      &.active {
        background: ${props => props.theme.colors.roles.success};
      }
    }

    &:last-child {
      border-color: ${props => props.theme.colors.roles.danger};
      &:hover {
        background: ${props => props.theme.colors.roles.danger};
      }

      &.active {
        background: ${props => props.theme.colors.roles.danger};
      }
    }
  }
`;

const FeedbackSubmission = React.memo(({ type, choice, handleClick, claimNumber }) => (
  <>
    {type === 'claim' && <FormLabel>{`How do you feel about Claim # ${claimNumber}?`}</FormLabel>}
    {type === 'provider' && <FormLabel>How do you feel about this provider?</FormLabel>}
    <Buttons>
      <FeedbackButton
        className={choice === 'positive' && 'active'}
        onClick={() => handleClick('positive')}
      >
        <img src={images['feedback-positive']} alt="positive response" />
      </FeedbackButton>
      <FeedbackButton
        className={choice === 'neutral' && 'active'}
        onClick={() => handleClick('neutral')}
      >
        <img src={images['feedback-neutral']} alt="neutral response" />
      </FeedbackButton>
      <FeedbackButton
        className={choice === 'negative' && 'active'}
        onClick={() => handleClick('negative')}
      >
        <img src={images['feedback-negative']} alt="negative response" />
      </FeedbackButton>
    </Buttons>
  </>
));

FeedbackSubmission.propTypes = {
  choice: PropTypes.oneOf(['positive', 'neutral', 'negative', null]),
  handleClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['provider', 'claim']).isRequired,
  claimNumber: PropTypes.string
};

FeedbackSubmission.defaultProps = {
  choice: null,
  claimNumber: null
};

export default FeedbackSubmission;
