import React, { Component } from 'react';
import _ from 'underscore';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
//import './override.css'

import config from '../../config';

class Events extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = [];
    _.each(this.props.data[config.api.events], (val, idx) => {
      data.push(
        <AccordionItem key={idx}>
          <AccordionItemTitle>
            <h3>{val.subject} ({val.notificationOccurrenceEventType_keyName})</h3>
          </AccordionItemTitle>
          <AccordionItemBody>
            <div className={'accordion-body'}>
              <ul>
                <li>Status: <b>{val.statusCode_name}</b></li>
                <li>Start Date: {val.startDate}</li>
                <li>End Date: {val.endDate}</li>
                <li>Recovery Time: {val.recoveryTime}</li>
                <li>Last Modified: {val.modifyDate}</li>
              </ul>
              <p>{val.summary}</p>
            </div>
          </AccordionItemBody>
        </AccordionItem>
      );
    });
    return (
      <div className={'events-wrapper'}>
        <Accordion>
          {data}
        </Accordion>
      </div>
    );
  }
}

export default Events;
