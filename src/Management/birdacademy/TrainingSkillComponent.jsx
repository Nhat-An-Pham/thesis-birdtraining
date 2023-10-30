import React from 'react';

const TrainingSkillComponent = ({ keyParam }) => {
    

const trainingProgress = [
    { id: "1", birdTrainingCourseId: "1", content: "Item 1" },
    { id: "2", birdTrainingCourseId: "1", content: "Item 2" },
    { id: "3", birdTrainingCourseId: "5", content: "Item 3" },
    // ... more items
  ];

  return (
    <div>
      {trainingProgress
        .filter((item) => item.birdTrainingCourseId === keyParam)
        .map((item) => (
                <p key={item.id}>{item.content}</p>
            ))}
    </div>
  );
};

export default TrainingSkillComponent;
