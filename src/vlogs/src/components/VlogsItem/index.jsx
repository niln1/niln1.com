import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import VlogYouTube from '../VlogYouTube'
import './style.css'

class VlogsItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            style: {
                left: `0px`,
                top: `0px`
            }
        }
    }

    // handleMouseMove(e) {
    //     const position = ReactDOM.findDOMNode(this).getBoundingClientRect();
    //     // console.log(position)
    //     const offLeft = position.left
    //     const offTop = position.top
    //     const pgX = e.pageX
    //     const pgY = e.pageY
    //     const offset = 2
    //     const x = pgX - offLeft
    //     const y = pgY - offTop
    //     const left = `${x+offset}px`
    //     const top = `${y+offset}px`
    //     // console.log(offLeft, offTop, pgX,pgY,offset, left,top,x,y)

    //     this.setState({
    //         style: {
    //             left,
    //             top
    //         }
    //     })

    //     console.log(this.state)
    // }

    // changeFollowPosition() {
        
    // }

    render() {
        const { videoId, channel, title, id, image, description } = this.props
        // const { style } = this.state
        const url = `https://www.youtube.com/watch?v=${videoId}`

        return (
            <div className="vlog-item" data-id={id}>
                <a href={url} 
                    className="vlog" 
                    // onMouseMove={this.handleMouseMove.bind(this)}
                    // ref="elem"
                    // style={style}
                >
                    <div className="vlog_row">
                        <div className="vlog__row--border vlog__row">
                            <p className="label spacing-small c-light-grey">Title</p>
                            <p className="title">{title}</p>
                        </div>
                        <div className="vlog__row--border vlog__row">
                            <p className="label spacing-small c-light-grey">Channel</p>
                            <p className="title">{channel}</p>
                        </div>
                        <div className="vlog__row vlog__row--border">
                            <p className="label spacing-small c-light">Description</p>
                            <p className="vlog__description">{description}</p>
                        </div>
                        <div className="v-thumbnails">
                            <img src={image} alt={title}/>
                        </div>
                        <div className="badge badge--transparent c-white">
                            <span className="badge__char char1">O</span>
                            <span className="badge__char char2">V</span>
                            <span className="badge__char char3">E</span>
                            <span className="badge__char char4">R</span>
                            <span className="badge__char char5">A</span>
                            <span className="badge__char char6">L</span>
                            <span className="badge__char char7">L</span>
                            <span className="badge__char char8"> </span>
                            <span className="badge__char char9">★</span>
                            <span className="badge__char char10">★</span>
                            <img className="badge__emoji" src="./assets/images/smile.png" alt="like-emoji"/>
                        </div>

                    </div>
                </a>

                <VlogYouTube videoId={videoId}/>
            </div>
        )
    }
}


export default VlogsItem