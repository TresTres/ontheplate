// ListsPanel.js

import React, { Component, Fragment } from 'react';
import {
	Container,
	Button,
	TextField,
	Grid,
	Paper
} from '@material-ui/core';
import NewListIcon from '@material-ui/icons/PlaylistAdd';

import AuthContext from '../../context/auth-context';
import { fetchRequest, validateInput } from '../../utils/helper'; 
import SimpleFormModal from '../../components/modal/SimpleFormModal';
import './ListsPanel.css'

class ListsPanel extends Component {

	static contextType = AuthContext;

	state = {
		showNewListModal: false,
		newTitle: '',
		newDescription: '',
		newDueDate: '',
		lists: []
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
		const { 
			newTitle, 
			newDescription, 
			newDueDate 
		} = { ...this.state };

		if (validateInput([newTitle]) === false) {
			return;
		}
		const requestBody = {
			query: `
				mutation {
					createList( listInput: {
						title: "${newTitle}", 
						description: "${newDescription}", 
						dueDate: "${newDueDate}"
					}) {
						title
						description
						author {
							userName
						}
						creationDate
						dueDate
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
			this.fetchLists();
		}).
		catch((err) => {
			console.log(err);
		});
		this.hideNewList();
	}

	fetchLists = () => {

		const requestBody = {
			query: `
				query {
					lists {
						title
						description
						author {
							userName
						}
						creationDate
						dueDate
						percentDone
					}
				}
			`
		};
		fetchRequest(requestBody).
		then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Failed');
			}
			
			return res.json();
		}).
		then((resbody) => {
			const lists = resbody.data.lists;
			this.setState({ lists: lists });
		}).
		catch((err) => {
			console.log(err);
		});		
	}

	componentDidMount() {
		this.fetchLists();
	}

	render() {

		const listsAsItems = this.state.lists.reverse().map(list => {
			return 	<Grid item className="list-panel__item" 
			sm={4}> 
				<Paper className="list-panel__item-content" elevation={3} >
					{list.title}
				</Paper>
			</Grid>;
		})

		return (
			<Container className="list-panel__container" >
				<Button label="launch-list-form-button"
					variant ="contained"
					onClick={this.launchNewList.bind(this)}
					endIcon={<NewListIcon />} 
					disableElevation
				>
					Add a New List
				</Button>
				<SimpleFormModal canConfirm canCancel
					title={"New List Info"}
					open={this.state.showNewListModal} 
					onClose={this.hideNewList}
					onConfirm={this.addNewList.bind(this)}
					cancelText="cancel" confirmText="confirm details">
					<Fragment>
						<TextField required label="Title" 
						variant="outlined" margin="normal" name="newTitle"
						onChange={this.handleInputChange.bind(this)} />
						<TextField label="Description" 
						variant="outlined" margin="normal" name="newDescription"
						onChange={this.handleInputChange.bind(this)} />
						<TextField label="Due Date" type="datetime-local"
						variant="outlined" margin="normal" name="newDueDate"
						InputLabelProps = {{ shrink: true }}
						onChange={this.handleInputChange.bind(this)} />
					</Fragment>
				</SimpleFormModal>
				<Grid  container className="list-panel__grid" 
					spacing={5} justify="flex-start" wrap='wrap'> 
					{listsAsItems}
				</Grid>
			</Container>
		);
	}
}

export default ListsPanel;
