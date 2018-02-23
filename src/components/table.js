import React, {Component} from 'react';

class Table extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
        let {sortRecent, sortAll, data} = this.props;
		return(
			<table className='table table-striped table-hover'>
				<thead className="thead-inverse">
					<tr className="trow">
						<th className="rank">Rank</th>
						<th className="camper">Camper</th>
						<th className="clickable" onClick={sortRecent}>Points in Past 30 Days</th>
						<th className="clickable" onClick={sortAll}>All Time Points</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, i)=>{
						return (
						<tr>
							<td key={"rank-" + i}>{item.rank}</td>
							<td className="image" key={"camper-" + i}><img src={item.img} height="24"/> {item.username}</td>
							<td key={"recent-" + i}>{item.recent}</td>
							<td key={"alltime-" + i}>{item.alltime}</td>
						</tr>
							
							)
					})}
				</tbody>
			</table>
		)
	}
};

export default Table;