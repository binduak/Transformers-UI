import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCategoryList} from "../action/category_action";
import {getItemsList} from "../action/item_action";
import {Link} from "react-router-dom";

class BuyerHome extends Component {
    constructor() {
        super();
        this.state = {
            listOfCategories: [],
            categoryId: -1
        };
        this.getItemsList = this.getItemsList.bind(this);
    }

    componentWillMount() {
        this.props.getCategoryList((response) => {console.log(this.props.user.name); console.log(response.data); this.setState({listOfCategories: response.data.data})})
    }

    getItemsList(e) {
        this.setState({categoryId: JSON.parse(e.target.value).categoryId});
        this.props.getItemsList(JSON.parse(e.target.value).categoryId, JSON.parse(e.target.value).categoryName, (response)=>{console.log(response.data)})
        return (<div>
            {console.log("",this.props.items)}
        </div>)
    }

    render() {
        return (<div>
            <h1> Landing Page-Buyer</h1>
            <h3> Welcome {this.props.user.name}</h3>
            <Link to="/">Log out</Link>
            <lable className=""> Category</lable>
            <select className="form-control" onChange={this.getItemsList}>
                <option value="-1">--Select--</option>
                {this.state.listOfCategories.map((cat, index) => {
                    return (<option key={index} value={JSON.stringify({categoryId:cat.categoryId, categoryName: cat.categoryName})}>{cat.categoryName}</option>)
                })
                }
            </select>

        </div>);
    }
}

function mapStateToProps({user, items}) {
    return {user, items};
}
export default connect(mapStateToProps, {getCategoryList,getItemsList})(BuyerHome);
