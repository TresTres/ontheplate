// Lists.js

import React, { Component, Fragment } from 'react';
import {
	Button,
	TextField
} from '@material-ui/core';
import NewListIcon from '@material-ui/icons/PlaylistAdd';

import { fetchRequest } from '../../utils/helper'; 
import SimpleModal from '../../components/modal/SimpleModal';


class ListsPage extends Component {

	state = {
		showNewListModal: false
	};

	launchNewList = () => {
		this.setState({ showNewListModal: true });
	}
	hideNewList = () => {
		this.setState({ showNewListModal: false });
	}

	render() {

		return (
			<Fragment>
				<Button label="launch-list-form-button"
					variant ="contained"
					onClick={this.launchNewList.bind(this)}
					endIcon={<NewListIcon />} 
					disableElevation
				>
					Add a New List
				</Button>
				<SimpleModal canConfirm canCancel
					title={"New List Info"}
					open={this.state.showNewListModal} 
					onClose={this.hideNewList}
					cancelText="cancel" confirmText="confirm">
					<Fragment>
						<TextField required label="new-list-title-input" 
						variant="outlined" />
						<TextField label="new-list-description-input" 
						variant="outlined" />
					</Fragment>
				</SimpleModal>
			</Fragment>
		);
	}
}

export default ListsPage;
