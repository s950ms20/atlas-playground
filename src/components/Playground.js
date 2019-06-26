import * as React from 'react';
import Select, {
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
} from '@atlaskit/select';

import Button, { ButtonGroup } from '@atlaskit/button';

export const Playground = (props) => {
    const [ selectedAttachmentsLeft, setSelectedAttachmentsLeft ] = React.useState([]);
    const [selectedAttachmentsRight, setSelectedAttachmentsRight] = React.useState([]);

	const options = [
		{
			value: 'chocolate',
			label: 'Chocolate',
			attachments: [ 'chocolate 1', 'chocolate 2', 'chocolate 3' ]
		},
		{
			value: 'strawberry',
			label: 'Strawberry',
			attachments: [ 'strawberry 1', 'strawberry 2', 'strawberry 3' ]
		},
		{
			value: 'vanilla',
			label: 'Vanilla',
			attachments: [ 'vanilla 1', 'vanilla 2', 'vanilla 3' ]
		}
    ];
    
    const copyAttachments = () => {
        const leftBox = selectedAttachmentsLeft;
        const rightBox = selectedAttachmentsRight;
        const updatedBox = [...rightBox, ...leftBox];
        setSelectedAttachmentsRight(updatedBox);
    }

    const deleteSelectedAttachment = (selectedBox,idx) => {
        const box = selectedBox;
       const updatedBox = box.filter(
           att => att !== box[idx]
       )
       selectedBox === selectedAttachmentsLeft
       ? setSelectedAttachmentsLeft(updatedBox)
       : setSelectedAttachmentsRight(updatedBox)
    }

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
				<div className="box arrow-box">=></div>
				<div className="box">
                    <Select
                        options={options} 
                        onChange = {
                            (event) => {
                                setSelectedAttachmentsRight(event.attachments);
                    						    }
                    						}
                    />
				</div>
			</div>
			<div className="boxes-group">
				<div className="fake-attachment-box">
					<ul>
                        {selectedAttachmentsLeft
                        .map((attachment, idx) => {
                            return <li key={idx}>{attachment}
                            <Button 
                            onClick={()=>deleteSelectedAttachment(selectedAttachmentsLeft, idx)}
                            >Delete</Button>
                            </li>;
						})}
					</ul>
				</div>
				<div className="fake-attachment-box">
					<ul>
                        {selectedAttachmentsRight
                        .map((attachment, idx) => {
							return <li key={idx}>{attachment}
                            <Button 
                            onClick={()=>deleteSelectedAttachment(selectedAttachmentsRight, idx)}
                            >Delete</Button>
                            </li>;
						})}
					</ul>
				</div>
			</div>
            <div className="buttons-group">
                <ButtonGroup>
                    <Button onClick={()=>{copyAttachments()}}>Copy</Button>
                    <Button>Cancel</Button>
                    <Button>Acept</Button>
            </ButtonGroup>
            </div>
		</React.Fragment>
	);
};
