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

import Button, { ButtonGroup } from '@atlaskit/button';

const Playground = () => {
const [selectedAttachmentsLeft, setSelectedAttachmentsLeft] = React.useState([]);
const [selectedAttachmentsRight, setSelectedAttachmentsRight] = React.useState([]);

const uid = () => Number(Math.floor(Math.random() * 142626600));

const options = [
{
value: 'chocolate',
label: 'Chocolate',
id: uid(),
attachments: [
{
value: 'chocolate 1',
id: uid()
},
{
value: 'chocolate 2',
id: uid()
},
{
value: 'chocolate 3',
id: uid()
}
]
},

{
value: 'strawberry',
label: 'Strawberry',
id: uid(),
attachments: [
  {
  value: 'strawberry 1',
  id: uid()
  },
  {
  value: 'strawberry 2',
  id: uid()
  },
  {
  value: 'strawberry 3',
  id: uid()
  }
  ]
},
{
value: 'vanilla',
label: 'Vanilla',
id: uid(),
attachments: [
  {
  value: 'vanilla 1',
  id: uid()
  },
  {
  value: 'vanilla 2',
  id: uid()
  },
  {
  value: 'vanilla 3',
  id: uid()
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

const deleteSelectedAttachment = (selectedBox, idx) => {
const box = selectedBox;
const updatedBox = box.filter(att => att !== box[idx]);
if (selectedBox === selectedAttachmentsLeft) {
 setSelectedAttachmentsLeft(updatedBox);
} else { setSelectedAttachmentsRight(updatedBox); }
};

return (
  <React.Fragment>
    <h1> Playground </h1>
    <div className="boxes-group">
      <div className="box">
        <Select
          options={options}
          onChange={(event) => {
setSelectedAttachmentsLeft(event.attachments);
}}
        />
      </div>
      <div className="box arrow-box"> to </div>
      <div className="box">
        <Select
          options={options}
          onChange={(event) => {
setSelectedAttachmentsRight(event.attachments);
}}
        />
      </div>
    </div>
    <div className="boxes-group">
      <div className="fake-attachment-box">
        <ul>
          {selectedAttachmentsLeft.map((attachment, idx) => (
            <li key={attachment.id}>
              {attachment.value}
              <Button onClick={() => deleteSelectedAttachment(selectedAttachmentsLeft, idx)}>
Delete
              </Button>
            </li>
))}
        </ul>
      </div>

      <div className="fake-attachment-box">
        <ul>
          {selectedAttachmentsRight.map((attachment, idx) => (
            <li key={attachment.id}>
              {attachment.value}
              <Button onClick={() => deleteSelectedAttachment(selectedAttachmentsRight, idx)}>
Delete
              </Button>
            </li>
))}
        </ul>
      </div>
    </div>

    <div className="buttons-group">
      <ButtonGroup>
        <Button onClick={() => { copyAttachments(); }}>Copy </Button>
        <Button> Cancel </Button>
        <Button> Acept </Button>
      </ButtonGroup>
    </div>
  </React.Fragment>
);
};

export default Playground;
