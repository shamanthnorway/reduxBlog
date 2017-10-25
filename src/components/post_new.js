import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPosts } from '../actions';

class PostsNew extends React.Component {
    renderField(field){
        const { meta : { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return(
            <div className={className} >
                <lable>{field.label}</lable>
                <input 
                    type="text"
                    className="form-control"
                    /* avoiding all these statements by using ...field.input
                    onChange={field.input.onChange}
                    onFocus={field.input.onFocus}
                    onBlur={field.input.onBlur} 
                    */
                    {...field.input}
                />
                <div className="text-help" >
                {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {        
        this.props.createPosts(values, () => {
            // console.log(values);
            this.props.history.push('/');
        });
    }
    render() {
        const { handleSubmit } = this.props;

        return(
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField} />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField} />
                <Field
                    label="Content"
                    name="content"
                    component={this.renderField} />
                <button className="btn btn-primary" type="submit">Submit</button>
                <Link to='/' className="btn btn-danger">Cancel</Link>
                </form>                
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    if(!values.title || values.title.length < 3){
        errors.title = 'Enter a valid title, with more than 3 characters';
    }
    if(!values.categories) {
        errors.categories = 'Enter some categories';
    }
    if(!values.content) {
        errors.content = 'Enter content';
    }
    //if errors is empty then the form is fine to submit
    return errors;
}

export default reduxForm({
    validate,
    form:'PostsNewForm'
})(
    connect(null, { createPosts })(PostsNew)
);