import React from 'react';
import VlogsItem from '../VlogsItem';
import './style.css';

// videoId, channel, title, id, image, description
function VlogsGrid(props) {
    let vlogsItem
    if (props.vlogs.length) {
        vlogsItem = (
            <div className="vlogs-container spacing-large">
                {props.vlogs.map(vlog => (
                    <VlogsItem
                        key={vlog.id}
                        id={vlog.id}
                        videoId={vlog.snippet.resourceId.videoId}
                        channel={vlog.snippet.channelTitle}
                        title={vlog.snippet.title}
                        image={vlog.snippet.thumbnails.medium.url}
                        description={vlog.snippet.description}
                    />
                ))}
            </div>
        )
    }
    
    return (
        <div className="vlogs-content">
            {vlogsItem}
        </div>
    )
}

export default VlogsGrid