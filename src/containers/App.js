import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

//STATE object which describes application

//PROPS are used to get passed values and variables - props never changes
//state - props comes out of states		STATE>>props  	- here state is parent and props is child

class App extends Component {

	constructor(){
		//smart components - because it has states
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}
	//react lifecycle methods - 1. constructor 2. componentWillMount 3. render 4. componentDidMount

	compnentWillMount(){

	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
			.then(users =>this.setState({robots:users}));
	}

	onSearchChange = (event) =>{
		this.setState({searchfield: event.target.value})
	}

	render(){
		const {robots, searchfield} = this.state
		const filteredRobots = robots.filter(robots => {
			return robots.name.toLowerCase().includes(searchfield.toLowerCase());
		})

		return !robots.length ? 
			<h1>Loading</h1> :
			<div className='tc'>
				<h1 className='f1'>Robofriends</h1>
				<SearchBox searchChange = {this.onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots}/>
					</ErrorBoundary>
				</Scroll>
			</div>
	}
}

export default App;