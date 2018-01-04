import WaveSurfer from 'wavesurfer.js';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import { getJane, showAlert } from 'actions';
import Loader from 'components/Loader';

export class Music extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    jane: PropTypes.object.isRequired,
  };
  constructor(props){
       super(props);
       this.wavesurfer;
       this.state = {
           currentTrack: null,
           pos: 0,
           playing: true,
           firstTrack: true,
           trackLoading: true,
           selectedTracks:{0:"selected"}
     };
 }

  componentWillReceiveProps(nextProps){
       const { dispatch, jane } = this.props;
       if(nextProps.jane.music){
            if(this.state.firstTrack && nextProps.jane.music.length > 0){
                 this.setState({firstTrack:false})
                 this.wavesurfer.load( 'http://du8bvvbrz11r7.cloudfront.net/'+nextProps.jane.music[0].file);
                 this.wavesurfer.on( 'ready', this.audioReady )
            }
      }
 }
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
  componentWillUnmount = () =>{
       this.wavesurfer.stop()
       delete this.wavesurfer;
 }
  handleTrackClick = (index, e) =>{
       e.preventDefault();
       let selected = this.state.selectedTracks;
       Object.entries(selected).forEach(([key, value]) => {
           if(key === index){
                selected[key] = "selected";
           }else{
                selected[key] = "";
           }
       });
       if(!selected.hasOwnProperty(index)){
            selected[index] = "selected"
       }
       this.wavesurfer.load( 'http://du8bvvbrz11r7.cloudfront.net/'+e.currentTarget.dataset.track );
       this.wavesurfer.on( 'ready', this.audioReady );
       this.setState({trackLoading:true, selectedTracks: selected})
 }
 audioReady = (e) =>{
      this.setState({trackLoading:false})
      this.wavesurfer.play();
}
  renderPlaylist = (items) =>{
       if(items){
            var list = items.map(( item, index ) => {
                 return(
                      <li key={item.file+"_"+index} className={"list-group-item "+(this.state.selectedTracks[index] ? this.state.selectedTracks[index] : "")}>
                           <a id={"audio_track_"+index} href="#" onClick={(e) => {this.handleTrackClick(index, e)}} data-track={item.file}>{item.title}</a>
                      </li>
                 );
            });
            return list;
       }else{
            return (<p>Empty</p>);
       }
 }
 clickPlay=(e)=>{
      if(this.state.playing){
           this.wavesurfer.pause()
      }else{
           this.wavesurfer.play()
      }
      this.setState({playing:!this.state.playing})
}
 clickStop=(e)=>{
      this.setState({playing:false})
      this.wavesurfer.stop()
}
 pressRewind=(e)=>{
      this.forwardBackTimer = setInterval(()=>{
          this.forwardAndBack(-1)
     }, 100);
}
 pressForward=(e)=>{
     this.forwardBackTimer = setInterval(()=>{
          this.forwardAndBack(1)
     }, 100);
}
forwardAndBack = (int) =>{
     const t = this.wavesurfer.getCurrentTime();
     const diff = t + int;
     if(int < 0){
          if( diff <= 0){
               this.forwardBackRelease();
               this.wavesurfer.seekTo(0);
               this.wavesurfer.play();
          }else{
               this.wavesurfer.skip(int);
          }
     }else{
          if(diff >= this.wavesurfer.getDuration()){
               this.forwardBackRelease();
               this.wavesurfer.seekTo(0);
               this.wavesurfer.play();
          }else{
               this.wavesurfer.skip(int);
          }
     }

}
forwardBackRelease =(e)=>{
     clearInterval(this.forwardBackTimer);
}
  render=()=>{
    const { query } = this.state;
    const { jane } = this.props;
    let output;
    var thisStyle = (this.state.trackLoading) ? {display:"none"}:{display:"block"};
    var thisWave = (this.state.trackLoading) ? {height:"0px", visibility:'hidden'}:{height:"128px", visibility:'visible'};
    if (jane) {
         if(jane.hasOwnProperty('music')){
              output = (
                  <div className="card">
                       <div className="card-header">
                            {jane.name}
                       </div>
                      <div className="card-body">
                           {(this.state.trackLoading) ?
                               <Loader className="trackLoader"/>
                           :
                              null
                           }
                           {(this.state.trackLoading)  ?
                              <small className="loadingMessage">loading...</small>
                           :
                              null
                           }
                           <div id="waveform" style={thisWave}></div>
                           <div className="audioControls" style={thisStyle}>
                                <a href="#" className="btn leftbtn playbtn" onClick={this.clickPlay}><i className={(this.state.playing ? "fa fa-pause":"fa fa-play" )}></i></a>
                                <a href="#" className="btn midbtn stopbtn" onClick={this.clickStop}><i className="fa fa-stop"></i></a>
                                <a href="#" className="btn midbtn rewindbtn"  onMouseDown={this.pressRewind} onMouseUp={this.forwardBackRelease} onMouseOut={this.forwardBackRelease}><i className="fa fa-backward"></i></a>
                                <a href="#" id="forwardBtn" className="btn rightbtn forwardbtn"  onMouseDown={this.pressForward} onMouseOut={this.forwardBackRelease} onMouseUp={this.forwardBackRelease}><i className="fa fa-forward"></i></a>
                           </div>
                      </div>
                      <ul className="list-group list-group-flush">
                           {this.renderPlaylist(jane.music)}
                      </ul>
                      <div className="card-footer">
                           2017 &copy; copyright
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
      <div key="Music" className="row music_app w-100">
           <div className="col-md-3"></div>
           <div className="col-md-6">
                {output}
           </div>
           <div className="col-md-3"></div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  console.log(state)
     // is this correct?
  return {
    jane: state.music ,
    playing: state.playing
  };
}

export default connect(mapStateToProps)(Music);
