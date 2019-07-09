import * as React from 'react';
import Select from '@atlaskit/select';
// components,
// createFilter,
// mergeStyles,
// AsyncSelect,
// CheckboxSelect,
// CountrySelect,
// RadioSelect
// CreatableSelect,
// AsyncCreatableSelect,
// PopupSelect,
import Button, {
  ButtonGroup
} from '@atlaskit/button';

const Playground = () => {
  const [selectedAttachmentsLeft, setSelectedAttachmentsLeft] = React.useState([]);
  const [selectedAttachmentsRight, setSelectedAttachmentsRight] = React.useState([]);
  const [leftBoxId, setLeftBoxId] = React.useState('');
  const [rightBoxid, setRightBoxId] = React.useState('');
  // const [jiraDB, setJiraDB] = React.useState([]);
  const baseURL = 'https://s950ms20.atlassian.net/rest/api/3/issue';
  const som1 = 'https://s950ms20.atlassian.net/rest/api/3/issue/SOM-1';
  const [projectKey, setProjectKey] = React.useState('');
  const [projectId, setProjectId] = React.useState('');


  React.useEffect(
    () => {
      const getProjectData = () => {
        window.AP.context.getContext((ctx) => {
          setProjectKey(ctx.jira.project.key);
          setProjectId(ctx.jira.project.id);
          console.log(`KEY: ${projectKey}, ID: ${projectId}`);
        });
      };

      getProjectData();

      window.AP.request({
        url: `${baseURL}/${projectKey}`,
        type: 'GET',
        header: { 'x-atlassian-force-account-id': true }
      })
      .then(data => console.log(`DATA: ${data.body}`))
        .catch(e => console.log(`ERROR: ${e.err}`));


        window.AP.request({
          url: som1,
          type: 'GET',
          header: { 'x-atlassian-force-account-id': true }
        })
        .then(data => console.log(`DATA: ${data.body}`))
          .catch(e => console.log(`ERROR: ${e.err}`));
      }, []
  );

  const options = [{
      value: 'chocolate',
      label: 'Chocolate',
      id: 'chocolate',
      attachments: [{
          value: 'chocolate 1',
          id: 'chocolate 1'
        },
        {
          value: 'chocolate 2',
          id: 'chocolate 2'
        },
        {
          value: 'chocolate 3',
          id: 'chocolate 3'
        }
      ]
    },

    {
      value: 'strawberry',
      label: 'Strawberry',
      id: 'strawberry',
      attachments: [{
          value: 'strawberry 1',
          id: 'strawberry 1'
        },
        {
          value: 'strawberry 2',
          id: 'strawberry 2'
        },
        {
          value: 'strawberry 3',
          id: 'strawberry 3'
        }
      ]
    },
    {
      value: 'vanilla',
      label: 'Vanilla',
      id: 'vanilla',
      attachments: [{
          value: 'vanilla 1',
          id: 'vanilla 1'
        },
        {
          value: 'vanilla 2',
          id: 'vanilla 2'
        },
        {
          value: 'vanilla 3',
          id: 'vanilla 3'
        }
      ]
    }
  ];

  const copyAttachments = () => {
    const leftBox = selectedAttachmentsLeft;
    const rightBox = selectedAttachmentsRight;
    const updatedBox = [...rightBox, ...leftBox];
    setSelectedAttachmentsRight(updatedBox);
  };

  const deleteSelectedAttachment = (selectedBox, id) => {
    const box = selectedBox;
    const updatedBox = box.filter(att => att.id !== id);
    if (selectedBox === selectedAttachmentsLeft) {
      setSelectedAttachmentsLeft(updatedBox);
    } else {
      setSelectedAttachmentsRight(updatedBox);
    }
  };

  return (
    <React.Fragment>
      <h1> Playground </h1>
      <div className="boxes-group">
        <div className="box">
          <Select
            options={
        options
      }
            onChange={
        (event) => {
          setSelectedAttachmentsLeft(event.attachments);
          setLeftBoxId(event.id);
        }
      }
          />
        </div>
        <div className="box arrow-box"> to </div>
        <div className="box">
          <Select
            options={options}
            onChange={
        (event) => {
          setRightBoxId(event.id);
          setSelectedAttachmentsRight(event.attachments);
         }
      }
          />
        </div>
      </div>
      <div className="boxes-group">
        <div className="fake-attachment-box">
          { leftBoxId }
          <ul>
            {selectedAttachmentsLeft.map(attachment => (
              <li key={attachment.id}>
                {attachment.value}
                <Button onClick={
            () =>
            deleteSelectedAttachment(selectedAttachmentsLeft, attachment.id)
          }
                >
              Delete
                </Button>
              </li>
        ))
      }
          </ul>
        </div>
        <div className="fake-attachment-box">
          { rightBoxid }
          <ul>
            {
        selectedAttachmentsRight.map(attachment => (
          <li key={attachment.id}>
            { attachment.value }
            <Button onClick={
            () =>
            deleteSelectedAttachment(selectedAttachmentsRight, attachment.id)
          }
            >
          Delete
            </Button>
          </li>
        ))
      }
          </ul>
        </div>
      </div>
      <div className="buttons-group">
        <ButtonGroup>
          <Button onClick={
        () => {
          copyAttachments();
        }
      }
          >
Copy
          </Button>
          <Button> Cancel </Button>
          <Button> Acept </Button>
          <Button onClick={
        () => { window.AP.context.getContext(ctx => console.log(`KEY: ${projectKey} ID:${projectId}`)); }}
          >
Test #1
          </Button>
          {/* <Button
            onClick={() => { console.log(`${baseURL}/${projectKey}`); }}
          >
      Test #2
          </Button> */}
        </ButtonGroup>
      </div>

    </React.Fragment>
);
};

export default Playground;
