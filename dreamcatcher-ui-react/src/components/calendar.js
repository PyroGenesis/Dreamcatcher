import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';

import 'react-calendar-heatmap/dist/styles.css';


const today = new Date();


export default function Calendar({countArray}) {
  const countValues = getRange(120).map(index => {

    return {
      date: shiftDate(today, -index),
      count: countArray[index],
    };
  });
  return (
    <div style={{marginRight:40, paddingTop:50, paddingBottom:0, marginBottom:0}}>
      <CalendarHeatmap
        startDate={shiftDate(today, -120)}
        endDate={today}
        values={countValues}
        classForValue={value => {
          // console.log(value);
          if (!value) {
            return 'color-empty';
          }
          if(value.count>=1 && value.count<=3){
            return 'color-github-1';
          }
          else if(value.count>=4 && value.count<=7){
            return 'color-github-2';
          }
          else if(value.count>=7 && value.count<=10){
            return 'color-github-3';
          }
          else if(value.count>10){
            return 'color-github-4';
          }
          return 'color-github-0';
        }}
        tooltipDataAttrs={value => {
          return {
            'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${
              value.count
            }`,
          };
        }}
        showWeekdayLabels={true}
        onClick={value => alert(`Clicked on value with count: ${value.count}`)}
      />
      <ReactTooltip />
      </div>
  );
}

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}