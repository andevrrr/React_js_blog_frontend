import React from 'react';

const StatusToggle = ({ model, field, itemId, initialStatus }) => {

  const toggleStatusHandler = () => {
    fetch(`http://localhost:3000/admin/${model}/${itemId}/status/${field}`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.status !== 200) {
            throw new Error("Kaut");
        }
        return response.json()
    })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={initialStatus}
          onChange={toggleStatusHandler}
        />
        {field}
      </label>
    </div>
  );
};

export default StatusToggle;
