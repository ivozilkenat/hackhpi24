import React, { useState } from 'react';
import './css/InputBox.css';

function InputBox() {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [suggestedStations1, setSuggestedStations1] = useState([]);
    const [suggestedStations2, setSuggestedStations2] = useState([]);

    const handleInputChange1 = async (event) => {
        const query = event.target.value;
        setInput1(query);
        if (query.trim() === '') {
            setSuggestedStations1([]); // Clear suggestions if input is empty
            return;
        }
        try {
            const response = await fetch(`https://v6.vbb.transport.rest/stations?query=${query}`, {
                headers: {
                    'Accept': 'application/x-ndjson'
                }
            });
            const reader = response.body.getReader();
            let decoder = new TextDecoder();
            let partialChunk = '';
            const stations = [];
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                partialChunk += decoder.decode(value, { stream: true });
                const lines = partialChunk.split('\n');
                lines.forEach(line => {
                    if (line.trim() !== '') {
                        const station = JSON.parse(line);
                        stations.push(station.name);
                    }
                });
                partialChunk = lines.pop() || '';
            }
            setSuggestedStations1([...new Set(stations.slice(0, 3))]); // Update suggested stations for input1, filtering duplicates
        } catch (error) {
            console.error('Error fetching stations:', error);
        }
    };

    const handleInputChange2 = async (event) => {
      const query = event.target.value;
      setInput2(query);
      if (query.trim() === '') {
          setSuggestedStations2([]); // Clear suggestions if input is empty
          return;
      }
      try {
          const response = await fetch(`https://v6.vbb.transport.rest/stations?query=${query}`, {
              headers: {
                  'Accept': 'application/x-ndjson'
              }
          });
          const reader = response.body.getReader();
          let decoder = new TextDecoder();
          let partialChunk = '';
          const stations = [];
          while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              partialChunk += decoder.decode(value, { stream: true });
              const lines = partialChunk.split('\n');
              lines.forEach(line => {
                  if (line.trim() !== '') {
                      const station = JSON.parse(line);
                      stations.push(station.name);
                  }
              });
              partialChunk = lines.pop() || '';
          }
          setSuggestedStations2([...new Set(stations.slice(0, 3))]); // Update suggested stations for input2, filtering duplicates
      } catch (error) {
          console.error('Error fetching stations:', error);
      }
  };

    return (
        <div>
            <input
                type="text"
                value={input1}
                onChange={handleInputChange1}
                placeholder="Enter starting point..."
                className="input-field"
                list="stations-list-1"
            />
            <datalist id="stations-list-1">
                {suggestedStations1.map((station, index) => (
                    <option key={index} value={station} />
                ))}
            </datalist>
            <br />
            <input
                type="text"
                value={input2}
                onChange={handleInputChange2}
                placeholder="Enter destination..."
                className="input-field"
                list="stations-list-2"
            />
            <datalist id="stations-list-2">
                {suggestedStations2.map((station, index) => (
                    <option key={index} value={station} />
                ))}
            </datalist>
        </div>
    );
}

export default InputBox;
