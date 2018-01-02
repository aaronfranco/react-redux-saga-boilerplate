import WaveSurfer from 'wavesurfer.js';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import { getJane, showAlert } from 'actions';

import Loader from 'components/Loader';

export class Music extends React.Component {
  state = {
       currentTrack: null,
       pos: 0,
       playing: false
 };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    jane: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    const { query } = this.state;
    const { dispatch } = this.props;
    if(document.getElementById('waveform')){
         this.wavesurfer = WaveSurfer.create({
           container: document.getElementById('waveform'),
           waveColor: 'violet',
           progressColor: 'purple'
          });
    }
    dispatch(getJane());
  }

  handleTrackClick = (e) =>{
       e.preventDefault();
       this.wavesurfer.load( 'http://du8bvvbrz11r7.cloudfront.net/'+e.currentTarget.dataset.track );
       this.wavesurfer.on( 'ready', this.audioReady );
 }
 audioReady = (e) =>{
      this.wavesurfer.play();
}
  renderPlaylist = (items) =>{
       if(items){
            var list = items.map(( item, index ) => {
                 return(
                      <li class="list-group-item">
                           <a href="#" onClick={this.handleTrackClick} data-track={item.file}>{item.title}</a>
                      </li>
                 );
            });
            return list;
       }else{
            return (<p>Empty</p>);
       }
 }
 clickPlay=(e)=>{}
 clickStop=(e)=>{}
 pressRewind=(e)=>{}
 pressForward=(e)=>{}
  render=()=>{
    const { query } = this.state;
    const { jane } = this.props;
    let output;

    if (jane) {
         if(jane.hasOwnProperty('music')){
              output = (
                  <div className="card" style={{width: "500px"}}>
                       <div className="card-header">
                            {jane.name}
                       </div>
                      <div className="card-body">
                           <div id="waveform"></div>
                           <div className="audioControls">
                                <a href="#" className="btn playbtn" onClick={this.clickPlay}><i className="fa fa-play"></i></a>
                                <a href="#" className="btn stopbtn" onClick={this.clickStop}><i className="fa fa-stop"></i></a>
                                <a href="#" className="btn playbtn"  onClick={this.pressRewind}><i className="fa fa-backward"></i></a>
                                <a href="#" className="btn playbtn"  onClick={this.pressForward}><i className="fa fa-forward"></i></a>
                           </div>
                      </div>
                      <ul class="list-group list-group-flush">
                           {this.renderPlaylist(jane.music)}
                      </ul>
                      <div className="card-footer">
                           copyright
                      </div>
                    </div>
             );
        }else{
             output = <Loader />;
        }

    } else {
      output = <Loader />;
    }

    return (
      <div key="Music" className="app__music">
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
     // is this correct?
     console.log(state)
  return { jane: state.music };
}

export default connect(mapStateToProps)(Music);
