import { Component } from "react";

class MyForm extends Component{
    state = {
        form:{first_name:"" , last_name:"" ,email:"",isEdite:false },
        btnName:"Save",
        btnClass:"ui primary button submit-button"
    };

    isEmpty(obj){
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props && !this.isEmpty(this.props.customer)) {
            this.setState({
                form:{...this.props.customer , isEdite:true},
                btnName:"Upadte",
                btnClass:"ui orange button submit-button"
            })
        }
    }

    handleChange = event =>{
        const {name , value} = event.target;
        let form = this.state.form;
        form[name] = value;
        this.setState({form});
    }

    
    onSubmit = (event)=>{
        event.preventDefault();
        if(this.formValiadtion()) {
            this.props.onSubmit(this.state.form);
        }
        this.clearFormFields();
    }

    formValiadtion = ()=>{
        if(document.getElementsByName("first_name")[0].value === ""){
            alert("Plase Enter First Name");
            return false;
        }
        
        if(document.getElementsByName("last_name")[0].value === ""){
            alert("Plase Enter last Name");
            return false;
        }
        
        if(document.getElementsByName("email")[0].value === ""){
            alert("Plase Enter Email");
            return false;
        }

        return true;
    }

    
    clearFormFields = ()=>{
        this.setState({
            form:{first_name:"" , last_name:"" ,email:"",isEdite:false },
            btnName:"Save",
            btnClass:"ui primary button submit-button"
        });
        document.querySelector(".form").reset();
    }
    render() {
        return(
            <form className="ui form">
                <div className="fields">
                    <div className="four wide  field">
                        <label>First Name</label>
                        <input type="text" 
                        name="first_name" 
                        onChange={this.handleChange}
                        value={this.state.form.first_name} 
                        placeholder="First Name"/>
                    </div>
                    

                    <div className="four wide  field">
                        <label>Last Name</label>
                        <input type="text"
                        onChange={this.handleChange}
                        value={this.state.form.last_name} 
                        name="last_name" 
                        placeholder="Last Name"/>
                    </div>

                    
                    <div className="four wide  field">
                        <label>Email</label>
                        <input type="email"
                        onChange={this.handleChange}
                        value={this.state.form.email}  
                        name="email" 
                        placeholder="email"/>
                    </div>

                    
                    <div className="four wide  field">
                        <button className={this.state.btnClass} onClick={this.onSubmit}>{this.state.btnName}</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default MyForm;