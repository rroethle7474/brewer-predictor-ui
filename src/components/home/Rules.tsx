import React from 'react';
import styles from './rules.module.css';

const Rules: React.FC = () => {
  const ruleItems = [
    {
      number: '01',
      title: 'Predict',
      description: 'Enter your name and predict how many games the Brewers will win this season.'
    },
    {
      number: '02',
      title: 'Root for the Brewers!',
      description: 'I mean, I know that know one will pick the Brewers not to make the playoffs right? So sit back and root for the Crew!'
    },
    {
      number: '03',
      title: 'Ties',
      description: 'If there are ties between people, a tie-breaker will be used. More details will be provided later.'
    },
    {
      number: '04',
      title: 'Bragging Rights',
      description: 'At the end of the season, the winner will receive a very cool trophy and a special gift. Plus bragging rights forever!'
    },
    {
        number: '05',
        title: 'Questions?',
        description: 'If you have any questions or want to change your prediction before the deadline, send me a message from the button above!'
      }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Rules</h2>
      <div className="space-y-4">
        {ruleItems.map((rule, index) => (
          <div key={index} className={`${styles.ruleCard} ${styles[`ruleCard${index + 1}`]}`}>
            <div className={styles.ruleNumber}>{rule.number}</div>
            <div className={styles.ruleContent}>
              <h3 className={styles.ruleTitle}>{rule.title}</h3>
              <p className={styles.ruleDescription}>{rule.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;