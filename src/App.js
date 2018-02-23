import React, { Component } from 'react';
import './App.css';
import Table from './components/table';
import rp from 'request-promise';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			allTime: [],
			recent: [],
			sortBy: "all",
			order: "descending"
		};
		this.sortAll = this.sortAll.bind(this);
		this.sortRecent = this.sortRecent.bind(this);
	}
	
	componentWillMount(){
		var alltime = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
		var recent = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
		rp(alltime)
			.then((allTimeData) => {
				rp(recent)
					.then((recentData) => {
						allTimeData = JSON.parse(allTimeData);
						recentData = JSON.parse(recentData);
						for(var i=0; i < allTimeData.length; i++){
							let num = i + 1;
							allTimeData[i].rank = num;
							recentData[i].rank = num;
						};
						this.setState({
							allTime: allTimeData,
							recent: recentData
						});
					})
					.catch((err) => {console.log(err)});
		})
		.catch((err) => {console.log(err)});
	}
	
	componentDidMount(){

	}

	sortRecent(event){
		var sortRecent;
		if(this.state.order === "descending"){
			sortRecent = this.state.recent.sort((a,b) => {
				return b.recent-a.recent;
			})
			this.setState({
				recent: sortRecent,
				sortBy: "recent",
				order: "acending"
			});
		} else {
			sortRecent = this.state.recent.sort((a,b) => {
				return a.recent-b.recent;
			});
			this.setState({
				recent: sortRecent,
				sortBy: "recent",
				order: "descending"
			});
		}
	}
	
	sortAll(event){
		var sortAll;
		if(this.state.order === "descending"){
			sortAll = this.state.allTime.sort((a,b) => {
				return b.alltime-a.alltime;
			})
			this.setState({
				allTime: sortAll,
				sortBy: "all",
				order: "acending"
			});
		} else {
			sortAll = this.state.allTime.sort((a,b) => {
				return a.alltime-b.alltime;
			});
			this.setState({
				allTime: sortAll,
				sortBy: "all",
				order: "descending"
			});
		}
	}
	
	render(){
    let data;
    let {order, sortBy} = this.state;
		if(this.state.sortBy === "recent"){
			data = this.state.recent;
		} else {
			data = this.state.allTime;
		}
		return(
			<div className="site">
				<header className="header">
					<h1>FCC React Camper Leaderboard</h1>
				</header>
				<Table data={data} sortRecent={this.sortRecent} sortAll={this.sortAll} order={order} sortBy={sortBy} className="table"/>
				<footer className="footer">By Tony Molumby</footer>
			</div>
		)
	}
}

export default App;