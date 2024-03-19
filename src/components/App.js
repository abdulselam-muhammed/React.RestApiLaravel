import React,{ Component } from "react";
import MyForm from "./MyForm";
import "./app.css";

import CustomerList from "./CustomerList";
import Loader from "./Loader";

import axios from "axios";
class App extends Component{
    state={
        customers:[],
        customer:{},
        loader:false,
        url:"http://127.0.0.1:8000/api/customers"
    }
    getCustomers = async ()=> {
        this.setState({loader: true});
        const customers =await axios.get(this.state.url);
        this.setState({
            customers:customers.data,
            loader: false
        });
    }
    deleteCustomer = async id =>{
        this.setState({loader:true});
        await axios.delete(`${this.state.url}/${id}`);

        this.getCustomers();
    }
    editCustomer = async id =>{
        this.setState({loader:true});
        await axios.put(`${this.state.url}/${id}`);

        this.getCustomers();

    }

    createCustomer= async (data) => {
        this.setState({loader:true});
        await axios.post(this.state.url,{
            first_name:data.first_name,
            last_name: data.last_name,
            email:data.email
        });

        this.getCustomers();
    }

    editCustomer = async (data) =>{
        this.setState({customer:{}, loader:true});
        await axios.put(`${this.state.url}/${data.id}`,
        {
            first_name:data.first_name,
            last_name: data.last_name,
            email:data.email
        });

        this.getCustomers();
    }

    componentDidMount(){
        this.getCustomers();
    }

    onDelete = (id)=>{
        this.deleteCustomer(id);
    }

    onEdite = data =>{
        this.setState({customer:data});
    }
    
    onSubmit = (data)=>{
        if(data.isEdite){
            this.editCustomer(data);
        }else{
            this.createCustomer(data);
        }
    }

    render() {
        return (
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="/#" className="header item">
                            React Project For Crud With Laravel FramWork
                        </a>
                    </div>
                </div>
                <div className="ui main container">
                    <MyForm 
                    customer={this.state.customer}
                    onSubmit= {this.onSubmit}
                    />
                    {this.state.loader? <Loader/>:""}
                    <CustomerList 
                    customers={this.state.customers}
                    onDelete={this.onDelete}
                    onEdite = {this.onEdite}
                    />
                </div>
            </div>
        )
    }
}

export default App;