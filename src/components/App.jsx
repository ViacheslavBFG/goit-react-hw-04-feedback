import React, { useState } from 'react';
import { Feedback } from './module/Feedback/Feedback';
import { Statistics } from './module/Statistics/Statistics';
import { Section } from './module/Section/Section';
import { Notification } from './module/Notification/Notification';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onBtnClick = (option) => {
    setFeedback((prevState) => ({
      ...prevState,
      [option]: prevState[option] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total > 0 ? Math.round((feedback.good * 100) / total) : 0;
  };

  const total = countTotalFeedback();

  return (
    <>
      <Section title="Please leave feedback">
        <Feedback
          options={Object.keys(feedback)}
          onLeaveFeedback={onBtnClick}
        />
      </Section>
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};

export default App;
