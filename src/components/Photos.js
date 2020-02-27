import React, { Component } from 'react';
import { photos_data } from '../Data/photos_data';

class Photos extends Component {
    render() {
        return (
            <div className="photos_list">
                {photos_data.map(photos_value => (
                    <section key={photos_value.id}>
                        <h4>{photos_value.title}</h4>
                        <p><a href={photos_value.url}><img src={photos_value.thumbnailUrl} alt="" /></a></p>
                    </section>
                ))}
            </div>
        );
    }
}

export default Photos;