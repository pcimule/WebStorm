import React, { Component } from 'react';

class RandomPhotos extends Component {
    state = {
        loading: true,
        person: null
    };

    async componentDidMount() {


        //If the JSON data is objects of arrays

        const url = "https://api.randomuser.me/";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState({ person: data.results[0], loading: false });


        /*
            If the JSON data is array of objects

        */

        // const url = "https://jsonplaceholder.typicode.com/photos/";
        // const response = await fetch(url);
        // const data = await response.json();
        // console.log(data);

        // this.setState({ person: data, loading: false });
    }

    render() {
        if (this.state.loading) {
            return <div>loading...</div>;
        }

        if (!this.state.person) {
            return <div>didn't get a person</div>;
        }

        return (

            // <div className="photos_list">
            //     {this.state.person.map(new_data => (
            //         <section key={new_data.id}>
            //             <h4>{new_data.title}</h4>
            //             <a href={new_data.url}><img src={new_data.thumbnailUrl} alt="" /></a>
            //         </section>
            //     ))}
            // </div>


            <div key={this.state.person.id.value} >
                <div>{this.state.person.name.title}</div>
                <div>{this.state.person.name.first} {this.state.person.name.last}</div>
                <img src={this.state.person.picture.large} alt="" />
            </div>
        );
    }
}

export default RandomPhotos;