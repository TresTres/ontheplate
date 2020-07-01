// Lists.js

import React, { Component, Fragment } from 'react';
import {
	Button,
	TextField
} from '@material-ui/core';
import NewListIcon from '@material-ui/icons/PlaylistAdd';

import AuthContext from '../../context/auth-context';
import { fetchRequest, validateInput } from '../../utils/helper'; 
import SimpleModal from '../../components/modal/SimpleModal';


class ListsPage extends Component {

	static contextType = AuthContext;

	state = {
		showNewListModal: false,
		newTitle: '',
		newDescription: ''
	};

	handleInputChange = (inp) => {
		this.setState({
			[inp.target.name]: inp.target.value
		});
	}

	launchNewList = () => {
		this.setState({ showNewListModal: true });
	}

	hideNewList = () => {
		this.setState({ showNewListModal: false });
	}

	addNewList = (event) => {

		event.preventDefault();
		const { newTitle, newDescription } = { ...this.state };

		if (validateInput([newTitle, newDescription]) === false) {
			return;
		}
		const requestBody = {
			query: `
				mutation {
					createList( listInput: {title: "${newTitle}", description: "${newDescription}"}) {
						title
						description
						author {
							userName
						}
						creationDate
						percentDone
					}
				}
			`
		};		
		const token = this.context.token;

		fetchRequest(requestBody, token).
		then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Failed');
			}
			
			return res.json();
		}).
		then((resbody) => {
			const resdata = resbody.data;
			console.table(resdata);
		}).
		catch((err) => {
			console.log(err);
		});
		this.hideNewList();
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
					onConfirm={this.addNewList.bind(this)}
					cancelText="cancel" confirmText="confirm details">
					<Fragment>
						<TextField required label="new-list-title-input" 
						variant="outlined" margin="normal" name="newTitle"
						onChange={this.handleInputChange.bind(this)} />
						<TextField label="new-list-description-input" 
						variant="outlined" margin="normal" name="newDescription"
						onChange={this.handleInputChange.bind(this)} />
					</Fragment>
				</SimpleModal>
			</Fragment>
		);
	}
}

export default ListsPage;
